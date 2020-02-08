import { Op } from 'sequelize';
import { startOfDay, parseISO, addMonths } from 'date-fns';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationRepository {
  async getAll(page) {
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
      console.error(`Não foi possível listar as matrículas: `, err);
    }
    return undefined;
  }

  async findById(id) {
    try {
      return await Registration.findByPk(id, {
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
    } catch (err) {
      console.error(`Não foi possível listar a matrícula: `, err);
    }
    return undefined;
  }

  async create(reqBody) {
    const { student_id, plan_id, start_date } = reqBody;

    const plan = await Plan.findByPk(plan_id);
    const dateStart = startOfDay(parseISO(start_date));

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
      console.error(`Não foi realizar a matrícula: `, err);
    }
    return undefined;
  }

  async update(id, reqBody) {
    const { student_id, plan_id, start_date } = reqBody;

    const registration = await Registration.findByPk(id);

    const plan = await Plan.findByPk(plan_id);
    const dateStart = startOfDay(parseISO(start_date));

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    try {
      const updatedRegistration = await registration.update({
        id,
        student_id,
        plan_id,
        start_date: dateStart,
        end_date: endOfPlan,
        price: finalPrice,
      });

      return updatedRegistration;
    } catch (err) {
      console.error(`Não foi atualizar a matrícula: `, err);
    }
    return undefined;
  }

  async delete(id) {
    try {
      return await Registration.destroy({ where: { id } });
    } catch (err) {
      console.error(`Não foi possível remover a matrícula: `, err);
    }
    return undefined;
  }
}

export default RegistrationRepository;
