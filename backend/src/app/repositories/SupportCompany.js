import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import PusherRepository from './Pusher';
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
      console.error(
        `Não foi possível carregar os pedidos de auxílio pendentes: ${JSON.stringify(
          err
        )}`
      );
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

      const pusherRepository = new PusherRepository();

      pusherRepository.sendAnswerInRealTime(question, reqBody);

      await question.update({
        answer: reqBody,
        answer_at: answerAt,
      });

      await Queue.add(SupportMail.key, {
        question,
      });

      return question;
    } catch (err) {
      console.error(
        `Não foi possível enviar a resposta ao aluno: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }
}

export default SupportCompanyRepository;
