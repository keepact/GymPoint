import PlanRepository from '../repositories/Plan';

class PlanController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new PlanRepository().getAll(page);

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new PlanRepository().findById(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const plan = req.body;

    const result = await new PlanRepository().create(plan);

    return res.status(result ? 201 : 400).json(result);
  }

  async update(req, res) {
    const plan = req.body;
    const { id } = req.params;

    const result = await new PlanRepository().update(id, plan);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new PlanRepository().delete(id);

    return res.status(result ? 204 : 400).send();
  }
}

export default new PlanController();
