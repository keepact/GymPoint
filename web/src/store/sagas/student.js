import { takeLatest, call, put, all, delay, select } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';

import { toast } from 'react-toastify';
import { parseDecimal, parseInteger } from '~/util/format';

import history from '~/services/history';
import * as studentService from '~/services/student';

import { Types, getAllStudents } from '../ducks/student';

export function* listStudentById({ payload }) {
  const { id } = payload;

  try {
    const { data } = yield call(studentService.studentListId, id);
    const { name, email, age, height, weight } = data;

    const student = {
      id,
      name,
      email,
      age,
      height_formatted: parseDecimal(height, 'height'),
      weight_formatted: parseDecimal(weight, 'weight'),
    };

    yield put({
      type: Types.LIST_STUDENT_ID_SUCCESS,
      payload: { student },
    });
    history.push('students/edit');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.STUDENT_LOADED,
    });
  }
}

export function* listStudents({ payload }) {
  const { page, student } = payload;

  if (student) {
    yield delay(600);
  }

  try {
    const { data } = yield call(studentService.studentList, payload);

    const students = data.content.rows.map(students => ({
      id: students.id,
      name: students.name,
      email: students.email,
      age: students.age,
    }));

    const { lastPage } = data;

    const pages = {
      currentPage: page,
      lastPage,
    };

    yield put({
      type: Types.LIST_STUDENTS_SUCCESS,
      payload: { students, pages },
    });
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.STUDENT_LOADED,
    });
  }
}

export function* filterStudent({ payload }) {
  const { student } = payload;
  const { page } = yield select(state => state.studentList);

  const filtered = {
    page,
    student,
  };

  try {
    const { data } = yield call(studentService.studentList, filtered);

    const students = data.content.rows.map(students => ({
      id: students.id,
      name: students.name,
      email: students.email,
      age: students.age,
    }));

    yield put({
      type: Types.FILTER_STUDENTS_SUCCESS,
      payload: { students },
    });
  } catch (err) {
    console.log(err);
  }
}

export function studentRedirect() {
  history.push('/');
}

export function studentInitialState() {
  history.push('students/create');
}

export function* updateStudent({ payload }) {
  const { name, email, age, height_formatted, weight_formatted } = payload.data;

  const { id } = payload;

  const studentData = {
    id,
    name,
    email,
    age,
    height: parseInteger(height_formatted, 'height'),
    weight: parseInteger(weight_formatted),
  };

  yield put(startSubmit('STUDENT_FORM'));
  try {
    if (id) {
      yield call(studentService.studentUpdate, studentData);
    } else {
      yield call(studentService.studentCreate, studentData);
    }

    toast.success(
      id ? 'Estudante atualizado com sucesso' : 'Estudante criado com sucesso'
    );

    yield put(stopSubmit('STUDENT_FORM'));
    yield put({
      type: Types.STUDENT_LOADED,
    });
    history.push('/students');
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.STUDENT_LOADED,
    });
  }
}

export function* deleteStudent({ payload }) {
  const { id } = payload;

  try {
    yield call(studentService.studentDelete, id);

    toast.success('Aluno removido com sucesso');

    yield put({
      type: Types.STUDENT_LOADED,
    });
    yield put(getAllStudents(1));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put({
      type: Types.STUDENT_LOADED,
    });
  }
}

export default all([
  takeLatest(Types.LIST_STUDENTS_REQUEST, listStudents),
  takeLatest(Types.LIST_STUDENT_ID_REQUEST, listStudentById),
  takeLatest(Types.FILTER_STUDENTS_REQUEST, filterStudent),
  takeLatest(Types.STUDENT_REDIRECT, studentRedirect),
  takeLatest(Types.UPDATE_STUDENT_INITIAL_STATE, studentInitialState),
  takeLatest(Types.CREATE_OR_EDIT_STUDENT_REQUEST, updateStudent),
  takeLatest(Types.DELETE_STUDENT_REQUEST, deleteStudent),
]);
