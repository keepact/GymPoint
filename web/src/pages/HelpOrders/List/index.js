import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Container, Content, TitleWrapper } from '~/components/Container';
import Popup from '~/components/PopUp';

import { Wrapper } from './styles';

export default function List() {
  const [loading, setLoading] = useState(true);
  const [help, setHelp] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get('students/help-orders/answers');

    setHelp(response.data);
    setLoading(false);
  }

  function togglePopup() {
    setShowPopUp(!showPopUp);
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
              <button type="button" onClick={togglePopup}>
                teste
              </button>
            </div>
          ))}
        </Wrapper>
      </Content>
      {showPopUp ? (
        <Popup
          text='Click "Close Button" to hide popup'
          closePopup={togglePopup}
        />
      ) : null}
    </Container>
  );
}
