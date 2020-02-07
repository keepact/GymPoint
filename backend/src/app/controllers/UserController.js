import UserService from '../services/UserService';

class UserController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new UserService().index(page, req.userId);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new UserService().show(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const user = req.body;

    const result = await new UserService().store(user);

    return res.status(result ? 200 : 400).json(result);
  }

  async update(req, res) {
    const user = req.body;

    const result = await new UserService().update(req.userId, user);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new UserService().delete(id);

    return res.status(result ? 200 : 400).send();
  }
}

export default new UserController();
