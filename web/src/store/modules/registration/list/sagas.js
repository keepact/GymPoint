import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { longDate, language, activeColor } from '~/util/format';

import { requestFailMessage } from '~/util/validation';

import * as registrationService from '~/services/registration';
import history from '~/services/history';

import { listPlanRequest } from '../../plan/list';
import { listStudentRequest } from '../../student/list';

import {
  Types,
  listRegistrationSuccess,
  listRegistrationSuccessId,
  listRegistrationFailure,
} from './index';

export function* listRegistrationId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(registrationService.registrationListId, id);

    const registration = {
      ...response.data,
      id,
      start_date: parseISO(response.data.start_date),
      end_date: parseISO(response.data.end_date),
    };

    yield put(listRegistrationSuccessId(registration));

    if (response.status === 200) {
      yield put(listPlanRequest(1, 'registration'));
      yield put(listStudentRequest(1));
    }

    history.push('/registrations/edit');
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listRegistrationFailure());
  }
}

export function* listRegistrations({ payload }) {
  const { page, newList } = payload;
  try {
    const response = yield call(
      !newList
        ? registrationService.registrationList
        : registrationService.registrationPending,
      page
    );

    const registrations = response.data.content.rows.map(registration => ({
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

    const { lastPage, pending: pendingCount } = response.data;
    const hasPending = pendingCount > 0;

    const pages = {
      currentPage: page,
      lastPage,
      pendingCount,
      pending: hasPending,
    };

    yield put(listRegistrationSuccess(registrations, pages));
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listRegistrationFailure());
  }
}

export function* registrationInitialState() {
  yield put(listPlanRequest(1, 'registration'));
  yield put(listStudentRequest(1));
  history.push('registrations/create');
}

export function registrationRedirect() {
  history.push('/registrations');
}

export default all([
  takeLatest(Types.REQUEST, listRegistrations),
  takeLatest(Types.REQUEST_ID, listRegistrationId),
  takeLatest(Types.REQUEST_INITIAL_STATE, registrationInitialState),
  takeLatest(Types.REDIRECT, registrationRedirect),
]);
