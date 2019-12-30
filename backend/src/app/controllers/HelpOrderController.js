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
        where: { student_id: id },
        ...limit,
        include,
      });

      const lastPage = page * limit.limit >= supportOrder.count;

      return res.json({ content: supportOrder, lastPage });
    }

    const supportOrder = await HelpOrder.findAll({
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
