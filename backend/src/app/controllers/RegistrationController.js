import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page, id } = req.query;

    let limit = {};
    const order = ['created_at'];
    const attributes = ['id', 'start_date', 'end_date', 'price', 'active'];

    const include = [
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
    ];

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

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const registrations = await Registration.findAndCountAll({
        order,
        ...limit,
        attributes,
        include,
      });

      const lastPage = page * limit.limit >= registrations.count;

      return res.json({ lastPage, pending, content: registrations });
    }

    if (id) {
      const registration = await Registration.findByPk(id, {
        attributes,
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
        return res.status(400).json({ error: 'Não há matrículas cadastradas' });
      }
      return res.json(registration);
    }

    const registrations = await Registration.findAll({
      order,
      attributes,
    });

    return res.json({
      content: registrations,
      pending,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const { student_id, plan_id, start_date } = req.body;

    const checkRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (checkRegistration) {
      return res.status(400).json({ error: 'O aluno já tem um plano' });
    }

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: dateStart,
      end_date: endOfPlan,
      price: finalPrice,
    });

    const registrationComplete = await Registration.findByPk(registration.id, {
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

    await Queue.add(RegistrationMail.key, {
      registrationComplete,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const registration = await Registration.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula inexistente' });
    }

    const checkRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (checkRegistration) {
      return res.status(400).json({ error: 'O aluno já tem um plano' });
    }

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas' });
    }

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    const setRegistration = await registration.update({
      id,
      student_id,
      plan_id,
      start_date: dateStart,
      end_date: endOfPlan,
      price: finalPrice,
    });

    return res.json(setRegistration);
  }

  async delete(req, res) {
    const { id } = req.params;

    const registrationExists = await Registration.findByPk(id);

    if (!registrationExists) {
      return res.status(400).json({ error: 'Matrícula não encontrada' });
    }

    await Registration.destroy({ where: { id } });

    return res.send();
  }
}

export default new RegistrationController();
