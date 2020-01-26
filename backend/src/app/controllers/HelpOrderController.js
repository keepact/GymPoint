import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    let limit = {};
    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['name', 'email'],
      },
    ];

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const supportOrder = await HelpOrder.findAndCountAll({
        order: [['updated_at', 'DESC']],
        where: { student_id: id },
        ...limit,
        include,
      });

      const lastPage = page * limit.limit >= supportOrder.count;

      return res.json({ content: supportOrder, lastPage });
    }

    const supportOrder = await HelpOrder.findAll({
      order: [['updated_at', 'DESC']],
      where: { student_id: id },
      include,
    });

    if (!supportOrder) {
      return res.status(400).json({
        error: 'Sem pedidos de auxílio para esse estudante cadastrado',
      });
    }

    return res.json(supportOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const { id } = req.params;
    const { question } = req.body;

    const addSupportQuestion = await HelpOrder.create({
      student_id: id,
      question,
    });

    if (!addSupportQuestion) {
      return res.status(500).json({
        error: 'Houve um erro no envio, tente novamente em alguns minutos',
      });
    }

    return res.json(addSupportQuestion);
  }
}

export default new HelpOrderController();
