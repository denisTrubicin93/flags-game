import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from './history';

// reducerの登録
import sampleReducer from './Sample/reducer';
import cursorReducer from './Handtracking/reducer';
import speechReducer from './Speech/reducer';
import personReducer from './Person/reducer';
import exerciseReducer from './Exercise/reducer';
import quizReducer from './Quiz/reducer';
import insuranceReducer from './Insurance/reducer';
import scenesReducer from './Scenes/reducer';
import deviceStateReducer from './Device/reducer';
import skinReducer from './Skin/reducer';
import buttonReducer from './Button/reducer';
import omnikujiReducer from './Omnikuji/reducer';

import websocketReducer from './Websocket/reducer';
import { socketMiddleware } from './Websocket/saga';
// --

// saga の登録
import { watchGetMembers } from './Sample/saga';

import { watchGetSpeechStarted, watchGetSpeechSucceeded } from './Speech/saga';
import {
  watchDisableCursor,
  watchEmitHtmlEvents,
  watchMessageAction as HandtrackingMessageHandler,
  watchRouterActions,
} from './Handtracking/saga';

import {
  watchFinishSubway,
  watchMessageAction as ExerciseMessageHandler,
  watchStartSubway,
} from './Exercise/saga';

import {
  watchMessageAction as HandPointMessageHandler,
  watchButtonPoint,
  watchButtonPointForSleep,
  watchMessageAction2,
} from './Button/saga';

import { eventLogPostTask } from './Device/saga';
import { watchDigitalAvatarApi, watchHoroscopeApi } from './Omnikuji/saga';

const rootReducer = combineReducers({
  sample: sampleReducer,
  ws: websocketReducer,
  cursor: cursorReducer,
  speech: speechReducer,
  person: personReducer,
  exercise: exerciseReducer,
  quiz: quizReducer,
  insurance: insuranceReducer,
  scenes: scenesReducer,
  device: deviceStateReducer,
  skin: skinReducer,
  button: buttonReducer,
  omnikuj: omnikujiReducer,
  router: connectRouter(history),
});

const rootSaga = function* rootSaga() {
  yield all([
    fork(watchGetMembers),
    fork(watchGetSpeechStarted),
    fork(watchGetSpeechSucceeded),
    fork(watchEmitHtmlEvents),
    fork(watchDisableCursor),
    fork(watchRouterActions),
    fork(HandtrackingMessageHandler),
    fork(ExerciseMessageHandler),
    fork(HandPointMessageHandler),
    fork(watchButtonPoint),
    fork(watchButtonPointForSleep),
    fork(eventLogPostTask),
    fork(watchStartSubway),
    fork(watchFinishSubway),
    fork(watchHoroscopeApi),
    fork(watchDigitalAvatarApi),
    fork(watchMessageAction2), // just for interating UI by mouse
  ]);
};
// --

// middleware の登録
const sagaMiddleware = createSagaMiddleware();
const rootMiddleware = [
  socketMiddleware(process.env.WEBSOCKET_POSE_ENDPOINT, 'pose'), // for pose estimation API
  routerMiddleware(history),
  sagaMiddleware,
];
type RootState = ReturnType<typeof rootReducer>;

export {
  history,
  RootState,
  rootReducer,
  rootSaga,
  rootMiddleware,
  sagaMiddleware,
};
