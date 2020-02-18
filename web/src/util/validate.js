import { addMonths } from 'date-fns';

export const validateProfile = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Esse campo é obrigatório';
  } else if (values.name.length < 3) {
    errors.name = 'Mínimo de 3 letras';
  }

  if (!values.email) {
    errors.email = 'Esse campo é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'O formato precisa ser "example@email.com"';
  }

  if (values.oldPassword && !values.password) {
    errors.password = 'Esse campo é obrigatório';
  } else if (Number(values.password) < 6) {
    errors.password = 'Mínimo de 6 letras';
  }

  if (values.password && !values.confirmPassword) {
    errors.confirmPassword = 'Esse campo é obrigatório';
  } else if (Number(values.password) < 6) {
    errors.confirmPassword = 'Mínimo de 6 letras';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Suas senhas não conferem, tente novamente.';
  }

  return errors;
};

export const validateSignIn = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Esse campo é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'O formato precisa ser "example@email.com"';
  }

  if (!values.password) {
    errors.password = 'Esse campo é obrigatório';
  } else if (values.password.length < 6) {
    errors.password = 'Mínimo de 6 letras';
  }

  return errors;
};

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
  } else if (Number(values.height_formatted) > 3) {
    errors.height_formatted = 'Máximo de 3 digitos';
  } else if (Number(values.height_formatted) < 1) {
    errors.height_formatted = 'Mínimo de 1 digitos';
  }

  return errors;
};

export const validateRegistration = values => {
  const errors = {};

  if (!values.student) {
    errors.student = 'Esse campo é obrigatório';
  }

  if (!values.plan) {
    errors.plan = 'Esse campo é obrigatório';
  }

  if (!values.start_date) {
    errors.start_date = 'Esse campo é obrigatório';
  } else if (new Date(values.start_date) < new Date()) {
    errors.start_date = 'Datas passadas não são permitidas';
  } else if (new Date(values.start_date) > addMonths(new Date(), 3)) {
    errors.start_date = 'Agendamentos podem ocorrer em até 3 meses';
  }

  return errors;
};

export const validateHelpOrders = values => {
  const errors = {};

  if (!values.answer) {
    errors.answer = 'Digite uma resposta';
  } else if (values.answer.length < 10) {
    errors.answer = 'Mínimo de 10 letras';
  }
  return errors;
};
