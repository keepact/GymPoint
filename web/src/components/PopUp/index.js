import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content, TextArea, FormPopUp } from './styles';

function PopUp({
  name,
  title,
  question,
  label,
  buttonLabel,
  placeholder,
  modal,
  schema,
  onSubmit,
}) {
  return (
    <Container>
      <Content>
        <FormPopUp schema={schema} onSubmit={onSubmit}>
          <span>{title}</span>
          <p>{question}</p>
          <label htmlFor={name}>{label}</label>
          <TextArea
            name={name}
            placeholder={placeholder}
            onChange={e => e.target.value}
          />
          <button type="submit">
            <span>{buttonLabel}</span>
          </button>
          <button cancel="true" type="button" onClick={modal}>
            <span>Cancelar</span>
          </button>
        </FormPopUp>
      </Content>
    </Container>
  );
}

PopUp.defaultProps = {
  placeholder: '...',
};

PopUp.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modal: PropTypes.func.isRequired,
  schema: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PopUp;
