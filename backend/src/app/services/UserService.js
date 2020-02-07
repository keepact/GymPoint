import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserService {
  async index(page) {
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
        `Não foi possível listar os usuários: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async show(reqParams) {
    try {
      const user = await User.findByPk(reqParams, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!user) {
        console.error('Usuário não encontrado');
      }
      return user;
    } catch (err) {
      console.error(
        `Não foi possível mostrar o usuário: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async store(reqBody) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const userExists = await User.findOne({ where: { email: reqBody.email } });

    if (userExists) {
      console.error('Usuário já existe');
    }

    try {
      const { id, name, email } = await User.create(reqBody);

      const userData = {
        id,
        name,
        email,
      };

      return userData;
    } catch (err) {
      console.error(
        `Não foi possível salvar o usuário: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async update(reqParams, reqBody) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const { email, oldPassword } = reqBody;

    const user = await User.findByPk(reqParams);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        console.error('Usuário já existe');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      console.error('As senhas não batem, tente novamente');
    }

    try {
      await user.update(reqBody);
    } catch (err) {
      console.error(
        `Não foi possível editar o usuário: `,
        err.response.data.error
      );
    }

    const { id, name, avatar } = await User.findByPk(reqParams, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const userData = {
      id,
      name,
      email,
      avatar,
    };

    return userData;
  }

  async delete(reqParams) {
    const userExists = await User.findByPk(reqParams);

    if (!userExists) {
      console.error('Usuário não encontrado');
    }

    try {
      await User.destroy({ where: { reqParams } });
    } catch (err) {
      console.error(
        `Não foi possível remover o usuário: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default UserService;
