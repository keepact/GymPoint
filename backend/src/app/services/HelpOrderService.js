import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderService {
  async index(reqParams, page) {
    const studentExist = await Student.findByPk(reqParams);

    if (!studentExist) {
      console.error(
        'ID inválido, verifique sua identificação e tente novamente'
      );
    }

    try {
      return await HelpOrder.findAndCountAll({
        order: [['updated_at', 'DESC']],
        where: { student_id: reqParams },
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });
    } catch (err) {
      console.error(
        `Não foi possível listar as perguntas: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async store(reqParams, reqBody) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }
    try {
      return await HelpOrder.create({
        student_id: reqParams,
        question: reqBody,
      });
    } catch (err) {
      console.error(
        `Não foi possível realizar a pergunta: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default HelpOrderService;
