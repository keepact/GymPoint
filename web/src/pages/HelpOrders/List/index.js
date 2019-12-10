import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Container, Content, TitleWrapper } from '~/components/Container';
import PopUp from '~/components/PopUp';

import { Wrapper } from './styles';

export default function List() {
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [loading, setLoading] = useState(true);
  const [help, setHelp] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get('students/help-orders/answers');

    setHelp(response.data);
    setLoading(false);
  }

  function OpenPopup() {
    setShowPopUp(!showPopUp);
  }

  function handleQuestion(question) {
    setSelectedQuestion(question);
    OpenPopup();
  }

  // async function respondStudent(id) {
  //   const response = await api.post(`/students/help-orders/${id}/answer`);

  //   setAnswer(response.data);
  // }

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
          {help.map(question => (
            <div key={question.id}>
              <span>{question.student.name}</span>
              <button type="button" onClick={() => handleQuestion(question)}>
                responder
              </button>
            </div>
          ))}
          {showPopUp ? (
            <PopUp
              title="Pergunta do Aluno"
              label="Sua Resposta aqui"
              closePopup={OpenPopup}
              setAnswer
              question={selectedQuestion.question}
            />
          ) : null}
        </Wrapper>
      </Content>
    </Container>
  );
}
