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

export const validateStudent = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } else if (values.name.length > 80) {
    errors.name = 'Máximo de 80 letras';
  } else if (values.name.length < 10) {
    errors.name = 'Mínimo de 10 letras';
  } else if (!/^([^0-9]*)$/.test(values.name)) {
    errors.name = 'Números não são permitidos';
  }

  if (!values.email) {
    errors.email = 'Esse campo é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'O formato precisa ser "example@email.com"';
  }

  if (!values.age) {
    errors.age = 'Esse campo é obrigatório';
  } else if (Number.isNaN(Number(values.age))) {
    errors.age = 'Precisa ser um número';
  } else if (Number(values.age) < 6) {
    errors.age = 'Mínimo de 6 anos';
  } else if (Number(values.age) > 350) {
    errors.age = 'Máximo de 100 anos';
  }

  if (!values.weight_formatted) {
    errors.weight_formatted = 'Esse campo é obrigatório';
  } else if (Number(values.weight_formatted) > 350) {
    errors.weight_formatted = 'Máximo de 350 quilos';
  } else if (Number(values.weight_formatted) < 10) {
    errors.weight_formatted = 'Mínimo de 10 quilos';
  }

  if (!values.height_formatted) {
    errors.height_formatted = 'Esse campo é obrigatório';
  } else if (values.height_formatted.length > 3) {
    errors.height_formatted = 'Máximo de 3 digitos';
  } else if (values.height_formatted.length < 1) {
    errors.height_formatted = 'Mínimo de 1 digitos';
  }

  return errors;
};
