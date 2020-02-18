import React from 'react';

import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { validateHelpOrders } from '~/util/validate';
import TextArea from '~/components/FormFields/TextArea';

import { Container, Content, FormPopUp } from './styles';

function PopUp({
  name,
  title,
  question,
  label,
  buttonLabel,
  placeholder,
  modal,
  handleSubmit,
  onSubmit,
  submitting,
}) {
  return (
    <Container>
      <Content>
        <FormPopUp onSubmit={handleSubmit(values => onSubmit(values))}>
          <span>{title}</span>
          <p>{question}</p>
          <Field
            name={name}
            htmlFor={name}
            label={label}
            component={TextArea}
            type="text"
            placeholder={placeholder}
          />
          <button disabled={submitting} type="submit">
            {buttonLabel}
          </button>
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
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  modal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'HELPORDER_FORM',
  validate: validateHelpOrders,
})(PopUp);
