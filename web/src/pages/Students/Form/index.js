import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Input } from '@rocketseat/unform';
import { FiUpload } from 'react-icons/fi';

import history from '~/services/history';
import { validateStudents } from '~/util/validation';

import {
  listStudentRequestId,
  listStudentClearValue,
} from '~/store/modules/student/list/student';
import { createStudentRequest } from '~/store/modules/student/create/student';
import { updateStudentRequest } from '~/store/modules/student/update/student';

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

function StudentForm({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();

  const { loading } = useSelector(state =>
    id ? state.studentUpdate.loading : state.studentCreate.loading
  );
  const { student: currentStudent } = useSelector(state => state.studentList);

  const student = useMemo(() => currentStudent, [currentStudent]);

  useEffect(() => {
    if (id) {
      dispatch(listStudentRequestId(id));
    } else if (student !== undefined && !id) {
      dispatch(listStudentClearValue());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(data) {
    if (id) {
      dispatch(updateStudentRequest(data, id));
    } else {
      dispatch(createStudentRequest(data));
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
              initialData={student && student.id === id && student}
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
