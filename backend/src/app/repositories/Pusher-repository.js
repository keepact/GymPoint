import Pusher from 'pusher';
import StudentRepository from '../repositories/Student';

class PusherRepository {
  async sendMessageRealTime(message, channel, event) {
    try {
      var channels_client = new Pusher({
        appId: `${process.env.PUSHER_ID}`,
        key: `${process.env.PUSHER_KEY}`,
        secret: `${process.env.PUSHER_SECRET}`,
        cluster: 'us2',
        useTLS: true
      });
      if (process.env.NODE_ENV !== 'development') {
        channels_client.trigger(channel, event, message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async sendNewListInRealTime(studentId) {
    try {
      const students = await new StudentRepository().getAll(1);
      const currentStudents = students.rows;

      const newArrayOfStudents = currentStudents.filter(student => student.id !== +studentId)

        return await this.sendMessageRealTime(
          newArrayOfStudents,
          'student',
          'new-student-list'
        );
    } catch (err) {
      console.log(err);
    }
  }
}

export default PusherRepository;
