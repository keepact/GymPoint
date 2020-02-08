import AuthRepository from '../repositories/Auth';

class AuthController {
  async store(req, res) {
    const user = req.body;

    const result = await new AuthRepository().signIn(user);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new AuthController();
