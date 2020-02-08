import PendingRepository from '../repositories/Pending';

class PendingController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new PendingRepository().getAll(page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }
}

export default new PendingController();
