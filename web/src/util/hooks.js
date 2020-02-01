import { useEffect, useRef } from 'react';

export const useCompare = val => {
  const usePrevious = value => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevVal = usePrevious(val);

  return prevVal !== val;
};
