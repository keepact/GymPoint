import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

export const getAllQuestions = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    const questions = await HelpOrder.findOne({
      where: { student_id: req.params.id },
    });

    if (!questions) {
      return res
        .status(400)
        .json({ error: 'Sem pedidos de auxílio cadastrados' });
    }

    return next();
  } catch (err) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem de perguntas, tente novamente em alguns minutos',
      messsages: err.inner,
    });
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const question = await HelpOrder.findOne({
      where: {
        question: req.body.question,
        id: req.params.id,
      },
    });

    if (question) {
      return res.status(400).json({ error: 'A pergunta já foi feita' });
    }

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: err.inner });
  }
};
