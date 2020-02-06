import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationService {
  async index(page) {
    try {
      const pending = await Registration.count({
        where: {
          [Op.or]: [
            {
              plan_id: {
                [Op.eq]: null,
              },
            },
            {
              student_id: {
                [Op.eq]: null,
              },
            },
          ],
        },
      });

      const registrations = await Registration.findAndCountAll({
        order: ['created_at'],
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name'],
            where: {
              id: {
                [Op.ne]: null,
              },
            },
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title'],
            where: {
              id: {
                [Op.ne]: null,
              },
            },
          },
        ],
      });

      const registrationsData = {
        registrations,
        total: registrations.count,
        pending,
      };

      return registrationsData;
    } catch (err) {
      console.error(
        `Não foi possível listar as matrículas: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async show(reqParams) {
    try {
      const registration = await Registration.findByPk(reqParams, {
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title'],
          },
        ],
      });

      if (!registration) {
        console.error('Não foi encontrada a matrícula');
      }
      return registration;
    } catch (err) {
      console.error(
        `Não foi possível listar a matrícula: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async store(reqBody) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const { student_id, plan_id, start_date } = reqBody;

    const checkRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (checkRegistration) {
      console.error('O aluno já tem um plano');
    }

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      console.error('Datas passadas não são permitidas');
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      console.error('Aluno não encontrado');
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      console.error('Plano não encontrado');
    }

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    try {
      const registration = await Registration.create({
        student_id,
        plan_id,
        start_date: dateStart,
        end_date: endOfPlan,
        price: finalPrice,
      });

      const registrationComplete = await Registration.findByPk(
        registration.id,
        {
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['id', 'name'],
            },
            {
              model: Plan,
              as: 'plan',
              attributes: ['id', 'title'],
            },
          ],
        }
      );

      await Queue.add(RegistrationMail.key, {
        registrationComplete,
      });

      return registration;
    } catch (err) {
      console.error(`Não foi realizar a matrícula: `, err.response.data.error);
    }
    return undefined;
  }

  async update(reqParams, reqBody) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }
    const { student_id, plan_id, start_date } = reqBody;

    const registration = await Registration.findByPk(reqParams);
    const plan = await Plan.findByPk(plan_id);

    if (!registration) {
      console.error('Matrícula inexistente');
    }

    const checkRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (checkRegistration) {
      console.error('O aluno já tem um plano');
    }

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      console.error('Datas passadas não são permitidas');
    }

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    try {
      const setRegistration = await registration.update({
        id: reqParams,
        student_id,
        plan_id,
        start_date: dateStart,
        end_date: endOfPlan,
        price: finalPrice,
      });

      return setRegistration;
    } catch (err) {
      console.error(`Não foi atualizar a matrícula: `, err.response.data.error);
    }
    return undefined;
  }

  async delete(reqParams) {
    const registrationExists = await Registration.findByPk(reqParams);

    if (!registrationExists) {
      console.error('Matrícula não encontrada');
    }

    try {
      await Registration.destroy({ where: { id: reqParams } });
    } catch (err) {
      console.error(
        `Não foi possível remover a matrícula: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default RegistrationService;
