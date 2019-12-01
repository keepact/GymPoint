import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Table, Container, Content, TitleWrapper } from './styles';

export default function List() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    async function loadStudents(page = 1) {
      const response = await api.get('/students', {
        params: {
          page,
        },
      });

      setStudents(response.data);
      setLoading(false);
    }
    loadStudents();
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <h1>Gereciando alunos</h1>

        <div>
          <button type="button">Cadastrar</button>
          <input type="text" placeholder="Buscar aluno" />
        </div>
      </TitleWrapper>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>
                <strong>Nome</strong>
              </th>
              <th>
                <strong>Email</strong>
              </th>
              <th>
                <strong>Idade</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>
                  <span>{student.name}</span>
                </td>
                <td>
                  <span>{student.email}</span>
                </td>
                <td>
                  <span>{student.age}</span>
                </td>
                <td>
                  <div>
                    <Link to={`/students/${student.id}`}>editar</Link>
                    <button type="button">apagar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
