import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/question';

import { Types, questionSuccess, questionFailure } from './index';

export function* createOrListQuestions({ payload }) {
  const { id, newList } = payload;

  try {
    if (!newList) {
      const response = yield call(service.questionList, id);

      const questions = response.data;

      yield put(questionSuccess(questions));
    } else {
      yield call(service.questionCreate, id);
      const response = yield call(service.questionList, id);

      const questions = response.data;

      yield put(questionSuccess(questions));
    }
  } catch (err) {
    Alert.alert('Falha na requisição', err.response.data.error);
    yield put(questionFailure());
  }
}

export default all([takeLatest(Types.QUESTION_REQUEST, createOrListQuestions)]);
