import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';
import File from '../models/File';

class StudentService {
  async index(page, search) {
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
        `Não foi possível listar os estudantes: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async show(reqParams) {
    try {
      const student = await Student.findByPk(reqParams, {
        attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
      });

      if (!student) {
        console.error('Aluno não encontrado');
      }
      return student;
    } catch (err) {
      console.error(
        `Não foi possível mostrar o aluno: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async store(reqBody) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const studentExists = await Student.findOne({
      where: { email: reqBody.email },
    });

    if (studentExists) {
      console.error('O estudante já existe');
    }

    try {
      const { id, name, email, age, weight, height } = await Student.create(
        reqBody
      );

      const student = {
        id,
        name,
        email,
        age,
        weight,
        height,
      };

      return student;
    } catch (err) {
      console.error(
        `Não foi possível salvar o aluno: `,
        err.response.data.error
      );
    }
    return undefined;
  }

  async update(reqParams, reqBody) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(reqBody))) {
      console.error(
        'A validação falhou, verifique seus dados e tente novamente'
      );
    }

    const student = await Student.findOne({ where: { id: reqParams } });

    if (!student) {
      console.error('O estudante já existe');
    }

    try {
      await student.update(reqBody);
    } catch (err) {
      console.error(
        `Não foi possível atualizar o cadastro do aluno: `,
        err.response.data.error
      );
    }

    const { name, email, age, weight, height, avatar } = await Student.findByPk(
      reqParams,
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

    const updatedStudent = {
      id: reqParams,
      name,
      email,
      age,
      weight,
      height,
      avatar,
    };

    return updatedStudent;
  }

  async delete(reqParams) {
    const studentExists = await Student.findByPk(reqParams);

    if (!studentExists) {
      console.error('Estudante não encontrado');
    }

    try {
      await Student.destroy({ where: { reqParams } });
    } catch (err) {
      console.error(
        `Não foi possível remover o aluno: `,
        err.response.data.error
      );
    }
    return undefined;
  }
}

export default StudentService;
