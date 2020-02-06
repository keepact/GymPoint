import PlanService from '../services/PlanService';

class PlanController {
  async index(req, res) {
    const { page } = req.query;

    const result = await new PlanService().index();

    const lastPage = page * 10 >= result.count;

    return res.status(result ? 200 : 400).json({ content: result, lastPage });
  }

  async show(req, res) {
    const { id } = req.params;

    const result = await new PlanService().show(id);

    return res.status(result ? 200 : 400).json(result);
  }

  async store(req, res) {
    const plan = req.body;

    const result = await new PlanService().store(plan);

    return res.status(result ? 200 : 400).json(result);
  }

  async update(req, res) {
    const plan = req.body;
    const { id } = req.params;

    const result = await new PlanService().update(id, plan);

    return res.status(result ? 200 : 400).json(result);
  }

  async delete(req, res) {
    const { id } = req.params;

    const result = await new PlanService().delete(id);

    return res.status(result ? 200 : 400).send();
  }
}

export default new PlanController();
