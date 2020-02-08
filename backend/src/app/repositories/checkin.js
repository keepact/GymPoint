import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinRepository {
  async getAll(id, page) {
    try {
      return await Checkin.findAndCountAll({
        order: [['created_at', 'DESC']],
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
        `Não foi possível listar os checkins: ${JSON.stringify(err)}`
      );
      return undefined;
    }
  }

  async create(id) {
    try {
      return await Checkin.create({
        student_id: id,
      });
    } catch (err) {
      console.error(`Não foi possível criar o checkin: ${JSON.stringify(err)}`);
    }
    return undefined;
  }
}

export default CheckinRepository;
