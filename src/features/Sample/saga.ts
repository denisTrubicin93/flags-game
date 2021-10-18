import { all, call, put, takeLatest, fork } from 'redux-saga/effects';

import { getMembers } from './api';
import { User } from './models';

import {
  getMembersStarted,
  getMembersSucceeded,
  getMembersFailed
} from './reducer';

function* runGetMembers(action: ReturnType<typeof getMembersStarted>) {
  const { orgCode } = action.payload;
  try {
    const users = (yield call(getMembers, orgCode)) as User[];

    yield put(
      getMembersSucceeded({
        params: { orgCode },
        result: { users }
      }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getMembersFailed({
        params: { orgCode }, error }));
    }
  }
}

export function* watchGetMembers() {
  yield takeLatest(getMembersStarted, runGetMembers);
}

export default function* rootSaga() {
  yield all([fork(watchGetMembers)]);
}
