import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
  PageActions,
  EmptyContainer,
} from '~/styles/shared';

function RegistrationList({ history }) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [registrations, setRegistrations] = useState([]);

  // eslint-disable-next-line no-shadow
  async function loadRegistrations(currentPage = 1) {
    try {
      const response = await api.get('/registrations', {
        params: {
          page: currentPage,
        },
      });

      const data = response.data.content.rows.map(registration => ({
        ...registration,
        startDateFormatted: format(
          parseISO(registration.start_date),
          "dd'/'M/Y"
        ),
        endDateFormatted: format(parseISO(registration.end_date), "dd'/'M/Y"),
      }));

      setRegistrations(data);
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

  function handlePage(action) {
    const pageNumber = action === 'back' ? currentPage - 1 : currentPage + 1;
    loadRegistrations(pageNumber);
  }

  async function handleDelete(registrationId) {
    try {
      if (
        // eslint-disable-next-line no-alert
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

  return (
    <Container large>
      {loading ? (
        <Animation animation={loadingAnimation} loop size />
      ) : (
        <>
          <TitleWrapper>
            <h1>Gereciando Matrículas</h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('registrations/create')}
              >
                Cadastrar
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
                      <th>Ativa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(registration => (
                      <tr key={registration.id}>
                        <td>{registration.student.name}</td>
                        <td>{registration.plan.title}</td>
                        <td>{registration.startDateFormatted}</td>
                        <td>{registration.endDateFormatted}</td>
                        <td>{registration.active ? 'Ativa' : 'Terminada'}</td>
                        <td>
                          <div>
                            <Link to={`/registrations/${registration.id}`}>
                              editar
                            </Link>
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
              <PageActions>
                <button
                  type="button"
                  disabled={currentPage < 2}
                  onClick={() => handlePage('back')}
                >
                  Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                  type="button"
                  disabled={lastPage}
                  onClick={() => handlePage('next')}
                >
                  Próximo
                </button>
              </PageActions>
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
