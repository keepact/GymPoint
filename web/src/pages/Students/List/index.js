import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FiPlusCircle } from 'react-icons/fi';
import api from '~/services/api';
import history from '~/services/history';
import PageActions from '~/components/Pagination';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  Container,
  Content,
  EmptyContainer,
  TitleWrapper,
} from '~/styles/shared';
import { Table } from './styles';

function StudentsList() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [students, setStudents] = useState([]);

  // eslint-disable-next-line no-shadow
  async function loadStudents(currentPage = 1) {
    try {
      const response = await api.get('/students', {
        params: {
          page: currentPage,
          q: filter,
        },
      });

      setStudents(response.data.content);
      setCurrentPage(currentPage);
      setLastPage(response.data.lastPage);
      setLoading(false);
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const studentsSize = useMemo(() => students.length, [students]);

  function handleSearch(e) {
    setFilter(e.target.value);
  }

  async function handleDelete(studentId) {
    try {
      if (window.confirm('Você tem certeza que deseja apagar esse aluno?')) {
        await api.delete(`students/${studentId}`);
        toast.success('Aluno removido com sucesso');
        loadStudents();
      }
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
  }

  return (
    <Container>
      {loading ? (
        <Animation animation={loadingAnimation} width height loop />
      ) : (
        <>
          <TitleWrapper homepage>
            <h1>Gereciando alunos</h1>

            <div>
              <button
                type="button"
                onClick={() => history.push('/students/create')}
              >
                <span>Cadastrar</span>
                <FiPlusCircle size={20} />
              </button>
              <input
                type="text"
                placeholder="Buscar aluno"
                onChange={handleSearch}
              />
            </div>
          </TitleWrapper>
          {studentsSize > 0 ? (
            <>
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
                            <button
                              type="button"
                              onClick={() =>
                                history.push(`/students/${student.id}/edit`)
                              }
                            >
                              editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(student.id)}
                            >
                              apagar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Content>
              <PageActions
                disableNext={lastPage}
                disableBack={currentPage < 2}
                pageLabel={currentPage}
                refresh={loadStudents}
                currentPage={currentPage}
              />
            </>
          ) : (
            <EmptyContainer>
              <h2>Não há estudantes cadastrados ainda.</h2>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

StudentsList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default StudentsList;
