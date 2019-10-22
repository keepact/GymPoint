import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registrationComplete } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${registrationComplete.student.name} <${registrationComplete.student.email}>`,
      subject: 'Matrícula realizada',
      template: 'registration',
      context: {
        student: registrationComplete.student.name,
        start: format(
          parseISO(registrationComplete.student.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end: format(
          parseISO(registrationComplete.student.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: registrationComplete.student.price,
      },
    });
  }
}

export default new RegistrationMail();
