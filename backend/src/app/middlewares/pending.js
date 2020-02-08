import { Op } from 'sequelize';

import Registration from '../models/Registration';

export default async function getAllPendingRegistrations(req, res, next) {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    const pending = await Registration.findOne({
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

    if (!pending) {
      return res.status(400).json({ error: 'Não há matrículas pendentes' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem de matrículas pendentes, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
}
