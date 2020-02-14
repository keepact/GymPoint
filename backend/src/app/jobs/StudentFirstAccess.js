import Mail from '../../lib/Mail';

class StudentFirstAccess {
  get key() {
    return 'StudentFirstAccess';
  }

  async handle({ data }) {
    const { student } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Email de confirmação',
      template: 'student-first-access',
      context: {
        student: student.name,
        link: '',
      },
    });
  }
}

export default new StudentFirstAccess();
