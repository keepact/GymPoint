import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { FaCircle } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

import {
  listRegistrationRequest,
  listRegistrationRequestId,
  listRegistrationCreatePlan,
} from '~/store/modules/registration/list/registration';
import { deleteRegistrationRequest } from '~/store/modules/registration/delete/registration';

import PageActions from '~/components/Pagination';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
  EmptyContainer,
} from '~/styles/shared';

function RegistrationList() {
  const dispatch = useDispatch();
  const {
    registrations: currentRegistrations,
    loading,
    page,
    lastPage,
    pending,
    pendingCount,
  } = useSelector(state => state.registrationList);

  const registrations = useMemo(() => currentRegistrations, [
    currentRegistrations,
  ]);
  const registrationsQty = useMemo(() => currentRegistrations.length, [
    currentRegistrations,
  ]);

  useEffect(() => {
    dispatch(listRegistrationRequest(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(registrationId) {
    if (window.confirm('Você tem certeza que deseja apagar essa matrícula?')) {
      dispatch(deleteRegistrationRequest(registrationId));

      const newRegistrations = registrations.filter(
        helpOrder => helpOrder.id !== registrationId
      );

      let newPage = newRegistrations.length ? page : page - 1;
      if (newPage === 0) {
        newPage = 1;
      }
      const newList = {
        newRegistrations,
        lastPage,
        pending,
        pendingCount,
      };

      dispatch(listRegistrationRequest(newPage, newList));
    }
  }

  function handlePage(page) {
    dispatch(listRegistrationRequest(page));
  }

  function handlePendingPage() {
    if (pending) {
      dispatch(listRegistrationRequest(1, 'pending'));
    } else {
      dispatch(listRegistrationRequest(1));
    }
  }

  return (
    <Container large>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>Gereciando Matrículas</h1>
            <div>
              <button
                type="button"
                disabled={!pending && pendingCount <= 0}
                onClick={handlePendingPage}
              >
                {pending || pendingCount === 0 ? 'Pendentes' : 'Voltar'}{' '}
                {pendingCount && pendingCount}
              </button>
              <button
                type="button"
                onClick={() => dispatch(listRegistrationCreatePlan())}
              >
                <span>Cadastrar</span>
                <FiPlusCircle size={20} />
              </button>
            </div>
          </TitleWrapper>
          {registrationsQty > 0 ? (
            <>
              <Content large>
                <Table>
                  <thead>
                    <tr>
                      <th>Aluno</th>
                      <th>Plano</th>
                      <th>Ínicio</th>
                      <th>Término</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations && (
                      <>
                        {registrations.map(registration => (
                          <tr key={registration.id}>
                            <td>{registration.student}</td>
                            <td>{registration.plan}</td>
                            <td>{registration.startDate}</td>
                            <td>{registration.endDate}</td>
                            <td>
                              <FaCircle color={registration.activePlan.color} />
                              <span>{registration.activePlan.title}</span>
                            </td>
                            <td>
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(
                                      listRegistrationRequestId(registration.id)
                                    )
                                  }
                                >
                                  editar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(registration.id)}
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
              <h2>
                {pendingCount !== undefined
                  ? 'Não há matrículas cadastradas ainda.'
                  : 'Não há matrículas pendentes'}
              </h2>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

RegistrationList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RegistrationList;
