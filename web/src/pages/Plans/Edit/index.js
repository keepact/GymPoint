import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import NumberInput from '~/components/NumberInput';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

function Edit({ match }) {
  const [plans, setPlans] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const response = await api.get(`/plans/${match.params.id}`);
    console.log(response.data);

    setPlans({
      ...response.data,
      finalPrice: response.data.price * response.data.duration,
    });
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(data) {
    console.log(data.title, plans.id);
    try {
      await api.put(`/plans/${plans.id}`, {
        title: data.title,
        duration: data.duration,
        price: data.price,
      });
      toast.success('Plano editado com sucesso');
    } catch (err) {
      toast.error('Falha na requisição, tente novamente');
      console.log(err);
    }
  }

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de Plano</h1>
        <div>
          <Link to="/plans">Voltar</Link>
          <button form="Form" type="submit">
            Salvar
          </button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm id="Form" initialData={plans} onSubmit={handleSubmit}>
          <label htmlFor="title">Título do Plano</label>
          <Input name="title" />
          <NumberInputs>
            <div>
              <label htmlFor="duration">
                Duração <span>(em meses)</span>
              </label>
              <NumberInput name="duration" />
            </div>
            <div>
              <label htmlFor="price">Preço Mensal</label>
              <NumberInput name="price" decimalScale={2} prefix="R$ " />
            </div>
            <div>
              <label htmlFor="finalPrice">Preço Total</label>
              <NumberInput
                name="finalPrice"
                className="gray"
                decimalScale={2}
                prefix="R$ "
                disabled
              />
            </div>
          </NumberInputs>
        </MyForm>
      </Content>
    </ContainerForm>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Edit;
