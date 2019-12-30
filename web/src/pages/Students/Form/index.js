import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi';

import history from '~/services/history';
import { parseDecimal, parseInteger } from '~/util/format';
import { validateStudents } from '~/util/validation';

import InputNumber from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function StudentForm({ match }) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState('');

  const { id } = match.params;

  async function loadData() {
    try {
      const response = await api.get('/students', {
        params: { id },
      });

      setStudent({
        ...response.data,
        height_formatted: parseDecimal(response.data.height, 'height'),
        weight_formatted: parseDecimal(response.data.weight, 'weight'),
      });
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  useEffect(() => {
    if (id) {
      loadData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(data) {
    const formatedData = {
      ...data,
      name: data.name,
      email: data.email,
      age: data.age,
      height: parseInteger(data.height_formatted, 'height'),
      weight: parseInteger(data.weight_formatted),
    };

    try {
      if (id) {
        await api.put(`/students/${id}`, formatedData);
      } else {
        await api.post('students', formatedData);
      }
      toast.success(
        id ? 'Cadastro atualizado com sucesso' : 'Aluno cadastrado com sucesso'
      );
      history.push('/students');
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
            <h1>{id ? 'Edição de aluno' : 'Cadastro de Aluno'}</h1>
            <div>
              <button type="button" onClick={() => history.push('/')}>
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
              schema={validateStudents}
              initialData={student}
              onSubmit={handleSubmit}
            >
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
                      Peso <span className="label">(em kg)</span>
                    </label>
                    <InputNumber
                      decimalScale={3}
                      name="weight_formatted"
                      placeholder="75.500"
                    />
                  </div>
                  <div>
                    <label htmlFor="height_formatted">Altura</label>
                    <InputNumber
                      decimalScale={2}
                      placeholder="1.70"
                      name="height_formatted"
                    />
                  </div>
                </NumberInputs>
              </>
            </MyForm>
          </Content>
        </>
      )}
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
