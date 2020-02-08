import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

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
      console.error(`Não foi possível listar as perguntas: `, err);
    }
    return undefined;
  }

  async create(id, reqBody) {
    try {
      return await HelpOrder.create({
        student_id: id,
        question: reqBody,
      });
    } catch (err) {
      console.error(`Não foi possível salvar a pergunta: `, err);
    }
    return undefined;
  }
}

export default SupportStudentRepository;
