import SupportService from '../services/SupportService';

class SupportController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new SupportService().index(page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;
    const support = req.body;

    const result = await new SupportService().store(id, support);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new SupportController();
