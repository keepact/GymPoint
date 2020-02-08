import CheckinRepository from '../repositories/Checkin';

class CheckinController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const result = await new CheckinRepository().getAll(id, page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;

    const result = await new CheckinRepository().create(id);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new CheckinController();
