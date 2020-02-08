import * as Yup from 'yup';
import Student from '../models/Student';

export const getAllStudents = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem dos estudantes, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const findStudent = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na busca do estudante, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'O estudante já existe' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'Não foi possível encontrar o aluno' });
    }

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: error.inner });
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não encontrado' });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error:
        'Houve um erro na tentativa de deletar o estudante, tente novamente em alguns minutos',
      messsages: error.inner,
    });
  }
};
