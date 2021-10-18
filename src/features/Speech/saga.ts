import { all, call, put, takeLatest, fork } from 'redux-saga/effects';

import { getSpeech } from './api';

import {
  getSpeechStarted,
  getSpeechSucceeded,
  getSpeechFailed
} from './reducer';

function* runGetSpeechSucceeded(action: ReturnType<typeof getSpeechStarted>) {
  const { transcript } = action.payload;
  try {
    const voice = (yield call(getSpeech, transcript)) as AudioBuffer;

    yield put(
      getSpeechSucceeded({
        params: { transcript },
        result: { voice }
      }));

  } catch (error) {
    if (error instanceof Error) {
      yield put(getSpeechFailed({
        params: { transcript }, error }));
    }
  }
}

function* runVoicePlay(action: ReturnType<typeof getSpeechSucceeded>) {
  const { voice } = action.payload.result;

  if (voice) {
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = voice;
    source.connect(audioCtx.destination);
    source.addEventListener('ended', () => {
      console.log('play end');
    });
    source.start();
  }
}

export function* watchGetSpeechStarted() {
  yield takeLatest(getSpeechStarted, runGetSpeechSucceeded);
}

export function* watchGetSpeechSucceeded() {
  yield takeLatest(getSpeechSucceeded, runVoicePlay);
}

export default function* rootSaga() {
  yield all([fork(watchGetSpeechStarted)]);
}
