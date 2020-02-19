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
      console.error(
        `Não foi possível listar os usuários cadastrados: ${JSON.stringify(
          err
        )}`
      );
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
        `Não foi possível mostrar o usuário cadastrado: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async create(reqBody) {
    try {
      return await User.create(reqBody);
    } catch (err) {
      console.error(
        `Não foi possível criar o cadastro usuário: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async update(id, reqBody) {
    try {
      const user = await User.findByPk(id);

      await user.update(reqBody);

      return await User.findByPk(id, {
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
      console.error(
        `Não foi possível editar o cadastro do usuário: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async delete(id) {
    try {
      return await User.destroy({ where: { id } });
    } catch (err) {
      console.error(
        `Não foi possível remover o cadastro do usuário: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }
}

export default UserRepository;
