import SessionService from '../services/SessionService';

class SessionController {
  async store(req, res) {
    const user = req.body;

    const result = await new SessionService().store(user);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new SessionController();
