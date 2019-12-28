import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { MySelector } from './styles';

export default function Selector({ name, options, onChange, ...rest }) {
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

  function handleChange(newValue) {
    setValue(newValue);
  }

  return (
    <>
      <MySelector
        name={fieldName}
        options={options}
        value={value}
        ref={ref}
        onChange={newValue => {
          handleChange(newValue);
          if (onChange) onChange(newValue);
        }}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        className="react-select-container"
        classNamePrefix="react-select"
        isSearchable={false}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

Selector.defaultProps = {
  onChange: null,
};

Selector.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
};
