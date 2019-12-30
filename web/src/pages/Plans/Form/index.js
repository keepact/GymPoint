import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

import NumberInput from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import { validatePlans } from '~/utils';

import history from '~/services/history';
import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function PlansForm({ match }) {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = match.params;

  async function loadData() {
    try {
      const response = await api.get('/plans', {
        params: { id },
      });

      setPlan({
        ...response.data,
        finalPrice: response.data.price * response.data.duration,
      });
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    if (id) {
      loadData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(data) {
    try {
      if (id) {
        await api.put(`/plans/${plan.id}`, data);
      } else {
        await api.post('/plans', data);
      }
      toast.success(
        id ? 'Plano editado com sucesso' : 'Plano cadastrado com sucesso'
      );
      history.push('/plans');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  function handlePrice(price) {
    setPlan({
      ...plan,
      price,
      finalPrice: plan.duration * price,
    });
  }

  function handleDuration(duration) {
    setPlan({
      ...plan,
      duration,
      finalPrice: plan.price * duration,
    });
  }

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>{id ? 'Edição de Plano' : 'Cadastro de Plano'}</h1>
            <div>
              <button type="button" onClick={() => history.push('/plans')}>
                Voltar
              </button>
              <button form="Form" type="submit">
                <span>Salvar</span>
                <FiUpload size={20} />
              </button>
            </div>
          </TitleWrapper>
          <Content>
            <MyForm
              id="Form"
              schema={validatePlans}
              initialData={plan}
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">Título do Plano</label>
              <Input name="title" />
              <NumberInputs>
                <div>
                  <label htmlFor="duration">
                    Duração <span className="label">(em meses)</span>
                  </label>
                  <Input
                    type="number"
                    name="duration"
                    onChange={e => handleDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price">Preço Mensal</label>
                  <NumberInput
                    name="price"
                    onChange={handlePrice}
                    decimalScale={2}
                    prefix="R$ "
                  />
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
        </>
      )}
    </ContainerForm>
  );
}

PlansForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PlansForm;
