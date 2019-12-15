import React, { useState, useEffect } from 'react';
import { parseISO, addMonths } from 'date-fns';
import PropTypes from 'prop-types';

import { StudentSelector } from '~/components/AsyncSelect/styles';
import { PlanSelector } from '~/components/Select/styles';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

function Edit({ match }) {
  const [registrations, setRegistrations] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  function loadPromises(type) {
    if (type === 'students') return api.get('students');
    if (type === 'plans') return api.get('plans');

    return api.get(`registrations/${match.params.id}`);
  }

  async function loadData() {
    const loadRegistrationPromise = loadPromises();
    const loadPlanPromise = loadPromises('plans');

    const plan = await loadPlanPromise;
    const registration = await loadRegistrationPromise;

    setPlans(plan.data);
    setRegistrations({
      ...registration.data,
      start_date: parseISO(registration.data.start_date),
      end_date: parseISO(registration.data.end_date),
    });
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterColors = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadStudentOptions = async inputValue => {
    async function getStudents() {
      const { data } = await loadPromises('students');
      return data;
    }
    const data = await getStudents();

    return new Promise(resolve => {
      resolve(filterColors(data, inputValue));
    });
  };

  // function handleDate(newDate) {
  //   setRegistrations({
  //     ...registrations,
  //     start_date: newDate,
  //     end_date: addMonths(newDate, registrations.plan.duration),
  //   });
  // }

  function handlePlan(newPlan) {
    setRegistrations({
      ...registrations,
      plan: newPlan,
      end_date: registrations.start_date
        ? addMonths(registrations.start_date, newPlan.duration)
        : '',
      price: newPlan.price * newPlan.duration,
    });
  }

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de Matrícula</h1>
        <div>
          <button type="button">Voltar</button>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm initialData={registrations}>
          <label htmlFor="">Aluno</label>
          <StudentSelector name="student" loadOptions={loadStudentOptions} />
          <NumberInputs columns>
            <div>
              <label htmlFor="">Plano</label>
              <PlanSelector name="plan" options={plans} onChange={handlePlan} />
            </div>
            <div>
              <label htmlFor="">Data de ínicio</label>
              <input type="date" />
            </div>
            <div>
              <label htmlFor="">Data de término</label>
              <input className="gray" type="text" readOnly />
            </div>
            <div>
              <label htmlFor="">Valor Final</label>
              <input className="gray" type="text" readOnly />
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
