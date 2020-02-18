import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function NumberInput({
  input,
  label,
  htmlFor,
  className,
  disabled,
  prefix,
  placeholder,
  decimalScale,
  meta: { touched, error, warning },
}) {
  return (
    <>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <NumberFormat
        {...input}
        className={className}
        thousandSeparator
        isNumericString
        fixedDecimalScale
        decimalScale={decimalScale}
        placeholder={placeholder}
        prefix={prefix}
        disabled={disabled}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </>
  );
}

NumberInput.defaultProps = {
  disabled: false,
  className: '',
  label: '',
  htmlFor: '',
  prefix: '',
  decimalScale: 0,
};

NumberInput.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  decimalScale: PropTypes.number,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NumberInput;
