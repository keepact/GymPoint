import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const studentExist = await Student.findByPk(id);

    if (!studentExist) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    let limit = {};

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };
    }

    const supportOrder = await HelpOrder.findAndCountAll({
      order: [['updated_at', 'DESC']],
      where: { student_id: id },
      ...limit,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const lastPage = page ? page * limit.limit >= supportOrder.count : true;

    return res.json({ content: supportOrder, lastPage });
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
