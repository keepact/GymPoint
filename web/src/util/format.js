import pt from 'date-fns/locale/pt';
import { parseISO, isBefore, startOfDay } from 'date-fns';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const longDate = "d 'de' MMMM 'de' yyyy";
export const datePlaceHolder = 'dd/mm/yyyy';
export const pricePlaceHolder = 'R$ 0,00';

export const language = { locale: pt };

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
  const decimalRegex = number => {
    return String(number).replace(/[^0-9|-]/g, '');
  };
  if (numberVal < 2 && type === 'height') {
    return (numberVal * 1000) / 10;
  }
  if (numberVal >= 2 && type === 'height') {
    return decimalRegex((numberVal * 10).toFixed(1));
  }
  return numberVal * 1000;
}

export function activeColor(active, date) {
  const startOfPlan = startOfDay(parseISO(date));

  if (active === 'Pendente') {
    return {
      title: 'Pendente',
      color: 'black',
    };
  }

  if (active) {
    return {
      title: 'Ativo',
      color: 'green',
    };
  }
  if (isBefore(new Date(), startOfPlan)) {
    return {
      title: 'Agendado',
      color: 'orange',
    };
  }
  return {
    title: 'Terminado',
    color: 'red',
  };
}
