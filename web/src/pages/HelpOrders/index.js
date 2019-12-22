import React, { useState, useEffect, useMemo } from 'react';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  PageActions,
} from '~/components/Container';
import PopUp from '~/components/PopUp';

import { Wrapper } from './styles';

export default function List() {
  const [selectedQuestion, setSelectedQuestion] = useState();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [help, setHelp] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  async function loadHelpOrders() {
    const response = await api.get('students/help-orders/answers');

    setHelp(response.data);
    setPage(page);
    setLoading(false);
  }

  function openPopup() {
    setShowPopUp(!showPopUp);
  }

  function handleQuestion(question) {
    setSelectedQuestion(question);
    openPopup();
  }

  const currentHelpOrders = useMemo(
    () => help.filter(r => r.student !== null),
    [help]
  );

  const helpQty = useMemo(() => currentHelpOrders.length, [currentHelpOrders]);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadHelpOrders(pageNumber);
  }

  function nextPage() {
    if (helpQty < 10) return;
    const pageNumber = page + 1;
    loadHelpOrders(pageNumber);
  }

  useEffect(() => {
    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {currentHelpOrders.map(question => (
            <div key={question.id}>
              <span>{question.student.name}</span>
              <button type="button" onClick={() => handleQuestion(question)}>
                responder
              </button>
            </div>
          ))}
        </Wrapper>
      </Content>
      <PageActions>
        <button type="button" disabled={page < 2} onClick={prevPage}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button type="button" disabled={helpQty < 10} onClick={nextPage}>
          Próximo
        </button>
      </PageActions>
      {showPopUp ? (
        <PopUp
          title="Pergunta do Aluno"
          label="Sua Resposta aqui"
          modal={openPopup}
          student={selectedQuestion.student_id}
          question={selectedQuestion.question}
        />
      ) : null}
    </Container>
  );
}
