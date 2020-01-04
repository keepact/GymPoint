import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { FiUpload } from 'react-icons/fi';

import history from '~/services/history';
import { validateStudents } from '~/util/validation';

import { updateOrCreateStudent } from '~/store/modules/student/update';

import InputNumber from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function StudentForm() {
  const { student: currentStudent, studentId } = useSelector(
    state => state.studentList
  );
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.studentUpdate.loading);

  const student = useMemo(() => currentStudent, [currentStudent]);

  function handleSubmit(data) {
    dispatch(updateOrCreateStudent(data, studentId || undefined));
  }

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>{studentId ? 'Edição de aluno' : 'Cadastro de Aluno'}</h1>
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
            </MyForm>
          </Content>
        </>
      )}
    </ContainerForm>
  );
}

StudentForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default StudentForm;
