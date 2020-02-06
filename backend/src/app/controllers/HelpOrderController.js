import HelpOrderService from '../services/HelpOrderService';

class HelpOrderController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const result = await new HelpOrderService().index(id, page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const result = await new HelpOrderService().store(id, question);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new HelpOrderController();
