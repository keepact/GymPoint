import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import PusherRepository from './Pusher';
import StudentRepository from './Student';

class SupportStudentRepository {
  async getAll(id, page) {
    try {
      return await HelpOrder.findAndCountAll({
        order: [['updated_at', 'DESC']],
        where: { student_id: id },
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
        `Não foi possível listar as perguntas: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async create(id, reqBody) {
    try {
      const pusherRepository = new PusherRepository();

      const newQuestion = await HelpOrder.create({
        student_id: id,
        question: reqBody,
      });

      const student = await new StudentRepository().findById(id);

      pusherRepository.sendQuestionInRealTime(newQuestion, student);

      return newQuestion;
    } catch (err) {
      console.error(
        `Não foi possível salvar a pergunta: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }
}

export default SupportStudentRepository;
