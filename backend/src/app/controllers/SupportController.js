import * as Yup from 'yup';
import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import SupportMail from '../jobs/SupportMail';

import Queue from '../../lib/Queue';

class SupportController {
  async index(req, res) {
    const { page } = req.query;

    let limit = {};
    const include = [
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
    ];

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const supportOrder = await HelpOrder.findAndCountAll({
        where: { answer: null },
        ...limit,
        include,
      });

      const lastPage = page * limit.limit >= supportOrder.count;

      return res.json({ content: supportOrder, lastPage });
    }

    const supportOrder = await HelpOrder.findAll({
      where: { answer: null },
      include,
    });

    if (!supportOrder) {
      return res
        .status(400)
        .json({ error: 'Sem pedidos de auxílio cadastrados' });
    }

    return res.json(supportOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const supportOrder = await HelpOrder.findOne({
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

    await supportOrder.update({
      answer,
      answer_at: answerAt,
    });

    /**
     * Notify student
     */
    await Queue.add(SupportMail.key, {
      supportOrder,
    });

    return res.json(supportOrder);
  }
}

export default new SupportController();
