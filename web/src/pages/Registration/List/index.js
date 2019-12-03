import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
} from '~/components/Container';

import { PageActions } from './styles';

export default function List() {
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

    const data = response.data.map(r => ({
      ...r,
      startDateFormatted: format(parseISO(r.start_date), "dd'/'M/Y"),
      endDateFormatted: format(parseISO(r.end_date), "dd'/'M/Y"),
    }));

    setRegistrations(data);
    setPage(page);
    setLoading(false);
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  const registrationsSize = useMemo(() => registrations.length, [
    registrations.length,
  ]);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadRegistrations(pageNumber);
  }

  function nextPage() {
    if (registrationsSize < 10) return;
    const pageNumber = page + 1;
    loadRegistrations(pageNumber);
  }

  return (
    <Container large>
      <TitleWrapper>
        <h1>Gereciando Matrículas</h1>

        <div>
          <button type="button">Cadastrar</button>
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
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.startDateFormatted}</td>
                <td>{registration.endDateFormatted}</td>
                <td>{registration.active ? 'Ativa' : 'Terminada'}</td>
                <td>
                  <div>
                    <Link to={`/students/${registrations.id}`}>editar</Link>
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
        <button
          type="button"
          disabled={registrationsSize < 10}
          onClick={nextPage}
        >
          Próximo
        </button>
      </PageActions>
    </Container>
  );
}
