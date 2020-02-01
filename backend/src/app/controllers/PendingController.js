import { Op } from 'sequelize';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

class PendingController {
  async index(req, res) {
    const { page } = req.query;

    let limit = {};

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };
    }

    const registrations = await Registration.findAndCountAll({
      ...limit,
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

    const lastPage = page ? page * limit.limit >= registrations.count : true;

    return res.json({ content: registrations, lastPage });
  }
}

export default new PendingController();
