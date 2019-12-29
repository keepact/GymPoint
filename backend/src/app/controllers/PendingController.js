import { Op } from 'sequelize';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

class PendingController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const registrations = await Registration.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
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

    if (!registrations) {
      return res.status(400).json({ error: 'Não há matrículas pendentes' });
    }

    const lastPage = page * limit >= registrations.count;

    return res.json({
      content: registrations,
      lastPage,
    });
  }
}

export default new PendingController();
