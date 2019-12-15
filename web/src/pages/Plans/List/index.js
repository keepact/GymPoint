import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils';

import api from '~/services/api';

import { Container, Content, TitleWrapper } from '~/components/Container';
import { Table } from './styles';

export default function List() {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('/plans');

    const data = response.data.map(r => ({
      ...r,
      priceFormatted: formatPrice(r.price),
    }));

    setPlans(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <h1>Gereciando Planos</h1>

        <div>
          <button type="button">Cadastrar</button>
        </div>
      </TitleWrapper>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Duração</th>
              <th>Valor p/ MÊS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>
                  {plan.duration} {plan.duration === 1 ? 'mês' : 'meses'}
                </td>
                <td>{plan.priceFormatted}</td>
                <td>
                  <div>
                    <Link to={`/students/${plan.id}`}>editar</Link>
                    <button type="button">apagar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
