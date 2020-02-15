import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FiUpload } from 'react-icons/fi';

import Animation from '~/components/Animation';
import renderField from '~/components/FormFields/renderField';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  listPlanUpdatePrice,
  listPlanUpdateDuration,
  listPlanRedirect,
} from '~/store/modules/plan/list';
import { updateOrCreatePlan } from '~/store/modules/plan/update';
import { validatePlan } from '~/util/validate';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function PlansForm({ handleSubmit, submitting }) {
  const { planId } = useSelector(state => state.planList);
  const { loading } = useSelector(state => state.planUpdate);

  const dispatch = useDispatch();

  const submit = data => {
    dispatch(updateOrCreatePlan(data, planId || undefined));
  };

  const handlePrice = price => {
    dispatch(listPlanUpdatePrice(price));
  };

  const handleDuration = duration => {
    dispatch(listPlanUpdateDuration(duration));
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
                disabled={submitting}
                onClick={() => dispatch(listPlanRedirect())}
              >
                Voltar
              </button>
              <button form="Form" type="submit">
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
                placeholder="title"
              />
              <NumberInputs>
                <div>
                  <Field
                    name="duration"
                    htmlFor="duration"
                    label="Duração (em meses)"
                    component={renderField}
                    type="number"
                    placeholder="duration"
                    onChange={e => handleDuration(e.target.value)}
                  />
                </div>
                <div>
                  <Field
                    name="price"
                    htmlFor="price"
                    label="Preço Mensal"
                    component={renderField}
                    type="number"
                    placeholder="R$ 0,00"
                    onChange={e => handlePrice(e.target.value)}
                  />
                </div>
                <div>
                  <Field
                    name="finalPrice"
                    htmlFor="finalPrice"
                    label="Preço Total"
                    component={renderField}
                    type="number"
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
};

const mapStateToProps = state => {
  return {
    initialValues: state.planList.plan,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'PLAN_FORM_EDIT',
    enableReinitialize: true,
    validate: validatePlan,
  })(PlansForm)
);
