import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageActions from '~/components/Pagination';
import PopUp from '~/components/PopUp';
import Animation from '~/components/Animation';

import loadingAnimation from '~/assets/animations/loader.json';
import clearAnimation from '~/assets/animations/clear.json';

import { createSupportRequest } from '~/store/modules/support/create/support';
import { listSupportRequest } from '~/store/modules/support/list/support';

import { validateHelpOrders } from '~/util/validation';

import {
  Container,
  Content,
  TitleWrapper,
  EmptyContainer,
} from '~/styles/shared';

import { Wrapper, AnimationContainer } from './styles';

function HelpOrders() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);

  const dispatch = useDispatch();

  const { lastPage, page, questions, loading } = useSelector(
    state => state.supportList
  );
  // const loading = useSelector(state => state.supportCreate.loading);

  useEffect(() => {
    dispatch(listSupportRequest(1)); // loadHelpOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openPopup() {
    setShowPopUp(!showPopUp);
  }

  function handleQuestion(question) {
    setSelectedQuestion(question);
    openPopup();
  }

  const questionsSize = useMemo(() => questions.length, [questions]);

  function handleSubmit(data) {
    dispatch(createSupportRequest(data, selectedQuestion.id));

    const currentQuestions = questions.filter(
      helpOrder => helpOrder.id !== selectedQuestion.id
    );

    let newPage = currentQuestions.length ? page : page - 1;
    if (newPage === 0) {
      newPage = 1;
    }
    const newList = {
      currentQuestions,
      lastPage,
    };

    dispatch(listSupportRequest(newPage, newList));
    openPopup();
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
          {questionsSize && questionsSize > 0 ? (
            <>
              <Content small>
                <Wrapper>
                  <header>
                    <strong>Aluno</strong>
                  </header>
                  {questions ? (
                    <>
                      {questions.map((question, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index}>
                          <span>{question.name}</span>
                          <button
                            type="button"
                            onClick={() => handleQuestion(question)}
                          >
                            responder
                          </button>
                        </div>
                      ))}
                    </>
                  ) : null}
                </Wrapper>
              </Content>
              <PageActions
                disableNext={lastPage}
                disableBack={page < 2}
                pageLabel={page}
                refresh={() => dispatch(createSupportRequest())}
                currentPage={page}
              />
              {showPopUp ? (
                <PopUp
                  schema={validateHelpOrders}
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
