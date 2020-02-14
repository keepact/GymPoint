import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Student from '../models/Student';

import authConfig from '../../config/auth';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Token invalido', messsages: err.inner });
  }
};

export const studentAuth = async (req, res, next) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ where: { email } });

    if (student.email !== email) {
      return res.status(401).json({ error: 'Email inválido' });
    }

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Email inválido', messsages: err.inner });
  }
};
