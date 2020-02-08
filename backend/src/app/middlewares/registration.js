import * as Yup from 'yup';
import { startOfDay, parseISO, isBefore } from 'date-fns';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

export const getAllRegistrations = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem de matrículas, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const findRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula não encontrada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na busca da matrícula, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const createRegistration = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

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

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const updateRegistration = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const { student_id, start_date } = req.body;

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula não encontrado' });
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

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const deleteRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Matrícula não encontrada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na tentativa de deletar a matrícula, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};
