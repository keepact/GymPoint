import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class AuthRepository {
  async signIn(reqBody) {
    const { email } = reqBody;

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
      console.error(`Erro na autenticação: ${JSON.stringify(err)}`);
    }
    return undefined;
  }
}

export default AuthRepository;
