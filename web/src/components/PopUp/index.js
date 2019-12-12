import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container, Content, TextArea, FormPopUp } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Digite uma resposta.'),
});

function PopUp({ title, modal, label, question, student }) {
  async function handleSubmit(data) {
    await api.post(`/students/help-orders/${student}/answer`, data);

    modal(false);
  }

  return (
    <Container>
      <Content>
        <FormPopUp schema={schema} onSubmit={handleSubmit}>
          <span>{title}</span>
          <p>{question}</p>
          <label htmlFor="help">{label}</label>
          <TextArea
            multiline
            name="answer"
            placeholder="Sua resposta aqui"
            onChange={e => e.target.value}
          />
          <button type="submit">
            <span>Responder Aluno</span>
          </button>
          <button cancel="true" type="button" onClick={modal}>
            <span>Cancelar</span>
          </button>
        </FormPopUp>
      </Content>
    </Container>
  );
}

PopUp.propTypes = {
  modal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  student: PropTypes.number.isRequired,
};

export default PopUp;
