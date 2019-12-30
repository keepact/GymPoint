import * as Yup from 'yup';
import { addMonths } from 'date-fns';

export const fieldRequired = 'Esse campo é obrigatório';

export const validateSignIn = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required(fieldRequired),
  password: Yup.string().required(fieldRequired),
});

export const validatePlans = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Mínimo de 3 letras')
    .max(30, 'Máximo de 30 letras')
    .matches(/^([^0-9]*)$/, {
      message: 'Números não são permitidos',
      excludeEmptyString: true,
    })
    .required(fieldRequired),
  duration: Yup.number()
    .min(1, 'mínimo de 1 digito')
    .max(2, 'máximo de 2 digitos')
    .typeError(fieldRequired)
    .required(fieldRequired),
  price: Yup.number()
    .min(1, 'mínimo de 1 digito')
    .max(2, 'máximo de 2 digitos')
    .typeError(fieldRequired)
    .required(fieldRequired),
});

export const validateRegistrations = Yup.object().shape({
  student: Yup.mixed().required(fieldRequired),
  plan: Yup.mixed().required(fieldRequired),
  start_date: Yup.date()
    .min(new Date(), 'Datas passadas não são permitidas')
    .max(addMonths(new Date(), 3), 'Agendamento até 3 meses')
    .typeError(fieldRequired)
    .required(fieldRequired),
});

export const validateStudents = Yup.object().shape({
  name: Yup.string()
    .min(10, 'Mínimo de 10 letras')
    .max(80, 'Máximo de 80 letras')
    .matches(/^([^0-9]*)$/, {
      message: 'Números não são permitidos',
      excludeEmptyString: true,
    })
    .required(fieldRequired),
  email: Yup.string()
    .email('O formato precisa ser "example@email.com"')
    .required(fieldRequired),
  age: Yup.number()
    .min(1, 'mínimo de 1 digito')
    .max(3, 'máximo de 3 digitos')
    .typeError(fieldRequired)
    .required(fieldRequired),
  weight_formatted: Yup.number()
    .min(2, 'Mínimo de 10 quilos')
    .max(350, 'Máximo de 350 quilos')
    .required(fieldRequired),
  height_formatted: Yup.number()
    .min(1, 'Mínimo de 1 digitos')
    .max(3, 'Máximo de 3 digitos')
    .required(fieldRequired),
});

export const validateHelpOrders = Yup.object().shape({
  answer: Yup.string().required('Digite uma resposta'),
});
