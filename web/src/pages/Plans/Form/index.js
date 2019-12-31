import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

import NumberInput from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import { createPlanRequest } from '~/store/modules/plan/create/plan';
import { updatePlanRequest } from '~/store/modules/plan/update/plan';

import { validatePlans, requestFailMessage } from '~/util/validation';

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

  const { id } = match.params;

  const dispatch = useDispatch();
  const loading = useSelector(state =>
    id ? state.planUpdate.loading : state.planCreate.loading
  );

  async function loadData() {
    try {
      const response = await api.get('/plans', {
        params: { id },
      });

      setPlan({
        ...response.data,
        finalPrice: response.data.price * response.data.duration,
      });
    } catch (err) {
      toast.error(requestFailMessage);
    }
  }

  useEffect(() => {
    if (id) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(data) {
    if (id) {
      dispatch(updatePlanRequest(data, id));
    } else {
      dispatch(createPlanRequest(data));
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
