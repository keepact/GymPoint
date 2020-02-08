import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

export const getAllCheckins = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    const validId = await Student.findByPk(req.params.id);

    if (!validId) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem de checkins, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const createCheckin = async (req, res, next) => {
  try {
    const validId = await Student.findByPk(req.params.id);

    if (!validId) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    const checkValidCheckin = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkValidCheckin.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Só é possível realizar 5 checkins por semana' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro ao salvar o aluno, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};
