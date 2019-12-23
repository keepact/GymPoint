export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function parseDecimal(numberVal, type) {
  if (numberVal < 100 && type === 'height') {
    return numberVal / 10;
  }
  if (numberVal < 1000 && type === 'weight') {
    return numberVal;
  }
  if (numberVal < 10000 && type === 'weight') {
    return numberVal / 100;
  }
  if (numberVal < 1000000 && type === 'weight') {
    return numberVal / 1000;
  }
  return numberVal / 100;
}

export function parseInteger(numberVal, type) {
  function decimalRegex(number) {
    return String(number).replace(/[^0-9|-]/g, '');
  }
  if (numberVal <= 1 < 2 && type === 'height') {
    return numberVal * 100;
  }
  if (numberVal >= 2 && type === 'height') {
    return decimalRegex((numberVal * 10).toFixed(1));
  }
  return numberVal * 1000;
}
