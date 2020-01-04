import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@rocketseat/unform';
import { FiUpload } from 'react-icons/fi';

import NumberInput from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  listPlanUpdatePrice,
  listPlanUpdateDuration,
} from '~/store/modules/plan/list';
import { updateOrCreatePlan } from '~/store/modules/plan/update';

import { validatePlans } from '~/util/validation';

import history from '~/services/history';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function PlansForm() {
  const { plan: currentPlan, planId } = useSelector(state => state.planList);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.planUpdate.loading);

  const plan = useMemo(() => currentPlan, [currentPlan]);

  function handleSubmit(data) {
    dispatch(updateOrCreatePlan(data, planId || undefined));
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
            <h1>{planId ? 'Edição de Plano' : 'Cadastro de Plano'}</h1>
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

export default PlansForm;
