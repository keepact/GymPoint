import React from 'react';
import PropTypes from 'prop-types';

function renderField({
  input,
  label,
  type,
  htmlFor,
  disabled,
  placeholder,
  meta: { touched, error, warning },
}) {
  return (
    <>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <div>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </>
  );
}

renderField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
};

renderField.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default renderField;
