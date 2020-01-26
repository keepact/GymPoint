import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    let limit = {};
    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['name', 'email'],
      },
    ];

    const studentExist = await Student.findByPk(id);

    if (!studentExist) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };

      const checkin = await Checkin.findAndCountAll({
        where: { student_id: id },
        ...limit,
        include,
      });

      const lastPage = page * limit.limit >= checkin.count;

      return res.json({ content: checkin, lastPage });
    }

    const checkin = await Checkin.findAll({
      where: { student_id: id },
      include,
    });

    if (!checkin) {
      return res.status(400).json({
        error: 'Sem checkins realizados, comece hoje!',
      });
    }

    return res.json(checkin);
  }

  async store(req, res) {
    const { id } = req.params;

    const studentExist = await Student.findByPk(id);

    if (!studentExist) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    const checkValidCheckin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkValidCheckin.length >= 5) {
      return res
        .status(403)
        .json({ error: 'Só é possível realizar 5 checkins por semana' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
