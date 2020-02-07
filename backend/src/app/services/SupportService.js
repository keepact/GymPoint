import * as Yup from 'yup';
import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import SupportMail from '../jobs/SupportMail';

import Queue from '../../lib/Queue';

class SupportController {
  async index(page) {
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
        `Sem pedidos de auxílio cadastrados: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async store(reqParams, reqBody) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const supportOrder = await HelpOrder.findOne({
      where: { id: reqParams },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const answerAt = new Date();

    try {
      await supportOrder.update({
        answer: reqBody.answer,
        answer_at: answerAt,
      });

      await Queue.add(SupportMail.key, {
        supportOrder,
      });

      return supportOrder;
    } catch (err) {
      console.error(
        `Não foi possível enviar a resposta ao aluno: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default SupportController;
