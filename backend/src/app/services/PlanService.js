import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanService {
  async index(page) {
    try {
      return await Plan.findAndCountAll({
        order: [['created_at', 'DESC']],
        limit: 10,
        offset: (page - 1) * 10,
      });
    } catch (err) {
      console.error('Houve um erro na listagem', err.response.data.error);
    }
    return undefined;
  }

  async show(reqParams) {
    try {
      const plan = await Plan.findByPk(reqParams);

      if (!plan) {
        console.error('Esse plano não existe');
      }
      return plan;
    } catch (err) {
      console.error('Houve um erro na listagem', err.response.data.error);
    }
    return undefined;
  }

  async store(reqBody) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    try {
      const planExists = await Plan.findOne({
        where: { title: reqBody.title },
      });

      if (planExists) {
        console.error('O plano já existe');
      }

      const { id, title, duration, price } = reqBody;

      const plan = await Plan.create({
        id,
        title,
        duration,
        price,
      });
      return plan;
    } catch (err) {
      console.error(
        'Houve um erro no cadastro do plano',
        err.response.data.error
      );
    }
    return undefined;
  }

  async update(reqParams, reqBody) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const plan = await Plan.findByPk(reqParams);

    if (!plan) {
      console.error('O plano não existe');
    }

    try {
      const { title, duration, price } = await plan.update(reqBody);

      const updatedPlan = {
        id: reqParams,
        title,
        duration,
        price,
      };

      return updatedPlan;
    } catch (err) {
      console.error(
        'Houve um erro ao atualizar o plano',
        err.response.data.error
      );
    }
    return undefined;
  }

  async delete(reqParams) {
    const planExists = await Plan.findByPk(reqParams);

    if (!planExists) {
      console.error('O plano não existe');
    }

    try {
      return await Plan.destroy({ where: { id: reqParams } });
    } catch (err) {
      console.error(
        'Houve um erro ao remover o plano',
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default PlanService;
