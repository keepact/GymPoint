import React from 'react';

import { Container, Content, Wrapper } from './styles';

function PopUp({ title, closePopup, setAnswer, label, question, answer }) {
  return (
    <Container>
      <Content>
        <Wrapper>
          <span>{title}</span>
          <p>{question}</p>
          <label htmlFor="help">{label}</label>
          <textarea
            rows="5"
            cols="33"
            name="help"
            placeholder="Sua resposta aqui"
          />
          <button type="button" onClick={setAnswer}>
            <span>Responder Aluno</span>
          </button>
          <button cancel type="button" onClick={closePopup}>
            <span>Cancelar</span>
          </button>
        </Wrapper>
      </Content>
    </Container>
  );
}

export default PopUp;
