import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(reqParams) {
    const studentExist = await Student.findByPk(reqParams);

    if (!studentExist) {
      console.error(
        'ID inválido, verifique sua identificação e tente novamente'
      );
    }

    try {
      return await Checkin.findAndCountAll({
        order: [['created_at', 'DESC']],
        where: { student_id: reqParams },
        limit: 10,
        offset: 0,
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
        ],
      });
    } catch (e) {
      console.error(
        'ID inválido, verifique sua identificação e tente novamente',
        e.response.data.error
      );
      return undefined;
    }
  }

  async store(reqParams) {
    const studentExist = await Student.findByPk(reqParams);

    if (!studentExist) {
      console.error(
        'ID inválido, verifique sua identificação e tente novamente'
      );
    }

    const checkValidCheckin = await Checkin.findAll({
      where: {
        student_id: reqParams,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkValidCheckin.length >= 5) {
      console.error('Só é possível realizar 5 checkins por semana');
    }

    try {
      return await Checkin.create({
        student_id: reqParams,
      });
    } catch (e) {
      console.error(
        `Não foi possível criar o checkin: `,
        e.response.data.error
      );
    }
    return undefined;
  }
}

export default CheckinController;
