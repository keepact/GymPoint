import PendingService from '../services/PendingService';

class PendingController {
  async index(req, res) {
    const result = await new PendingService().index();
    const { page } = req.query;

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }
}

export default new PendingController();
