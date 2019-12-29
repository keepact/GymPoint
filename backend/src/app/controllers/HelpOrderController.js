import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;

    const supportOrder = await HelpOrder.findAll({
      where: { student_id: id },
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!supportOrder) {
      return res
        .status(400)
        .json({ error: 'Sem pedidos de auxílio cadastrado' });
    }

    return res.json(supportOrder);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const addSupportQuestion = await HelpOrder.create({
      student_id: id,
      question,
    });

    if (!addSupportQuestion) {
      return res
        .status(400)
        .json({ error: 'Pedido de auxílio não encontrado' });
    }

    return res.json(addSupportQuestion);
  }
}

export default new HelpOrderController();
