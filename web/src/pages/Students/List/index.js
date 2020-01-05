import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FiPlusCircle } from 'react-icons/fi';

import * as studentsListActions from '~/store/modules/student/list';
import { deleteStudentRequest } from '~/store/modules/student/delete';

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
  const [studentName, setStudendName] = useState('');

  const dispatch = useDispatch();

  const { students: currentStudetns, loading, page, lastPage } = useSelector(
    state => state.studentList
  );

  const students = useMemo(() => currentStudetns, [currentStudetns]);
  const studentsQty = useMemo(() => students.length, [students]);

  useEffect(() => {
    dispatch(studentsListActions.listStudentRequest(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(e) {
    setStudendName(e.target.value);
    dispatch(studentsListActions.listStudentRequest(page, studentName));
  }

  function handleDelete(studentId) {
    if (window.confirm('Você tem certeza que deseja apagar esse aluno?')) {
      dispatch(deleteStudentRequest(studentId));
    }
  }

  function handlePage(page) {
    dispatch(studentsListActions.listStudentRequest(page));
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
                onClick={() =>
                  dispatch(studentsListActions.listStudentCreate())
                }
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
          {studentsQty > 0 ? (
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
                                dispatch(
                                  studentsListActions.listStudentRequestId(
                                    student.id
                                  )
                                )
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

export default StudentsList;
