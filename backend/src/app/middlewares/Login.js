import * as Yup from 'yup';

import User from '../models/User';

export default async function login(req, res, next) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  await schema.validate(req.body, { abortEarly: false });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Estudante não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'As senhas não batem, tente novamente' });
    }

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: err.inner });
  }
}
