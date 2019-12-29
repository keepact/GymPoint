import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { page = 1, id, limit = 10, q: query } = req.query;

    const students = await Student.findAll({
      order: ['name'],
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      where: query ? { name: { [Op.iLike]: `%${query}%` } } : {},
    });

    const studentsCount = await Student.count();
    const lastPage = page * limit >= studentsCount;

    if (id) {
      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }
      return res.json(student);
    }

    return res.json({
      content: students,
      lastPage,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'O estudante já existe' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'A validação falhou, verifique seus dados e tente novamente',
      });
    }

    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'O estudante já existe' });
    }

    await student.update(req.body);

    const { name, email, age, weight, height, avatar } = await Student.findByPk(
      req.params.id,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
      avatar,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não encontrado' });
    }

    await Student.destroy({ where: { id } });

    return res.send();
  }
}

export default new StudentController();
