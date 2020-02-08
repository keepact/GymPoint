import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class AuthRepository {
  async store(reqBody) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const { email, password } = reqBody;

    try {
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!user) {
        console.error('Estudante não encontrado');
      }

      if (!(await user.checkPassword(password))) {
        console.error('As senhas não batem, tente novamente');
      }

      const { id, name, avatar } = user;

      const userData = {
        user: {
          id,
          name,
          email,
          avatar,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      };

      return userData;
    } catch (err) {
      console.error(`Erro na autenticação: `, err.response.data.error);
    }
    return undefined;
  }
}

export default AuthRepository;
