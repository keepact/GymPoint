import { takeLatest, call, put, all } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { longDate, language, activeColor } from '~/util/format';

import * as registrationService from '~/services/registration';
import history from '~/services/history';

import { getAllPlans } from '../ducks/plan';
import { getAllStudents } from '../ducks/student';

import { Types, getAllRegistrations } from '../ducks/registration';

export function* listRegistrationId({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(registrationService.registrationListId, id);

    const registration = {
      ...data,
      id,
      start_date: parseISO(data.start_date),
      end_date: parseISO(data.end_date),
    };

    yield put({
      type: Types.LIST_REGISTRATION_ID_SUCCESS,
      payload: { registration },
    });

    yield put(getAllPlans(1, 'registration'));
    yield put(getAllStudents(1));

    history.push('/registrations/edit');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.REGISTRATION_LOADED,
    });
  }
}

export function* listRegistrations({ payload }) {
  const { page, newList } = payload;

  try {
    const { data } = yield call(
      !newList
        ? registrationService.registrationList
        : registrationService.registrationPending,
      page
    );

    const registrations = data.content.rows.map(registration => ({
      id: registration.id,
      student: registration.student
        ? registration.student.name
        : 'Aluno Removido',
      plan: registration.plan ? registration.plan.title : 'Plano Removido',
      startDate: format(parseISO(registration.start_date), longDate, language),
      endDate: format(parseISO(registration.end_date), longDate, language),
      activePlan: activeColor(
        registration.student && registration.plan
          ? registration.active
          : 'Pendente',
        registration.start_date
      ),
    }));

    const { lastPage, pending: pendingCount } = data;
    const hasPending = pendingCount > 0;

    const pages = {
      currentPage: page,
      lastPage,
      pendingCount,
      pending: hasPending,
    };

    yield put({
      type: Types.LIST_REGISTRATIONS_SUCCESS,
      payload: { registrations, pages },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.REGISTRATION_LOADED,
    });
  }
}

export function* registrationInitialState() {
  yield put(getAllPlans(1, 'registration'));
  yield put(getAllStudents(1));
  history.push('registrations/create');
}

export function registrationRedirect() {
  history.push('/registrations');
}

export function* createOrEditRegistration({ payload }) {
  const { id } = payload;
  const { student, plan, start_date } = payload.data;

  const registrations = {
    id,
    student_id: student.id,
    plan_id: plan.id,
    start_date,
  };

  yield put(startSubmit('REGISTRATION_FORM'));
  try {
    if (id) {
      yield call(registrationService.registrationUpdate, registrations);
    } else {
      yield call(registrationService.registrationCreate, registrations);
    }

    toast.success(
      id ? 'Matrícula alterada com sucesso' : 'Matrícula criada com sucesso'
    );

    yield put(stopSubmit('REGISTRATION_FORM'));

    yield put({
      type: Types.REGISTRATION_LOADED,
    });
    history.push('/registrations');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.REGISTRATION_LOADED,
    });
  }
}

export function* deleteRegistration({ payload }) {
  const { id } = payload;

  try {
    yield call(registrationService.registrationDelete, id);

    toast.success('Matrícula removida com sucesso');

    yield put({
      type: Types.REGISTRATION_LOADED,
    });

    yield put(getAllRegistrations(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.REGISTRATION_LOADED,
    });
  }
}

export default all([
  takeLatest(Types.LIST_REGISTRATIONS_REQUEST, listRegistrations),
  takeLatest(Types.LIST_REGISTRATION_ID_REQUEST, listRegistrationId),
  takeLatest(Types.UPDATE_REGISTRATION_INITIAL_STATE, registrationInitialState),
  takeLatest(Types.REGISTRATION_REDIRECT, registrationRedirect),
  takeLatest(
    Types.CREATE_OR_EDIT_REGISTRATION_REQUEST,
    createOrEditRegistration
  ),
  takeLatest(Types.DELETE_REGISTRATION_REQUEST, deleteRegistration),
]);
