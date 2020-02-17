import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

function InputNumber({
  input,
  label,
  className,
  disabled,
  prefix,
  placeholder,
  thousandSeparator,
  decimalScale,
  meta: { touched, error, warning },
}) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <NumberFormat
        {...input}
        className={className}
        thousandSeparator={thousandSeparator}
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

InputNumber.defaultProps = {
  disabled: false,
  className: 'gray',
  label: '',
  prefix: '',
  thousandSeparator: '',
  decimalScale: 0,
};

InputNumber.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  thousandSeparator: PropTypes.string,
  decimalScale: PropTypes.number,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default InputNumber;
