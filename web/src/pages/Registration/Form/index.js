import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import { formatPrice } from '~/utils';

import history from '~/services/history';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

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
} from '~/styles/shared';

const fieldRequired = 'Esse campo é obrigatório';

const schema = Yup.object().shape({
  student: Yup.mixed().required(fieldRequired),
  plan: Yup.mixed().required(fieldRequired),
  start_date: Yup.date()
    .typeError(fieldRequired)
    .required(fieldRequired),
});

function RegistrationForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState({});
  const [plans, setPlans] = useState([]);
  const [disableDate, setDisableDate] = useState(!id);
  const [filter, setFilter] = useState('');

  function loadPromises(type) {
    if (type === 'students')
      return api.get('students', {
        params: {
          q: filter,
        },
      });

    if (type === 'plans') return api.get('plans');

    return api.get(`registrations/${id}`);
  }

  async function loadData() {
    try {
      if (id) {
        const loadRegistrationPromise = loadPromises();
        const loadPlanPromise = loadPromises('plans');

        const plan = await loadPlanPromise;
        const registration = await loadRegistrationPromise;

        setPlans(plan.data);
        setRegistrations({
          ...registration.data,
          priceFormatted: formatPrice(registration.data.price),
          start_date: parseISO(registration.data.start_date),
          end_date: parseISO(registration.data.end_date),
        });
        setLoading(false);
      } else {
        const { data } = await loadPromises('plans');
        setPlans(data);
        setLoading(false);
      }
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
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
    // eslint-disable-next-line consistent-return
    async function getStudents() {
      try {
        const { data } = await loadPromises('students');
        return data;
      } catch (err) {
        toast.error(
          'Houve um erro na busca de aluno, verifique seus dados ou tente novamente'
        );
      }
    }
    const data = await getStudents();

    return new Promise(resolve => {
      setFilter(inputValue);
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
    if (!id) {
      setDisableDate(false);
    }
  }

  function handleDate(newDate) {
    const currentPlan = plans.filter(p => p.id === registrations.plan_id);

    setRegistrations({
      ...registrations,
      initialPlan: currentPlan[0],
      start_date: newDate,
      end_date: id
        ? addMonths(
            newDate,
            registrations.plan.title === currentPlan[0].title
              ? currentPlan[0].duration
              : registrations.plan.duration
          )
        : addMonths(newDate, registrations.plan.duration),
    });
  }

  async function handleSubmit(data) {
    const formatedData = {
      student_id: data.student.id,
      plan_id: data.plan.id,
      start_date: data.start_date,
    };

    try {
      if (id) {
        await api.put(`registrations/${registrations.id}`, formatedData);
      } else {
        await api.post('registrations', formatedData);
      }
      toast.success(
        id ? 'Matrícula alterada com sucesso' : 'Matrícula cadastrada'
      );
      history.push('/registrations');
    } catch (err) {
      toast.error('Houve um erro, verifique seus dados e tente novamente');
    }
  }

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} loop size />
      ) : (
        <>
          <TitleWrapper>
            <h1>{id ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}</h1>
            <div>
              <Link to="/registrations">Voltar</Link>
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
                    placeholder="dd/mm/yyyy"
                    disabled={disableDate}
                  />
                </div>
                <div>
                  <label htmlFor="end_date">Data de término</label>
                  <DatePicker
                    className="gray"
                    name="end_date"
                    placeholder="dd/mm/yyyy"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="price">Valor Final</label>
                  <input
                    name="price"
                    className="gray"
                    type="text"
                    placeholder="R$ 0,00"
                    readOnly
                    value={registrations.priceFormatted}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RegistrationForm;