import * as Yup from 'yup';
import { addMonths } from 'date-fns';

const fieldRequired = 'Esse campo é obrigatório';

export const requestFailMessage =
  'Houve um erro, tente novamente em alguns minutos';

export const validateSignIn = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required(fieldRequired),
  password: Yup.string().required(fieldRequired),
});

export const validateProfile = Yup.object().shape({
  name: Yup.string().min(3, 'Mínimo de 3 letras'),
  email: Yup.string().email('Insira um e-mail válido'),
  oldPassword: Yup.string().min(6, 'Mínimo de 6 letras/números'),
  password: Yup.string()
    .min(6, 'Mínimo de 6 letras/números')
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required(fieldRequired) : field
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required(fieldRequired).oneOf([Yup.ref('password')])
      : field
  ),
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
    .min(1, 'mínimo de 1 mês')
    .max(12, 'máximo de 1 ano')
    .typeError(fieldRequired)
    .required(fieldRequired),
  price: Yup.number()
    .min(5, 'mínimo de R$ 5,00')
    .max(1000, 'máximo de R$ 1000,00')
    .typeError(fieldRequired)
    .required(fieldRequired),
});

export const validateRegistrations = Yup.object().shape({
  student: Yup.mixed().required(fieldRequired),
  plan: Yup.mixed().required(fieldRequired),
  start_date: Yup.date()
    .min(new Date(), 'Datas passadas não são permitidas')
    .max(addMonths(new Date(), 3), 'Agendamentos podem ocorrer em até 3 meses')
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
    .min(6, 'mínimo de 6 anos')
    .max(100, 'máximo de 100 anos')
    .typeError(fieldRequired)
    .required(fieldRequired),
  weight_formatted: Yup.number()
    .min(10, 'Mínimo de 10 quilos')
    .max(350, 'Máximo de 350 quilos')
    .required(fieldRequired),
  height_formatted: Yup.number()
    .min(1, 'Mínimo de 1 digitos')
    .max(3, 'Máximo de 3 digitos')
    .required(fieldRequired),
});

export const validateHelpOrders = Yup.object().shape({
  answer: Yup.string()
    .min(10, 'Mínimo de 10 letras')
    .required('Digite uma resposta'),
});
