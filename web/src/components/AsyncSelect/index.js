import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { MyAsyncSelect } from './styles';

function AsyncSelector({
  input,
  label,
  loadOptions,
  placeholder,
  noOptionsMessage,
  meta: { touched, error, warning },
}) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <MyAsyncSelect
        onChange={option => input.onChange(option.value)}
        loadOptions={loadOptions}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        className="react-asyncselect-container"
        classNamePrefix="react-asyncselect"
        placeholder={placeholder}
        loadingMessage={() => 'Carregando...'}
        noOptionsMessage={() =>
          noOptionsMessage || 'Nenhum registro encontrado'
        }
      />

      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </>
  );
}

AsyncSelector.defaultProps = {
  noOptionsMessage: null,
  label: '',
};

AsyncSelector.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  loadOptions: PropTypes.func.isRequired,
  noOptionsMessage: PropTypes.string,
  meta: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default memo(AsyncSelector);
