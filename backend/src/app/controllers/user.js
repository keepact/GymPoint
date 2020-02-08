import UserRepository from '../repositories/User';

class UserController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new UserRepository().getAll(page, req.userId);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new UserRepository().findById(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const user = req.body;

    const result = await new UserRepository().create(user);

    return res.status(result ? 200 : 400).json(result);
  }

  async update(req, res) {
    const user = req.body;

    const result = await new UserRepository().update(req.userId, user);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new UserRepository().delete(id);

    return res.status(result ? 200 : 400).send();
  }
}

export default new UserController();
