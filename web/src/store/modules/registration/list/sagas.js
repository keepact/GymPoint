import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { longDate, language, activeColor } from '~/util/format';

import {
  registrationList,
  registrationListId,
  registrationPending,
} from '~/services/registration';
import history from '~/services/history';

import { getAllPlans } from '../../plan/list';
import { getAllStudents } from '../../student/list';

import { Types } from './index';

export function* listRegistrationId({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(registrationListId, id);

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
      type: Types.LIST_REGISTRATIONS_FAILURE,
    });
  }
}

export function* listRegistrations({ payload }) {
  const { page, newList } = payload;

  try {
    const { data } = yield call(
      !newList ? registrationList : registrationPending,
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
      type: Types.LIST_REGISTRATIONS_FAILURE,
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

export default all([
  takeLatest(Types.LIST_REGISTRATIONS_REQUEST, listRegistrations),
  takeLatest(Types.LIST_REGISTRATION_ID_REQUEST, listRegistrationId),
  takeLatest(Types.UPDATE_REGISTRATION_INITIAL_STATE, registrationInitialState),
  takeLatest(Types.REGISTRATION_REDIRECT, registrationRedirect),
]);
