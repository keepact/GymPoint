import User from '../models/User';
import File from '../models/File';

class UserRepository {
  async getAll(page) {
    try {
      return await User.findAndCountAll({
        order: ['name'],
        limit: 10,
        offset: (page - 1) * 10,
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
    } catch (err) {
      console.error(`Não foi possível listar os usuários: `, err);
    }
    return undefined;
  }

  async findById(id) {
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
    } catch (err) {
      console.error(
        `Não foi possível encontrar o usuário: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async create(reqBody) {
    try {
      return await User.create(reqBody);
    } catch (err) {
      console.error(`Não foi possível salvar o usuário: `, err);
    }
    return undefined;
  }

  async update(id, reqBody) {
    try {
      const user = await User.findByPk(id);

      await user.update(reqBody);

      return await User.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
    } catch (err) {
      console.error(`Não foi possível editar o usuário: `, err);
    }
    return undefined;
  }

  async delete(id) {
    try {
      return await User.destroy({ where: { id } });
    } catch (err) {
      console.error(`Não foi possível remover o usuário: `, err);
    }
    return undefined;
  }
}

export default UserRepository;
