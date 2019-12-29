import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1, id, limit = 10 } = req.query;

    const plans = await Plan.findAll({
      limit,
      offset: (page - 1) * limit,
    });

    if (id) {
      const plan = await Plan.findByPk(id);

      if (!plan) {
        return res.status(400).json({ error: 'Plano não existe' });
      }
      return res.json(plan);
    }

    const plansCount = await Plan.count();
    const lastPage = page * limit >= plansCount;

    return res.json({ content: plans, lastPage });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: 'O plano já existe' });
    }

    const { id, title, duration, price } = req.body;

    const plan = await Plan.create({
      id,
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.json('Plan does not exist');
    }

    const { id } = req.params;

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const planExists = await Plan.findByPk(id);

    if (!planExists) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    await Plan.destroy({ where: { id } });

    return res.send();
  }
}

export default new PlanController();
