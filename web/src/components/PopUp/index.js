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
          <button type="submit">{buttonLabel}</button>
          <button cancel="true" type="button" onClick={modal}>
            Cancelar
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
  schema: PropTypes.oneOfType([PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PopUp;
