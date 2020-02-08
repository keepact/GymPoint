import SupportStudentRepository from '../repositories/Support-student';

class SupportStudentController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const result = await new SupportStudentRepository().index(id, page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const result = await new SupportStudentRepository().store(id, question);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new SupportStudentController();
