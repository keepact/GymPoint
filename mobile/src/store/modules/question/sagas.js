import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import * as service from '~/services/question';
import NavigationService from '~/services/navigation';

import { Types, questionSuccess, questionFailure } from './index';

export function* createOrListQuestions({ payload }) {
  const { id, data } = payload;

  try {
    if (!data) {
      const response = yield call(service.questionList, id);

      const questions = response.data;

      yield put(questionSuccess(questions));
    } else {
      yield call(service.questionCreate, payload);
      const response = yield call(service.questionList, id);

      const questions = response.data;

      yield put(questionSuccess(questions));

      NavigationService.navigate('HelpOrderList');
      Alert.alert('Sucesso', 'Pergunta Enviada');
    }
  } catch (err) {
    yield put(questionFailure());
    Alert.alert('Falha na requisição', err.response.data.error);
  }
}

export function redirectNewQuestion() {
  NavigationService.navigate('HelpOrderAsk');
}

export default all([
  takeLatest(Types.QUESTION_REQUEST, createOrListQuestions),
  takeLatest(Types.REDIRECT, redirectNewQuestion),
]);
