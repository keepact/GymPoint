import StudentRepository from '../repositories/student';

class StudentController {
  async index(req, res) {
    const { page, q } = req.query;

    const result = await new StudentRepository().getAll(page, q);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new StudentRepository().findById(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const student = req.body;

    const result = await new StudentRepository().create(student);

    return res.status(result ? 200 : 400).json(result);
  }

  async update(req, res) {
    const student = req.body;
    const { id } = req.params;

    const result = await new StudentRepository().update(id, student);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new StudentRepository().delete(id);

    return res.status(result ? 200 : 400).send();
  }
}

export default new StudentController();
