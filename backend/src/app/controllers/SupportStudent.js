import SupportStudentRepository from '../repositories/SupportStudent';

class SupportStudentController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const result = await new SupportStudentRepository().getAll(id, page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const result = await new SupportStudentRepository().create(id, question);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new SupportStudentController();
