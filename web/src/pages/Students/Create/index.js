import React from 'react';

import { Content, TitleWrapper } from '~/components/Container';
import { Container, Form, NumberInputs } from './styles';

export default function Create() {
  return (
    <Container>
      <TitleWrapper>
        <h1>Cadastro de Aluno</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <Form>
          <label htmlFor="">Nome Completo </label>
          <input type="text" placeholder="John Doe" />
          <label htmlFor="">Endereço de Email</label>
          <input type="text" placeholder="example@email.com" />

          <NumberInputs>
            <div>
              <label htmlFor="">Idade</label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">PESO (em kg)</label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">Altura</label>
              <input type="number" />
            </div>
          </NumberInputs>
        </Form>
      </Content>
    </Container>
  );
}
