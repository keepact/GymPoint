import RegistrationRepository from '../repositories/Registration';

class RegistrationController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new RegistrationRepository().getAll(page);

    const lastPage = page * 10 >= result.total;

    return res.status(result ? 200 : 400).json({
      lastPage,
      pending: result.pending,
      content: result.registrations,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new RegistrationRepository().findById(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const registration = req.body;

    const result = await new RegistrationRepository().create(registration);

    return res.status(result ? 201 : 400).json(result);
  }

  async update(req, res) {
    const registration = req.body;
    const { id } = req.params;

    const result = await new RegistrationRepository().update(id, registration);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new RegistrationRepository().delete(id);

    return res.status(result ? 204 : 400).send();
  }
}

export default new RegistrationController();
