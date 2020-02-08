import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/User';
import StudentController from './app/controllers/Student';
import AuthController from './app/controllers/Auth';
import FileController from './app/controllers/File';
import PlanController from './app/controllers/Plan';
import RegistrationController from './app/controllers/Registration';
import PendingController from './app/controllers/Pending';
import CheckinController from './app/controllers/Checkin';
import SupportStudentController from './app/controllers/Support-student';
import SupportCompanyController from './app/controllers/Support-company';

import * as UserMiddlewares from './app/middlewares/User';
import * as StudentMiddlewares from './app/middlewares/Student';
import * as RegistrationMiddlewares from './app/middlewares/Registration';
import * as PlanMiddlewares from './app/middlewares/Plan';
import * as SupportStudentMiddlewares from './app/middlewares/Support-student';
import * as SupportCompanyMiddlewares from './app/middlewares/Support-company';
import * as CheckinMiddlewares from './app/middlewares/Checkin';

import LoginMiddleware from './app/middlewares/Login';
import FileMiddleware from './app/middlewares/File';
import PendingMiddleware from './app/middlewares/Pending';

import authMiddleware from './app/middlewares/Auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', LoginMiddleware, AuthController.store);

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

routes.get('/plans', PlanMiddlewares.getAllPlans, PlanController.index);
routes.get('/plans/:id', PlanMiddlewares.findPlan, PlanController.show);
routes.post('/plans', PlanMiddlewares.createPlan, PlanController.store);
routes.put('/plans/:id', PlanMiddlewares.updatePlan, PlanController.update);
routes.delete('/plans/:id', PlanMiddlewares.deletePlan, PlanController.delete);

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
