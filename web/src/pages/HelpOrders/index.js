import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageActions from '~/components/Pagination';
import PopUp from './PopUp';
import Animation from '~/components/Animation';

import loadingAnimation from '~/assets/animations/loader.json';
import clearAnimation from '~/assets/animations/clear.json';

import { createSupportRequest } from '~/store/modules/support/create';
import { listSupportRequest } from '~/store/modules/support/list';

import {
  Container,
  Content,
  TitleWrapper,
  EmptyContainer,
} from '~/styles/shared';

import { Wrapper, AnimationContainer } from './styles';

function HelpOrders() {
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { lastPage, page, questions, loading } = useSelector(
    state => state.supportList
  );

  const questionsQty = useMemo(() => questions.length, [questions]);

  useEffect(() => {
    dispatch(listSupportRequest(1));
  }, [dispatch]);

  const popUpAction = () => {
    setOpen(!open);
  };

  const handleQuestion = question => {
    setSelectedQuestion(question);
    popUpAction();
  };

  const handleSubmit = data => {
    dispatch(createSupportRequest(data, selectedQuestion.questionId));
    popUpAction();
  };

  const handlePage = page => {
    dispatch(listSupportRequest(page));
  };

  return (
    <Container small>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>Pedidos de Auxílio</h1>
          </TitleWrapper>
          {questionsQty > 0 ? (
            <>
              <Content small>
                <Wrapper>
                  <header>
                    <strong>Aluno</strong>
                  </header>
                  {questions.map(question => (
                    <div key={question.questionId}>
                      <span>{question.name}</span>
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
                disableBack={page < 2}
                pageLabel={page}
                refresh={handlePage}
                currentPage={page}
              />
              {open ? (
                <PopUp
                  name="answer"
                  title="Pergunta do Aluno"
                  label="Sua Resposta aqui"
                  buttonLabel="Enviar Resposta"
                  modal={popUpAction}
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
