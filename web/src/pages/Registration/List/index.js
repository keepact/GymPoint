import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';
import { toast } from 'react-toastify';

import { FaCircle } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

import history from '~/services/history';

import PageActions from '~/components/Pagination';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
  EmptyContainer,
} from '~/styles/shared';

function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [removedPage, setRemovedPage] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  async function loadRegistrations(pending, currentPage = 1) {
    try {
      const response = !pending
        ? await api.get('/registrations', {
            params: {
              page: currentPage,
            },
          })
        : await api.get('registrations/pending/removed');

      const data = response.data.content.rows.map(registration => ({
        ...registration,
        student_name: registration.student
          ? registration.student.name
          : 'Aluno Removido',
        plan_title: registration.plan
          ? registration.plan.title
          : 'Plano Removido',
        startDateFormatted: format(
          parseISO(registration.start_date),
          "dd'/'M/Y"
        ),
        endDateFormatted: format(parseISO(registration.end_date), "dd'/'M/Y"),
        activePlan: handleActive(
          registration.student && registration.plan
            ? registration.active
            : 'Pendente',
          registration.start_date
        ),
      }));

      setRegistrations(data);
      setPendingCount(response.data.pending);
      setCurrentPage(currentPage);
      setLastPage(response.data.lastPage);
      setLoading(false);
    } catch (err) {
      toast.error('Erro na requisição, tente novamente em alguns minutos');
    }
  }

  useEffect(() => {
    loadRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registrationsQty = useMemo(() => registrations.length, [registrations]);

  async function handleDelete(registrationId) {
    try {
      if (
        window.confirm('Você tem certeza que deseja apagar essa matrícula?')
      ) {
        await api.delete(`registrations/${registrationId}`);
        toast.success('Matrícula removida com sucesso');
        loadRegistrations();
      }
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
  }

  function handleActive(active, date) {
    const startOfPlan = startOfDay(parseISO(date));

    if (active === 'Pendente') {
      return {
        title: 'Pendente',
        color: 'black',
      };
    }
    if (active) {
      return {
        title: 'Ativo',
        color: 'green',
      };
    }
    if (isBefore(new Date(), startOfPlan)) {
      return {
        title: 'Agendado',
        color: 'orange',
      };
    }
    return {
      title: 'Terminado',
      color: 'red',
    };
  }

  async function handleRemovedPage(action) {
    const linkToPage =
      action === 'back'
        ? await loadRegistrations()
        : await loadRegistrations('pending');

    setRemovedPage(!removedPage);

    return linkToPage;
  }

  return (
    <Container large>
      {loading ? (
        <Animation animation={loadingAnimation} loop height width />
      ) : (
        <>
          <TitleWrapper>
            <h1>Gereciando Matrículas</h1>
            <div>
              <button
                type="button"
                disabled={pendingCount <= 0 && !removedPage}
                onClick={() => handleRemovedPage(!removedPage ? 'go' : 'back')}
              >
                {!removedPage ? 'Pendentes' : 'Voltar'} {pendingCount}
              </button>
              <button
                type="button"
                onClick={() => history.push('registrations/create')}
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
                    {registrations.map(registration => (
                      <tr key={registration.id}>
                        <td>{registration.student_name}</td>
                        <td>{registration.plan_title}</td>
                        <td>{registration.startDateFormatted}</td>
                        <td>{registration.endDateFormatted}</td>
                        <td>
                          <FaCircle color={registration.activePlan.color} />
                          <span>{registration.activePlan.title}</span>
                        </td>
                        <td>
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                history.push(
                                  `/registrations/${registration.id}/edit`
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
                  </tbody>
                </Table>
              </Content>
              <PageActions
                disableNext={lastPage}
                disableBack={currentPage < 2}
                pageLabel={currentPage}
                refresh={() =>
                  loadRegistrations(
                    '',
                    !lastPage ? currentPage + 1 : currentPage - 1
                  )
                }
                currentPage={currentPage}
              />
            </>
          ) : (
            <EmptyContainer>
              <h2>Não há matrículas cadastradas ainda.</h2>
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
