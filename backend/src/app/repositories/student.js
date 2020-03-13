import { Op } from 'sequelize';

import PusherRepository from './PusherRepository';
import Student from '../models/Student';
import File from '../models/File';

class StudentRepository {
  async getAll(page, search) {
    try {
      return await Student.findAndCountAll({
        order: ['name'],
        limit: 10,
        offset: (page - 1) * 10,
        attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
        include: {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        where: search ? { name: { [Op.iLike]: `%${search}%` } } : {},
      });
    } catch (err) {
      console.error(
        `Não foi possível listar os alunos cadastrados: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async findById(id) {
    try {
      return await Student.findByPk(id, {
        attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
      });
    } catch (err) {
      console.error(
        `Não foi possível mostrar o aluno cadastrado: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async create(reqBody) {
    try {
      return await Student.create(reqBody);
    } catch (err) {
      console.error(
        `Não foi possível criar o cadastro do aluno: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async update(id, reqBody) {
    try {
      const student = await Student.findByPk(id);
      await student.update(reqBody);

      return await Student.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
    } catch (err) {
      console.error(
        `Não foi possível atualizar o cadastro do aluno: ${JSON.stringify(err)}`
      );
    }
    return undefined;
  }

  async delete(id) {
    try {
      const pusherRepository = new PusherRepository();
      const students = await this.getAll(1);

      pusherRepository.sendNewListInRealTime(id, students);

      return await Student.destroy({ where: { id } });
    } catch (err) {
      return console.error(
        `Não foi possível remover o cadastro do aluno: ${JSON.stringify(err)}`
      );
    }
  }
}

export default StudentRepository;
