import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

import { validateRegistrations, requestFailMessage } from '~/util/validation';

import history from '~/services/history';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import StudentSelector from '~/components/AsyncSelect';
import PlanSelector from '~/components/Select';
import NumberInput from '~/components/NumberInput';
import DatePicker from '~/components/DatePicker';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function RegistrationForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState({});
  const [plans, setPlans] = useState([]);
  const [disableDate, setDisableDate] = useState(!id);

  async function loadData() {
    try {
      if (id) {
        const { data } = await loadPromises();
        const { data: dataPlan } = await loadPromises('plans');

        setPlans(dataPlan.content);
        setRegistrations({
          ...data,
          start_date: parseISO(data.start_date),
          end_date: parseISO(data.end_date),
        });
        setLoading(false);
      } else {
        const { data } = await loadPromises('plans');
        setPlans(data.content);
        setLoading(false);
      }
    } catch (err) {
      toast.error(requestFailMessage);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadPromises(type) {
    if (type === 'students') return api.get('students');
    if (type === 'plans') return api.get('plans');

    return api.get('registrations', {
      params: { id },
    });
  }

  const filterStudent = (data, inputValue) => {
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
        toast.error(err.response.data.error);
      }
    }
    const data = await getStudents();

    return new Promise(resolve => {
      resolve(filterStudent(data, inputValue));
    });
  };

  function handlePlan(newPlan) {
    setRegistrations({
      ...registrations,
      plan: newPlan,
      end_date: registrations.start_date
        ? addMonths(registrations.start_date, newPlan.duration)
        : null,
      price: newPlan.price * newPlan.duration,
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
      toast.error(err.response.data.error);
    }
  }

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>{id ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}</h1>
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
                    disabled={disableDate}
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
                    value={registrations.price}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RegistrationForm;
