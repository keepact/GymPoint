import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import MaskedTextInput from 'react-text-mask';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useMemo(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    const datePickers = document.getElementsByClassName(
      'react-datepicker__input-container'
    );
    Array.from(datePickers).forEach(el =>
      el.childNodes[0].setAttribute('readOnly', true)
    );
  }, []);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        customInput={
          <MaskedTextInput
            type="text"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        }
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DatePicker;
