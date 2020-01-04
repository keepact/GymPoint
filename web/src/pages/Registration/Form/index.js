import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { addMonths } from 'date-fns';
import { FiUpload } from 'react-icons/fi';

import { validateRegistrations } from '~/util/validation';

import history from '~/services/history';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import StudentSelector from '~/components/AsyncSelect';
import PlanSelector from '~/components/Select';
import NumberInput from '~/components/NumberInput';
import DatePicker from '~/components/DatePicker';

import * as registratioListActions from '~/store/modules/registration/list';
import { listPlanRequest } from '~/store/modules/plan/list/index';
import { listStudentRequest } from '~/store/modules/student/list';
import { updateOrCreateRegistration } from '~/store/modules/registration/update';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function RegistrationForm() {
  const { registration, registrationId } = useSelector(
    state => state.registrationList
  );
  const [disableDate, setDisableDate] = useState(!registrationId);

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.registrationUpdate.loading);

  const plans = useSelector(state => state.planList.plans);
  const students = useSelector(state => state.studentList.students);

  useEffect(() => {
    dispatch(listPlanRequest(1, 'registration'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterStudent = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = async inputValue => {
    dispatch(listStudentRequest(1));
    return new Promise(resolve => {
      resolve(filterStudent(students, inputValue));
    });
  };

  function handleDate(newDate) {
    const currentPlan = plans.filter(p => p.id === registration.plan.id);
    const newEndDate = addMonths(
      newDate,
      registration.plan.id !== undefined
        ? currentPlan[0].duration
        : registration.plan.duration
    );

    const newDates = {
      newStartDate: newDate,
      newEndDate,
    };

    dispatch(registratioListActions.listRegistrationUpdateDate(newDates));
  }

  function handlePlan(newPlan) {
    const newEndDate = registration.start_date
      ? addMonths(registration.start_date, newPlan.duration)
      : undefined;
    const newPrice = newPlan.price * newPlan.duration;

    const newRegistrationPlan = {
      plan: {
        id: newPlan.id,
        duration: newPlan.duration,
        title: newPlan.title,
      },
    };

    const newPriceAndDate = {
      end_date: newEndDate,
      price: newPrice,
    };

    dispatch(
      registratioListActions.listRegistrationUpdatePlan(
        newRegistrationPlan,
        newPriceAndDate
      )
    );

    if (!registrationId) {
      setDisableDate(false);
    }
  }

  function handleSubmit(data) {
    dispatch(updateOrCreateRegistration(data, registrationId || undefined));
  }

  return (
    <ContainerForm>
      {console.log(registration, 'teste REGISTRATION RETURN')}
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
                onClick={() => history.push('/registrations')}
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
            <MyForm
              id="Form"
              schema={validateRegistrations}
              initialData={registration}
              onSubmit={handleSubmit}
            >
              <label htmlFor="student">Aluno</label>
              <StudentSelector
                name="student"
                loadOptions={loadStudentOptions}
              />
              <NumberInputs columns>
                <div>
                  <label htmlFor="plan">Plano</label>
                  <PlanSelector
                    name="plan"
                    options={plans}
                    onChange={handlePlan}
                  />
                </div>
                <div>
                  <label htmlFor="start_date">Data de ínicio</label>
                  <DatePicker
                    name="start_date"
                    onChange={handleDate}
                    disabled={disableDate || registration.plan === null}
                  />
                </div>
                <div>
                  <label htmlFor="end_date">Data de término</label>
                  <DatePicker className="gray" name="end_date" disabled />
                </div>
                <div>
                  <label htmlFor="price">Valor Final</label>
                  <NumberInput
                    name="price"
                    className="gray"
                    decimalScale={2}
                    prefix="R$ "
                    disabled
                    value={registration.price}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RegistrationForm;
