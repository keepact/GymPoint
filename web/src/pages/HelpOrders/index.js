import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import PopUp from '~/components/PopUp';
import Animation from '~/components/Animation';

import loadingAnimation from '~/assets/animations/loader.json';
import clearAnimation from '~/assets/animations/clear.json';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  PageActions,
  EmptyContainer,
} from '~/styles/shared';

import { Wrapper, AnimationContainer } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Digite uma resposta.'),
});

function HelpOrders() {
  const [help, setHelp] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);

  // eslint-disable-next-line no-shadow
  async function loadHelpOrders(currentPage = 1) {
    try {
      const response = await api.get('students/help-orders/answers');

      setHelp(response.data.content.rows);
      setCurrentPage(currentPage);
      setLastPage(response.data.lastPage);
      setLoading(false);
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
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

  const helpQty = useMemo(() => help.length, [help]);

  function handlePage(action) {
    const pageNumber = action === 'back' ? currentPage - 1 : currentPage + 1;
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
      toast.error(
        'Falha na requisição, por favor tente novamente em alguns minutos'
      );
    }
  }

  return (
    <Container small>
      {loading ? (
        <Animation animation={loadingAnimation} loop size />
      ) : (
        <>
          <TitleWrapper>
            <h1>Pedidos de Auxílio</h1>
          </TitleWrapper>
          {helpQty > 0 ? (
            <>
              <Content small>
                <Wrapper>
                  <header>
                    <strong>Aluno</strong>
                  </header>
                  {help.map(question => (
                    <div key={question.id}>
                      <span>{question.student.name}</span>
                      <button
                        type="button"
                        onClick={() => handleQuestion(question)}
                      >
                        responder
                      </button>
                    </div>
                  ))}
                </Wrapper>
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
            </>
          ) : (
            <EmptyContainer>
              <h2>Parabéns! Os pedidos de auxílio estão em dia!</h2>
              <AnimationContainer>
                <Animation animation={clearAnimation} loop={false} size={100} />
              </AnimationContainer>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

export default HelpOrders;
