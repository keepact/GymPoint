import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import Student from '../models/Student';

import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import StudentFirstAccess from '../jobs/StudentFirstAccess';

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

  async studentAuth(email) {
    try {
      const student = await Student.findOne({ where: { email } });

      await Queue.add(StudentFirstAccess.key, {
        student,
      });

      return student;
    } catch (err) {
      console.error(`Erro na autenticação: ${JSON.stringify(err)}`);
    }
    return undefined;
  }
}

export default AuthRepository;
