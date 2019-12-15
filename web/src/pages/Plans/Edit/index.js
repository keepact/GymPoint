import React from 'react';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

export default function Edit() {
  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de Plano</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm>
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
        </MyForm>
      </Content>
    </ContainerForm>
  );
}
