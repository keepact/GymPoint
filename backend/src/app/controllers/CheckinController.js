import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page } = req.query;
    const { id } = req.params;

    const studentExist = await Student.findByPk(id);

    if (!studentExist) {
      return res.status(400).json({
        error: 'ID inválido, verifique sua identificação e tente novamente',
      });
    }

    let limit = {};

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };
    }

    const checkins = await Checkin.findAndCountAll({
      order: [['created_at', 'DESC']],
      where: { student_id: id },
      ...limit,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const lastPage = page ? page * limit.limit >= checkins.count : true;

    return res.json({ content: checkins, lastPage });
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
