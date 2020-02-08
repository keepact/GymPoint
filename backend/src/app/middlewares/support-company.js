import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

export const getAllQuestions = async (req, res, next) => {
  try {
    if (!req.query.page) {
      return res.status(400).json({ error: 'Página não informada' });
    }
    const questions = await HelpOrder.findOne({
      where: { answer: null },
    });

    if (!questions) {
      return res.status(400).json({ error: 'Não há perguntas pendentes' });
    }

    return next();
  } catch (err) {
    return res.status(400).json({
      error:
        'Houve um erro na listagem das perguntas, tente novamente em alguns minutos',
      messsages: err.inner,
    });
  }
};

export const createAnswer = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const question = await HelpOrder.findOne({
      where: { id: req.params.id },
    });

    if (!question) {
      return res
        .status(400)
        .json({ error: 'A pergunta não existe ou já foi respondida' });
    }

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validação falhou', messsages: err.inner });
  }
};
