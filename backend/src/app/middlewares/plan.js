import * as Yup from 'yup';
import Plan from '../models/Plan';

export const getAllPlans = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem de planos, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const findPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na busca do plano, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const createPlan = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'O Plano já existe' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'O Plano não existe' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na tentativa de deletar o plano, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};
