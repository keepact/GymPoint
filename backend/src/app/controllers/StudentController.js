import StudentService from '../services/StudentService';

class StudentController {
  async index(req, res) {
    const { page, q } = req.query;

    const result = await new StudentService().index(page, q);

    const lastPage = page * 10 >= result.total;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new StudentService().show(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const student = req.body;

    const result = await new StudentService().store(student);

    return res.status(result ? 200 : 400).json(result);
  }

  async update(req, res) {
    const student = req.body;
    const { id } = req.params;

    const result = await new StudentService().update(id, student);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new StudentService().delete(id);

    return res.status(result ? 200 : 400).send();
  }
}

export default new StudentController();
