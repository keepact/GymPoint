import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { addMonths } from 'date-fns';
import { FiUpload } from 'react-icons/fi';

import { validateRegistration } from '~/util/validate';

import loadingAnimation from '~/assets/animations/loader.json';

import Animation from '~/components/Animation';
import StudentSelector from '~/components/AsyncSelect';
import PlanSelector from '~/components/Select';
import NumberInput from '~/components/NumberInput';
import DatePicker from '~/components/DatePicker';

import { listRegistrationRedirect } from '~/store/modules/registration/list';
import { updateOrCreateRegistration } from '~/store/modules/registration/update';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function RegistrationForm({ change, handleSubmit, submitting }) {
  const { registrationId } = useSelector(state => state.registrationList);

  const selector = formValueSelector('REGISTRATION_FORM_EDIT');
  const plan = useSelector(state => selector(state, 'plan'));
  const startDate = useSelector(state => selector(state, 'start_date'));

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.registrationUpdate);
  const { plans } = useSelector(state => state.planList);
  const { students } = useSelector(state => state.studentList);

  const filterStudent = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = async inputValue => {
    return new Promise(resolve => {
      resolve(filterStudent(students, inputValue));
    });
  };

  const updateDate = value => {
    const endDate = addMonths(value, plan.duration);

    change('end_date', endDate);
    return value;
  };

  const updatePlan = value => {
    if (startDate) {
      const endDate = addMonths(startDate, value.duration);
      change('end_date', endDate);
    }

    change('price', value.price);
    return value;
  };

  const submit = data => {
    dispatch(updateOrCreateRegistration(data, registrationId || undefined));
  };

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>
              {registrationId ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}
            </h1>
            <div>
              <button
                type="button"
                onClick={() => dispatch(listRegistrationRedirect())}
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
                name="student"
                type="text"
                htmlFor="student"
                label="Aluno"
                placeholder="Digite para buscar um estudante..."
                loadOptions={loadStudentOptions}
                component={StudentSelector}
              />

              <NumberInputs columns>
                <div>
                  <Field
                    name="plan"
                    htmlFor="plan"
                    label="Plano"
                    placeholder="Selecione"
                    options={plans}
                    component={PlanSelector}
                    onChange={updatePlan}
                  />
                </div>
                <div>
                  <Field
                    name="start_date"
                    htmlFor="start_date"
                    label="Data de ínicio"
                    placeholderText="dd/mm/yyyy"
                    component={DatePicker}
                    onChange={updateDate}
                  />
                </div>
                <div>
                  <Field
                    name="end_date"
                    htmlFor="end_date"
                    label="Data de término"
                    placeholderText="dd/mm/yyyy"
                    component={DatePicker}
                    disabled
                  />
                </div>
                <div>
                  <Field
                    name="price"
                    className="gray"
                    htmlFor="price"
                    label="Valor Final"
                    placeholder="R$ 0,00"
                    decimalScale={2}
                    prefix="R$ "
                    component={NumberInput}
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

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: state.registrationList.registration,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'REGISTRATION_FORM_EDIT',
    validate: validateRegistration,
  })(RegistrationForm)
);
