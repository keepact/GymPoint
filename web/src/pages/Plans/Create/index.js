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
        <h1>Cadastro de Planos</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <Form>
          <label htmlFor="">Título do Plano</label>
          <input type="text" placeholder="John Doe" />
          <NumberInputs>
            <div>
              <label htmlFor="">
                Duração <span>(em meses)</span>
              </label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">Preço Mensal</label>
              <input type="number" />
            </div>
            <div>
              <label htmlFor="">Preço Total</label>
              <input className="gray" type="text" readOnly />
            </div>
          </NumberInputs>
        </Form>
      </Content>
    </ContainerForm>
  );
}
