import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Table, Container, Content, TitleWrapper, PageActions } from './styles';

export default function List() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  // eslint-disable-next-line no-shadow
  async function loadStudents(page = 1) {
    const response = await api.get('/students', {
      params: {
        page,
        q: filter,
      },
    });

    setStudents(response.data);
    setPage(page);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const studentsSize = useMemo(() => students.length, [students]);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadStudents(pageNumber);
  }

  function nextPage() {
    if (studentsSize < 10) return;
    const pageNumber = page + 1;
    loadStudents(pageNumber);
  }

  function handleSearch(e) {
    setFilter(e.target.value);
  }

  return (
    <Container>
      <TitleWrapper>
        <h1>Gereciando alunos</h1>

        <div>
          <button type="button">Cadastrar</button>
          <input
            type="text"
            placeholder="Buscar aluno"
            onChange={handleSearch}
          />
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
      <PageActions>
        <button type="button" disabled={page < 2} onClick={prevPage}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button type="button" disabled={studentsSize < 10} onClick={nextPage}>
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
