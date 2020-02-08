import { Op } from 'sequelize';
import Registration from '../models/Registration';

import Student from '../models/Student';
import Plan from '../models/Plan';

class PendingRepository {
  async getAll(page) {
    try {
      return await Registration.findAndCountAll({
        limit: 10,
        offset: (page - 1) * 10,
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
    } catch (err) {
      return console.error(
        `Não foi possível listar as matrículas pendentes: ${JSON.stringify(
          err
        )}`
      );
    }
  }
}

export default PendingRepository;
