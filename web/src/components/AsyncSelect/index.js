import React, { useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { MyAsyncSelect } from './styles';

export default function AsyncSelector({
  name,
  loadOptions,
  noOptionsMessage,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useMemo(() => setValue(defaultValue), [defaultValue]); //eslint-disable-line

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(selectedValue) {
    setValue(selectedValue);
  }

  return (
    <>
      <MyAsyncSelect
        name={fieldName}
        loadOptions={loadOptions}
        value={value}
        ref={ref}
        onChange={handleChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        className="react-asyncselect-container"
        classNamePrefix="react-asyncselect"
        placeholder="Selecione um estudante..."
        loadingMessage={() => 'Carregando...'}
        noOptionsMessage={() =>
          noOptionsMessage || 'Nenhum registro encontrado'
        }
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

AsyncSelector.defaultProps = {
  noOptionsMessage: null,
};

AsyncSelector.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  noOptionsMessage: PropTypes.string,
};
