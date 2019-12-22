import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import InputNumber from '~/components/NumberInput';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

function StudentForm({ match, history }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState('');

  const { id } = match.params;

  function parseDecimal(numberVal, type) {
    if (numberVal < 1000 && type === 'weight') {
      return numberVal;
    }
    if (numberVal < 10000 && type === 'weight') {
      return numberVal / 100;
    }
    if (numberVal < 1000000 && type === 'weight') {
      return numberVal / 1000;
    }
    if (numberVal < 100 && type === 'height') {
      return (numberVal / 10).toFixed(2);
    }
    return (numberVal / 100).toFixed(2);
  }

  async function loadData() {
    try {
      const response = await api.get(`/students/${id}`);
      setStudent({
        ...response.data,
        weight_formatted: parseDecimal(response.data.weight, 'weight'),
        height_formatted: parseDecimal(response.data.height, 'height'),
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Erro na requisição');
    }
  }

  useEffect(() => {
    if (id) {
      loadData();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function decimalRegex(numberVal) {
    return String(numberVal).replace(/[^0-9|-]/g, '');
  }

  async function handleSubmit(data) {
    const { weight_formatted, height_formatted } = data;
    const weight = decimalRegex(weight_formatted);
    const height = decimalRegex(height_formatted);

    try {
      if (id) {
        await api.put(`/students/${id}`, {
          name: data.name,
          email: data.email,
          age: data.age,
          weight,
          height,
        });
      } else {
        await api.post('students', {
          name: data.name,
          email: data.email,
          age: data.age,
          weight,
          height,
        });
      }
      toast.success(
        id ? 'Cadastro atualizado com sucesso' : 'Aluno cadastrado com sucesso'
      );
      history.push('/students');
    } catch (err) {
      console.log(err);
      toast.error('Erro na requisição');
    }
  }

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>{id ? 'Edição de aluno' : 'Cadastro de Aluno'}</h1>
        <div>
          <Link to="/">Voltar</Link>
          <button form="Form" type="submit">
            Salvar
          </button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm id="Form" initialData={student} onSubmit={handleSubmit}>
          <>
            <label htmlFor="name">Nome Completo</label>
            <Input name="name" placeholder="John Doe" />
            <label htmlFor="email">Endereço de Email</label>
            <Input name="email" placeholder="example@email.com" />

            <NumberInputs>
              <div>
                <label htmlFor="age">Idade</label>
                <Input name="age" type="number" placeholder="18" />
              </div>
              <div>
                <label htmlFor="weight_formatted">
                  Peso <span>(em kg)</span>
                </label>
                <InputNumber
                  decimalScale="3"
                  name="weight_formatted"
                  placeholder="75.500"
                />
              </div>
              <div>
                <label htmlFor="height_formatted">Altura</label>
                <InputNumber
                  decimalScale="2"
                  placeholder="1.70"
                  name="height_formatted"
                />
              </div>
            </NumberInputs>
          </>
        </MyForm>
      </Content>
    </ContainerForm>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default StudentForm;
