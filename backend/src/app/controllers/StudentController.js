import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { page, id, q } = req.query;

    let limit = {};
    const order = ['name'];
    const attributes = ['id', 'name', 'email', 'age', 'height', 'weight'];

    if (page) {
      limit = {
        limit: 10,
        offset: (page - 1) * 10,
      };
      const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {};

      const students = await Student.findAndCountAll({
        order,
        ...limit,
        attributes,
        include: {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        where,
      });

      const lastPage = page * limit.limit >= students.count;

      return res.json({
        content: students,
        lastPage,
      });
    }

    if (id) {
      const student = await Student.findByPk(id, {
        attributes,
      });

      if (!student) {
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }
      return res.json(student);
    }

    const students = await Student.findAll({
      order,
      attributes,
    });

    return res.json(students);
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
