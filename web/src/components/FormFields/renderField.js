import React from 'react';
import PropTypes from 'prop-types';

const renderField = ({
  input,
  label,
  type,
  htmlFor,
  disabled,
  meta: { touched, error, warning },
}) => (
  <>
    <label htmlFor={htmlFor}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} disabled={disabled} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </>
);

renderField.defaultProps = {
  label: '',
  disabled: false,
};

renderField.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default renderField;
