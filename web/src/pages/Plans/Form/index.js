import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FiUpload } from 'react-icons/fi';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';
import NumberInput from '~/components/NumberInput';
import renderField from '~/components/FormFields/renderField';

import { listPlanRedirect } from '~/store/modules/plan/list';
import { updateOrCreatePlan } from '~/store/modules/plan/update';
import { validatePlan } from '~/util/validate';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function PlansForm({ handleSubmit, submitting, change }) {
  const { planId } = useSelector(state => state.planList);
  const { loading } = useSelector(state => state.planUpdate);

  const selector = formValueSelector('PLAN_FORM');
  const duration = useSelector(state => selector(state, 'duration'));
  const price = useSelector(state => selector(state, 'price'));

  const dispatch = useDispatch();

  const submit = data => {
    dispatch(updateOrCreatePlan(data, planId || undefined));
  };

  const updateDuration = newDuration => {
    if (price) {
      const total = parseInt(newDuration, 10) * parseInt(price, 10);
      change('total', total);
    }
    return +newDuration;
  };

  const updatePrice = newPrice => {
    const priceFormatted = () => {
      return +newPrice.replace('R$', '');
    };

    const total = priceFormatted() * duration;
    change('total', total);

    return priceFormatted();
  };

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>{planId ? 'Edição de Plano' : 'Cadastro de Plano'}</h1>
            <div>
              <button
                type="button"
                onClick={() => dispatch(listPlanRedirect())}
              >
                Voltar
              </button>
              <button form="Form" disabled={submitting} type="submit">
                <span>Salvar</span>
                <FiUpload size={20} />
              </button>
            </div>
          </TitleWrapper>
          <Content>
            <MyForm id="Form" onSubmit={handleSubmit(data => submit(data))}>
              <Field
                name="title"
                htmlFor="title"
                label="Título do Plano"
                component={renderField}
                type="text"
                placeholder="Título"
              />
              <NumberInputs>
                <div>
                  <Field
                    name="duration"
                    htmlFor="duration"
                    label="Duração (em meses)"
                    component={NumberInput}
                    placeholder="Duração"
                    normalize={updateDuration}
                  />
                </div>
                <div>
                  <Field
                    name="price"
                    htmlFor="price"
                    label="Preço Mensal"
                    decimalScale={2}
                    component={NumberInput}
                    prefix="R$ "
                    normalize={updatePrice}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div>
                  <Field
                    className="gray"
                    name="total"
                    htmlFor="total"
                    label="Preço Total"
                    decimalScale={2}
                    component={NumberInput}
                    prefix="R$ "
                    placeholder="R$ 0,00"
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
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: state.planList.plan,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'PLAN_FORM',
    validate: validatePlan,
  })(PlansForm)
);
