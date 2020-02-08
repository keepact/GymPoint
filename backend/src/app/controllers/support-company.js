import SupportCompanyRepository from '../repositories/Support-company';

class SupportCompanyController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new SupportCompanyRepository().getAll(page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async store(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    const result = await new SupportCompanyRepository().create(id, answer);

    return res.status(result ? 200 : 400).json(result);
  }
}

export default new SupportCompanyController();
