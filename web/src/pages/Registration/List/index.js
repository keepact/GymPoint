import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
  PageActions,
} from '~/components/Container';

function List({ history }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [registrations, setRegistrations] = useState([]);

  // eslint-disable-next-line no-shadow
  async function loadRegistrations(page = 1) {
    const response = await api.get('/registrations', {
      params: {
        page,
      },
    });

    const data = response.data.map(registration => ({
      ...registration,
      startDateFormatted: format(parseISO(registration.start_date), "dd'/'M/Y"),
      endDateFormatted: format(parseISO(registration.end_date), "dd'/'M/Y"),
    }));

    setRegistrations(data);
    setPage(page);
    setLoading(false);
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  const currentRegistrations = useMemo(
    () => registrations.filter(r => r.student && r.plan !== null),
    [registrations]
  );

  const registrationsQty = useMemo(() => currentRegistrations.length, [
    currentRegistrations,
  ]);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadRegistrations(pageNumber);
  }

  function nextPage() {
    if (registrationsQty < 10) return;
    const pageNumber = page + 1;
    loadRegistrations(pageNumber);
  }

  async function handleDelete(registrationId) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Você tem certeza que deseja apagar essa matrícula?')) {
      await api.delete(`registrations/${registrationId}`);
      loadRegistrations();
    }
  }

  return (
    <Container large>
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
      <Content large>
        <Table>
          <thead>
            <tr>
              <th>Plano</th>
              <th>Aluno</th>
              <th>Ínicio</th>
              <th>Término</th>
              <th>Ativa</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.startDateFormatted}</td>
                <td>{registration.endDateFormatted}</td>
                <td>{registration.active ? 'Ativa' : 'Terminada'}</td>
                <td>
                  <div>
                    <Link to={`/registrations/${registration.id}`}>editar</Link>
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
        <button type="button" disabled={page < 2} onClick={prevPage}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          type="button"
          disabled={registrationsQty < 10}
          onClick={nextPage}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}

List.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default List;
