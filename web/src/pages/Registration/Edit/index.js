import React, { useState, useEffect } from 'react';
import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { formatPrice } from '~/utils';

import { StudentSelector } from '~/components/AsyncSelect/styles';
import { PlanSelector } from '~/components/Select/styles';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

function Edit({ match }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState({});
  const [search, setSearch] = useState('');
  const [plans, setPlans] = useState([]);

  function loadPromises(type) {
    if (type === 'students') return api.get('students');
    if (type === 'plans') return api.get('plans');
    if (type === 'search') return api.get(`registrations/${search}`);
    if (type === 'registrations')
      return api.get(`registrations/${match.params.id}`);

    return api.get(`registrations`);
  }

  async function loadData() {
    const loadRegistrationPromise = loadPromises('registrations');
    const loadPlanPromise = loadPromises('plans');
    const loadSearchPromise = loadPromises('search');

    const plan = await loadPlanPromise;
    const registration =
      search === '' ? await loadRegistrationPromise : await loadSearchPromise;

    setPlans(plan.data);
    setRegistrations({
      ...registration.data,
      priceFormatted: formatPrice(registration.data.price),
      start_date: parseISO(registration.data.start_date),
      end_date: parseISO(registration.data.end_date),
    });
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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

  function handlePlan(newPlan) {
    setRegistrations({
      ...registrations,
      plan: newPlan,
      end_date: registrations.start_date
        ? addMonths(registrations.start_date, newPlan.duration)
        : null,
      priceFormatted: formatPrice(newPlan.price * newPlan.duration),
    });
  }

  function handleDate(newDate) {
    const currentPlan = plans.filter(p => p.id === registrations.plan_id);

    setRegistrations({
      ...registrations,
      initialPlan: currentPlan[0],
      start_date: newDate,
      end_date: newDate
        ? addMonths(
            newDate,
            registrations.plan.title === currentPlan[0].title
              ? currentPlan[0].duration
              : registrations.plan.duration
          )
        : null,
    });
  }

  // eslint-disable-next-line consistent-return
  async function handleSearch(selectedValue) {
    try {
      const newStudent = loadPromises();
      const newRegistration = await newStudent;

      const planMap = newRegistration.data.filter(
        r => r.student.name === selectedValue.name
      );
      setSearch(planMap[0].id);
    } catch (err) {
      toast.error('Estudante sem matrícula');
    }
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
          <StudentSelector
            name="student"
            loadOptions={loadStudentOptions}
            onChange={handleSearch}
          />
          <NumberInputs columns>
            <div>
              <label htmlFor="">Plano</label>
              <PlanSelector name="plan" options={plans} onChange={handlePlan} />
            </div>
            <div>
              <label>Data de ínicio</label>
              <DatePicker name="start_date" onChange={handleDate} />
            </div>
            <div>
              <label>Data de término</label>
              <DatePicker className="gray" name="end_date" disabled />
            </div>
            <div>
              <label htmlFor="">Valor Final</label>
              <input
                className="gray"
                type="text"
                readOnly
                value={registrations.priceFormatted}
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
