import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  PageActions,
} from '~/components/Container';
import PopUp from '~/components/PopUp';

import { Wrapper } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Digite uma resposta.'),
});

function HelpOrders() {
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

  useEffect(() => {
    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function handleSubmit(data) {
    try {
      await api.post(
        `/students/help-orders/${selectedQuestion.student_id}/answer`,
        data
      );
      toast.success('Resposta enviada com sucesso');

      openPopup();
      loadHelpOrders();
    } catch (err) {
      console.log(err);
      toast.error(
        'Falha na requisição, por favor tente novamente em alguns minutos'
      );
    }
  }

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
          schema={schema}
          name="answer"
          title="Pergunta do Aluno"
          label="Sua Resposta aqui"
          buttonLabel="Resposta do Aluno"
          modal={openPopup}
          question={selectedQuestion.question}
          onSubmit={handleSubmit}
        />
      ) : null}
    </Container>
  );
}

export default HelpOrders;
