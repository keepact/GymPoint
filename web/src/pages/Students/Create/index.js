import React from 'react';

import {
  Content,
  ContainerForm,
  Form,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

export default function Create() {
  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Cadastro de Aluno</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <Form>
          <label htmlFor="">Nome Completo</label>
          <input type="text" placeholder="John Doe" />
          <label htmlFor="">Endereço de Email</label>
          <input type="text" placeholder="example@email.com" />

          <NumberInputs>
            <div>
              <label htmlFor="">Idade</label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">
                Peso <span>(em kg)</span>
              </label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">Altura</label>
              <input type="number" />
            </div>
          </NumberInputs>
        </Form>
      </Content>
    </ContainerForm>
  );
}
