import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { FiUpload } from 'react-icons/fi';

import { validateStudent } from '~/util/validate';

import { updateOrCreateStudent } from '~/store/modules/student/update';
import { listStudentRedirect } from '~/store/modules/student/list';

import renderField from '~/components/FormFields/renderField';
import NumberInput from '~/components/NumberInput';
import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/styles/shared';

function StudentForm({ handleSubmit, submitting }) {
  const dispatch = useDispatch();

  const { studentId } = useSelector(state => state.studentList);
  const { loading } = useSelector(state => state.studentUpdate);

  const submit = data => {
    dispatch(updateOrCreateStudent(data, studentId || undefined));
  };

  return (
    <ContainerForm>
      {loading ? (
        <Animation animation={loadingAnimation} />
      ) : (
        <>
          <TitleWrapper>
            <h1>{studentId ? 'Edição de aluno' : 'Cadastro de Aluno'}</h1>
            <div>
              <button
                type="button"
                onClick={() => dispatch(listStudentRedirect())}
              >
                Voltar
              </button>
              <button form="Form" disabled={submitting} type="submit">
                <span>Salvar</span>
                <FiUpload size={20} />
              </button>
            </div>
          </TitleWrapper>
          <Content>
            <MyForm id="Form" onSubmit={handleSubmit(data => submit(data))}>
              <Field
                name="name"
                htmlFor="name"
                label="Nome Completo"
                component={renderField}
                type="text"
                placeholder="John Doe"
              />
              <Field
                name="email"
                htmlFor="name"
                label="Endereço de Email"
                component={renderField}
                type="text"
                placeholder="example@email.com"
              />

              <NumberInputs>
                <div>
                  <Field
                    name="age"
                    htmlFor="age"
                    label="Idade"
                    component={NumberInput}
                    placeholder="18"
                  />
                </div>
                <div>
                  <Field
                    name="weight_formatted"
                    htmlFor="weight_formatted"
                    label="Peso (em kg)"
                    component={NumberInput}
                    decimalScale={3}
                    thousandSeparator
                    placeholder="75.500"
                  />
                </div>
                <div>
                  <Field
                    name="height_formatted"
                    htmlFor="height_formatted"
                    thousandSeparator
                    label="Altura"
                    component={NumberInput}
                    decimalScale={2}
                    placeholder="1.70"
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
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: state.studentList.student,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'STUDENT_FORM_EDIT',
    enableReinitialize: true,
    validate: validateStudent,
  })(StudentForm)
);
