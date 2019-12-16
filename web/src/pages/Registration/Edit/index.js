import React, { useState, useEffect } from 'react';
import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { formatPrice } from '~/utils';

import history from '~/services/history';

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

const fieldRequired = 'Esse campo é obrigatório';

const schema = Yup.object().shape({
  student: Yup.mixed().required(fieldRequired),
  plan: Yup.mixed().required(fieldRequired),
  start_date: Yup.date()
    .typeError(fieldRequired)
    .required(fieldRequired),
});

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

  async function handleSearch(selectedValue) {
    try {
      const newStudent = loadPromises();
      const newRegistration = await newStudent;

      const currentRegistration = newRegistration.data.filter(
        r => r.student.name === selectedValue.name
      );
      setSearch(currentRegistration[0].id);
    } catch (err) {
      toast.error('Estudante sem matrícula');
    }
  }

  function dataFormat(data) {
    data = {
      ...data,
      student_id: data.student.id,
      plan_id: data.plan.id,
    };
    delete data.student;
    delete data.plan;
    delete data.price;
    delete data.end_date;

    return data;
  }

  async function handleSubmit(data) {
    data = dataFormat(data);

    try {
      await api.put(`registrations/${registrations.id}`, data);

      toast.success('Cadastro alterado');
      history.push('/registration');
    } catch (err) {
      toast.error(
        'Falha na requisição. Verifique seus dados e tente novamente.'
      );
      console.log(err);
    }
  }

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de Matrícula</h1>
        <div>
          <button type="button" onClick={() => history.push('/registration')}>
            Voltar
          </button>
          <button form="Form" type="submit">
            Salvar
          </button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm
          id="Form"
          schema={schema}
          initialData={registrations}
          onSubmit={handleSubmit}
        >
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
              <label>Valor Final</label>
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
