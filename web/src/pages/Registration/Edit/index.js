import React from 'react';

import {
  Content,
  ContainerForm,
  Form,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

export default function Edit() {
  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de Matrícula</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <Form>
          <label htmlFor="">Aluno</label>
          <input type="text" placeholder="John Doe" />
          <NumberInputs columns>
            <div>
              <label htmlFor="">Plano</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Data de ínicio</label>
              <input type="date" />
            </div>
            <div>
              <label htmlFor="">Data de término</label>
              <input className="gray" type="text" readOnly />
            </div>
            <div>
              <label htmlFor="">Valor Final</label>
              <input className="gray" type="text" readOnly />
            </div>
          </NumberInputs>
        </Form>
      </Content>
    </ContainerForm>
  );
}
