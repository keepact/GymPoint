import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import PageActions from '~/components/Pagination';
import PopUp from '~/components/PopUp';
import Animation from '~/components/Animation';

import loadingAnimation from '~/assets/animations/loader.json';
import clearAnimation from '~/assets/animations/clear.json';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
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

  async function loadHelpOrders(currentPage = 1) {
    try {
      const response = await api.get('students/help-orders/answers');

      setHelp(response.data.content.rows);
      setCurrentPage(currentPage);
      setLastPage(response.data.lastPage);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
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
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container small>
      {loading ? (
        <Animation animation={loadingAnimation} />
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
              <PageActions
                disableNext={lastPage}
                disableBack={currentPage < 2}
                pageLabel={currentPage}
                refresh={loadHelpOrders}
                currentPage={currentPage}
              />
              {showPopUp ? (
                <PopUp
                  schema={schema}
                  name="answer"
                  title="Pergunta do Aluno"
                  label="Sua Resposta aqui"
                  buttonLabel="Enviar Resposta"
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
                <Animation
                  animation={clearAnimation}
                  loop={false}
                  height="100px"
                  width="100px"
                />
              </AnimationContainer>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

export default HelpOrders;
