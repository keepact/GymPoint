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

function Edit({ match }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState('');

  function parseDecimal(numberVal, type) {
    if (numberVal < 100 && type === 'weight') {
      return ((numberVal / 100) * 100).toFixed(2);
    }
    if (numberVal < 100 && type === 'height') {
      return (numberVal / 10).toFixed(2);
    }
    return (numberVal / 100).toFixed(2);
  }

  async function loadData() {
    const response = await api.get(`/students/${match.params.id}`);

    setStudent({
      ...response.data,
      weight_formatted: parseDecimal(response.data.weight, 'weight'),
      height_formatted: parseDecimal(response.data.height, 'height'),
    });
    setLoading(false);
  }

  async function handleSubmit(data) {
    try {
      const { weight_formatted, height_formatted } = data;
      const weight = String(weight_formatted).replace(/[^0-9|-]/g, '');
      const height = String(height_formatted).replace(/[^0-9|-]/g, '');

      await api.put(`/students/${match.params.id}`, {
        name: data.name,
        email: data.email,
        age: data.age,
        weight,
        height,
      });
      toast.success('Cadastro Atualizado');
    } catch (err) {
      console.log(err);
      toast.error('Erro na requisição');
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de aluno</h1>
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
            <label htmlFor="">Nome Completo</label>
            <Input name="name" />
            <label htmlFor="">Endereço de Email</label>
            <Input name="email" />

            <NumberInputs>
              <div>
                <label htmlFor="">Idade</label>
                <Input name="age" type="number" />
              </div>
              <div>
                <label htmlFor="">
                  Peso <span>(em kg)</span>
                </label>
                <InputNumber decimalScale={2} name="weight_formatted" />
              </div>
              <div>
                <label htmlFor="">Altura</label>
                <InputNumber
                  thousandSeparator
                  decimalScale={2}
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

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Edit;
