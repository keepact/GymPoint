import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import SupportMail from '../jobs/SupportMail';

import Queue from '../../lib/Queue';

class SupportCompanyRepository {
  async getAll(page) {
    try {
      return await HelpOrder.findAndCountAll({
        where: { answer: null },
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
            where: {
              id: {
                [Op.ne]: null,
              },
            },
          },
        ],
      });
    } catch (err) {
      console.error(`Sem pedidos de auxílio cadastrados: `, err);
    }
    return undefined;
  }

  async create(id, reqBody) {
    try {
      const question = await HelpOrder.findOne({
        where: { id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });

      const answerAt = new Date();

      await question.update({
        answer: reqBody,
        answer_at: answerAt,
      });

      await Queue.add(SupportMail.key, {
        question,
      });

      return question;
    } catch (err) {
      console.error(`Não foi possível enviar a resposta ao aluno: `, err);
    }
    return undefined;
  }
}

export default SupportCompanyRepository;
