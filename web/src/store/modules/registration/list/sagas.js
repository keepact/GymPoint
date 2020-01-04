import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { longDate, language, activeColor } from '~/util/format';

import { requestFailMessage } from '~/util/validation';

import api from '~/services/api';
import history from '~/services/history';

import {
  Types,
  listRegistrationSuccess,
  listRegistrationSuccessId,
  listRegistrationFailure,
} from './registration';

export function* listRegistrationId({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, 'registrations', {
      params: { id },
    });

    const student = {
      ...response.data,
      id,
      start_date: parseISO(response.data.start_date),
      end_date: parseISO(response.data.end_date),
    };

    yield put(listRegistrationSuccessId(student));
    history.push('/registrations/edit');
  } catch (err) {
    toast.error(requestFailMessage);
    yield put(listRegistrationFailure());
  }
}

export function* listRegistrations({ payload }) {
  const { page, newList } = payload;
  try {
    if (newList === 'delete') {
      yield delay(600);
    }
    const response = yield call(
      api.get,
      !newList || newList === 'delete'
        ? 'registrations'
        : 'registrations/pending/removed',
      {
        params: { page },
      }
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

export function registrationInitialState() {
  history.push('/registrations/create');
}

export default all([
  takeLatest(Types.REQUEST, listRegistrations),
  takeLatest(Types.REQUEST_ID, listRegistrationId),
  takeLatest(Types.REQUEST_INITIAL_STATE, registrationInitialState),
]);
