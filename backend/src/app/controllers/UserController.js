import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const { page, id } = req.query;

    let limit = {};
    const order = ['name'];
    const attributes = ['id', 'name', 'email'];
    const include = [
      {
        model: File,
        as: 'avatar',
        attributes: ['id', 'path', 'url'],
      },
    ];

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const users = await User.findAndCountAll({
        order,
        ...limit,
        attributes,
        include,
      });

      const lastPage = page * limit.limit >= users.count;

      return res.json({ content: users, lastPage });
    }

    if (id) {
      const user = await User.findByPk(req.userId, {
        include,
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
      return res.json(user);
    }

    const users = await User.findAll({
      order,
      ...limit,
      attributes,
      include,
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(401)
        .json({ error: 'As senhas não batem, tente novamentes' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    await User.destroy({ where: { id } });

    return res.send();
  }
}

export default new UserController();
