import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FaCircle } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

import { format, parseISO, isBefore, startOfDay } from 'date-fns';
import { longDate, language } from '~/util/format';
import { requestFailMessage } from '~/util/validation';

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
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [pendingPage, setPendingPage] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  async function loadRegistrations(currentPage, pending) {
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
        student: registration.student
          ? registration.student.name
          : 'Aluno Removido',
        plan: registration.plan ? registration.plan.title : 'Plano Removido',
        startDate: format(
          parseISO(registration.start_date),
          longDate,
          language
        ),
        endDate: format(parseISO(registration.end_date), longDate, language),
        activePlan: handleActive(
          registration.student && registration.plan
            ? registration.active
            : 'Pendente',
          registration.start_date
        ),
      }));

      setRegistrations(data);
      setPendingCount(response.data.pending);
      setPage(currentPage);
      setLastPage(response.data.lastPage);
      setLoading(false);
    } catch (err) {
      toast.error(requestFailMessage);
    }
  }

  useEffect(() => {
    loadRegistrations(1);
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
      toast.error(err.response.data.error);
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

  async function handlePendingPage(action) {
    const linkToPage =
      action === 'back'
        ? await loadRegistrations(1)
        : await loadRegistrations('', 'pending');

    setPendingPage(!pendingPage);

    return linkToPage;
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
                disabled={!pendingPage && pendingCount <= 0}
                onClick={() => handlePendingPage(pendingPage ? 'back' : 'go')}
              >
                {pendingPage ? 'Voltar' : 'Pendentes'} {pendingCount}
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
                disableBack={page < 2}
                pageLabel={page}
                refresh={loadRegistrations}
                currentPage={page}
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
