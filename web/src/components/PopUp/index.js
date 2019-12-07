import React from 'react';

import { Container, Content } from './styles';

function PopUp({ text, closePopup }) {
  return (
    <Container>
      <Content>
        <h1>{text}</h1>
        <button type="button" onClick={closePopup}>
          close me
        </button>
      </Content>
    </Container>
  );
}

export default PopUp;
