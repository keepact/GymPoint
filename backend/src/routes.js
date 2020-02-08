import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/user';
import StudentController from './app/controllers/student';
import AuthController from './app/controllers/auth';
import FileController from './app/controllers/file';
import PlanController from './app/controllers/plan';
import RegistrationController from './app/controllers/registration';
import PendingController from './app/controllers/pending';
import CheckinController from './app/controllers/checkin';
import SupportStudentController from './app/controllers/support-student';
import SupportCompanyController from './app/controllers/support-company';

import * as UserMiddlewares from './app/middlewares/user';
import * as StudentMiddlewares from './app/middlewares/student';
import * as RegistrationMiddlewares from './app/middlewares/registration';
import * as PlanMiddlewares from './app/middlewares/plan';
import * as SupportStudentMiddlewares from './app/middlewares/support-student';
import * as SupportCompanyMiddlewares from './app/middlewares/support-company';
import * as CheckinMiddlewares from './app/middlewares/checkin';

import FileMiddleware from './app/middlewares/file';
import PendingMiddleware from './app/middlewares/pending';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', AuthController.store);

routes.get(
  '/students/:id/checkins',
  CheckinMiddlewares.getAllCheckins,
  CheckinController.index
);
routes.post(
  '/students/:id/checkins',
  CheckinMiddlewares.createCheckin,
  CheckinController.store
);

routes.get(
  '/students/:id/help-orders',
  SupportStudentMiddlewares.getAllQuestions,
  SupportStudentController.index
);
routes.post(
  '/students/:id/help-orders',
  SupportStudentMiddlewares.createQuestion,
  SupportStudentController.store
);

routes.use(authMiddleware);

routes.get('/users', UserMiddlewares.getAllUsers, UserController.index);
routes.get('/users/:id', UserMiddlewares.findUser, UserController.show);
routes.post('/users', UserMiddlewares.createUser, UserController.store);
routes.put('/users', UserMiddlewares.updateUser, UserController.update);
routes.delete('/users/:id', UserMiddlewares.deleteUser, UserController.delete);

routes.get(
  '/students',
  StudentMiddlewares.getAllStudents,
  StudentController.index
);
routes.get(
  '/students/:id',
  StudentMiddlewares.findStudent,
  StudentController.show
);
routes.post(
  '/students',
  StudentMiddlewares.createStudent,
  StudentController.store
);
routes.put(
  '/students/:id',
  StudentMiddlewares.updateStudent,
  StudentController.update
);
routes.delete(
  '/students/:id',
  StudentMiddlewares.deleteStudent,
  StudentController.delete
);

routes.get('/plans', PlanMiddlewares.getAllPlans, PlanController.index);
routes.get('/plans/:id', PlanMiddlewares.findPlan, PlanController.show);
routes.post('/plans', PlanMiddlewares.createPlan, PlanController.store);
routes.put('/plans/:id', PlanMiddlewares.updatePlan, PlanController.update);
routes.delete('/plans/:id', PlanMiddlewares.deletePlan, PlanController.delete);

routes.get(
  '/registrations',
  RegistrationMiddlewares.getAllRegistrations,
  RegistrationController.index
);
routes.get(
  '/registrations/:id',
  RegistrationMiddlewares.findRegistration,
  RegistrationController.show
);
routes.post(
  '/registrations',
  RegistrationMiddlewares.createRegistration,
  RegistrationController.store
);
routes.put(
  '/registrations/:id',
  RegistrationMiddlewares.updateRegistration,
  RegistrationController.update
);
routes.delete(
  '/registrations/:id',
  RegistrationMiddlewares.deleteRegistration,
  RegistrationController.delete
);

routes.get(
  '/students/help-orders/answers',
  SupportCompanyMiddlewares.getAllQuestions,
  SupportCompanyController.index
);
routes.post(
  '/students/help-orders/:id/answer',
  SupportCompanyMiddlewares.createAnswer,
  SupportCompanyController.store
);

routes.get(
  '/registrations/pending/removed',
  PendingMiddleware,
  PendingController.index
);
routes.post(
  '/files',
  upload.single('file'),
  FileMiddleware,
  FileController.store
);

export default routes;
