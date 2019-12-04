import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  Table,
} from '~/components/Container';

import { Wrapper } from './styles';

export default function List() {
  const [loading, setLoading] = useState(true);
  const [help, setHelp] = useState([]);

  async function loadHelpOrders() {
    const response = await api.get('students/help-orders/answers');

    setHelp(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  return (
    <Container small>
      <TitleWrapper>
        <h1>Pedidos de Auxílio</h1>
      </TitleWrapper>
      <Content small>
        <Wrapper>
          <header>
            <strong>Aluno</strong>
          </header>
          {help.map(h => (
            <div key={h.id}>
              <span>{h.student.name}</span>
              <Link to="/">responder</Link>
            </div>
          ))}
        </Wrapper>
      </Content>
    </Container>
  );
}
