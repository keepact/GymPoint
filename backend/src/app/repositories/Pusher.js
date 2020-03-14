import Pusher from 'pusher';

class PusherRepository {
  async sendDataByPusher(message, channel, event) {
    try {
      const channels_client = new Pusher({
        appId: `${process.env.PUSHER_ID}`,
        key: `${process.env.PUSHER_KEY}`,
        secret: `${process.env.PUSHER_SECRET}`,
        cluster: 'us2',
        useTLS: true,
      });
      // if (process.env.NODE_ENV !== 'development') {
      channels_client.trigger(channel, event, message);
      // }
    } catch (err) {
      console.log(err);
    }
  }

  async sendAnswerInRealTime(question, answer) {
    const answer_at = new Date();

    const companyAsnwer = {
      answer,
      answer_at,
    };

    const questionWithAnswer = Object.assign(question, companyAsnwer);

    try {
      return await this.sendDataByPusher(
        questionWithAnswer,
        'answer',
        'company-answer'
      );
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }

  async sendQuestionInRealTime(newQuestion, student) {
    try {
      newQuestion.dataValues.name = student.name;

      return await this.sendDataByPusher(
        newQuestion,
        'question',
        'student-question'
      );
    } catch (err) {
      console.log(err);
    }
    return undefined;
  }
}

export default PusherRepository;
