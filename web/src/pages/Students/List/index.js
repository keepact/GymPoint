import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FiPlusCircle } from 'react-icons/fi';
import history from '~/services/history';

import { listStudentRequest } from '~/store/modules/student/list/student';
import { deleteStudentRequest } from '~/store/modules/student/delete/student';

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
  const [studentName, setStudendName] = useState();
  // const [page, setPage] = useState(1);
  // // const [lastPage, setLastPage] = useState('');
  // const [students, setStudents] = useState([]);

  // eslint-disable-next-line no-shadow
  // async function loadStudents(currentPage) {
  //   try {
  //     const response = await api.get('/students', {
  //       params: {
  //         page: currentPage,
  //         q: filter,
  //       },
  //     });

  //     setStudents(response.data.content.rows);
  //     setPage(currentPage);
  //     setLastPage(response.data.lastPage);
  //     setLoading(false);
  //   } catch (err) {
  //     toast.error(requestFailMessage);
  //   }
  // }

  const dispatch = useDispatch();

  const { students, loading, page, lastPage } = useSelector(
    state => state.studentList
  );

  useEffect(() => {
    dispatch(listStudentRequest(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentsSize = useMemo(() => students.length, [students]);

  function handleSearch(e) {
    dispatch(listStudentRequest(undefined, e.target.value));
  }

  async function handleDelete(studentId) {
    if (window.confirm('Você tem certeza que deseja apagar esse aluno?')) {
      dispatch(deleteStudentRequest(studentId));

      const currentStudents = students.filter(
        helpOrder => helpOrder.id !== studentId
      );

      let newPage = currentStudents.length ? page : page - 1;
      if (newPage === 0) {
        newPage = 1;
      }
      const newList = {
        currentStudents,
        lastPage,
      };

      dispatch(listStudentRequest(newPage, newList));
    }
  }

  function handlePage(page) {
    dispatch(listStudentRequest(page));
  }

  return (
    <Container>
      {loading ? (
        <Animation animation={loadingAnimation} />
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
                    {students && (
                      <>
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
                      </>
                    )}
                  </tbody>
                </Table>
              </Content>
              <PageActions
                disableNext={lastPage}
                disableBack={page < 2}
                pageLabel={page}
                refresh={handlePage}
                currentPage={page}
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
