import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { FiUpload } from 'react-icons/fi';

import NumberInput from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import { createPlanRequest } from '~/store/modules/plan/create/plan';
import {
  listPlanRequestId,
  listPlanUpdatePrice,
  listPlanClearValue,
  listPlanUpdateDuration,
} from '~/store/modules/plan/list/plan';
import { updatePlanRequest } from '~/store/modules/plan/update/plan';

import { validatePlans } from '~/util/validation';

import history from '~/services/history';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function PlansForm({ match }) {
  const { id } = match.params;
  const { plan: currentPlan } = useSelector(state => state.planList);

  const dispatch = useDispatch();
  const loading = useSelector(state =>
    id ? state.planUpdate.loading : state.planCreate.loading
  );

  const plan = useMemo(() => currentPlan, [currentPlan]);

  useEffect(() => {
    if (id) {
      dispatch(listPlanRequestId(id));
    } else if (plan !== undefined && !id) {
      dispatch(listPlanClearValue());
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
    dispatch(listPlanUpdatePrice(price));
  }

  function handleDuration(duration) {
    dispatch(listPlanUpdateDuration(duration));
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
              initialData={plan && plan.id === id && plan}
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
