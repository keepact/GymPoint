import * as Yup from 'yup';
import User from '../models/User';

export const getAllUsers = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem dos usuários, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const findUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na busca do usuário, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Endereço de email já cadastrado' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const updateUser = async (req, res, next) => {
  try {
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

    await schema.validate(req.body, { abortEarly: false });

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Endereço de email já cadastrado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(400)
        .json({ error: 'As senhas não batem, tente novamente' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na tentativa de deletar o usuário, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};
