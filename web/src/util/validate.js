export const validatePlan = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Esse campo é obrigatório';
  } else if (values.title.length > 30) {
    errors.title = 'Máximo de 30 letras';
  } else if (values.title.length < 3) {
    errors.title = 'Mínimo de 3 letras';
  } else if (!/^([^0-9]*)$/.test(values.title)) {
    errors.title = 'Números não são permitidos';
  }

  if (!values.duration) {
    errors.duration = 'Esse campo é obrigatório';
  } else if (values.duration.length > 12) {
    errors.duration = 'Máximo de 1 ano';
  } else if (values.duration.length < 1) {
    errors.duration = 'Mínimo de 1 mês';
  }

  if (!values.price) {
    errors.price = 'Esse campo é obrigatório';
  } else if (values.price.length > 1000) {
    errors.price = 'Máximo de R$ 1000,00';
  } else if (values.price.length < 5) {
    errors.price = 'Mínimo de R$ 5,00';
  }

  return errors;
};

export const warn = values => {
  const warnings = {};
  if (values.price < 19) {
    warnings.price = 'Hmm, R$ 5,50 parece um pouco barato demais...';
  }
  return warnings;
};
