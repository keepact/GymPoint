import { Op } from 'sequelize';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

class PendingController {
  async index(req, res) {
    const { page } = req.query;

    let limit = {};
    const attributes = ['id', 'start_date', 'end_date', 'price', 'active'];

    const include = [
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
    ];

    const where = {
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
    };

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const registrations = await Registration.findAndCountAll({
        ...limit,
        attributes,
        include,
        where,
      });

      const lastPage = page * limit.limit >= registrations.count;

      return res.json({ content: registrations, lastPage });
    }

    const registrations = await Registration.findAll({
      attributes,
      include,
      where,
    });

    if (!registrations) {
      return res.status(400).json({ error: 'Não há matrículas pendentes' });
    }

    return res.json(registrations);
  }
}

export default new PendingController();
