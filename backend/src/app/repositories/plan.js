import Plan from '../models/Plan';

class PlanRepository {
  async getAll(page) {
    try {
      return await Plan.findAndCountAll({
        order: [['created_at', 'DESC']],
        limit: 10,
        offset: (page - 1) * 10,
      });
    } catch (err) {
      console.error('Houve um erro na listagem de planos', err);
    }
    return undefined;
  }

  async findById(id) {
    try {
      return await Plan.findByPk(id);
    } catch (err) {
      console.error('Plano não encontrado', err);
    }
    return undefined;
  }

  async create(reqBody) {
    try {
      const { id, title, duration, price } = reqBody;

      return await Plan.create({
        id,
        title,
        duration,
        price,
      });
    } catch (err) {
      console.error('Houve um erro no cadastro do plano', err);
    }
    return undefined;
  }

  async update(id, reqBody) {
    try {
      const plan = await Plan.findByPk(id);

      const { title, duration, price } = await plan.update(reqBody);

      const updatedPlan = {
        id,
        title,
        duration,
        price,
      };

      return updatedPlan;
    } catch (err) {
      console.error('Houve um erro ao atualizar o plano', err);
    }
    return undefined;
  }

  async delete(id) {
    try {
      return await Plan.destroy({ where: { id } });
    } catch (err) {
      console.error('Houve um erro ao remover o plano', err);
    }
    return undefined;
  }
}

export default PlanRepository;
