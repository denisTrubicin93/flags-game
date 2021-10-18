import { all, put, takeEvery, fork, select, takeLatest, delay, call } from 'redux-saga/effects';
import {
  createHandByPosition,
  createHandByGesture,
  cancelChattering,
  updateButtonChanged,
  sendHandCursorEvents,
  getSideOfHandEventType,
  stickyToButton,
  resumeCursor,
  clearTargetElement,
} from './utils';

import {
  disableCursor,
  emitHtmlEvents,
  enableCursor,
  getCursor,
  isCursorEnable,
  updateHandState,
  updateHoverState,
  updateHoverTimestamp,
  suspendCursor as suspendCursorReducer,
  resumeCursor as resumeCursorReducer,
  isCursorSuspending,
} from './reducer';
import { CursorState, HandCursor, SideOfHandEventType } from './models';

import {
  messageAction,
  sendMessageAction,
} from './../Websocket/reducer';
import { DEFAULT_COORDS, HANDSIGN_ROUTER_DELAY, HAND_COORDS_LEFT, HAND_COORDS_RIGHT } from '../../containers/HandTracking/config';
import { SatelliteSharp } from '@material-ui/icons';
import { sendPointerCancel, sendPointerLeave, sendPointerOut, sendPointerUp } from './eventUtils';
import { RootState } from '..';
import { LOCATION_CHANGE } from 'connected-react-router';

function* runEmitHtmlEvents(action: ReturnType<typeof emitHtmlEvents>) {
  const state = yield select(getCursor);
  const nextState = sendHandCursorEvents(state, action.payload);
  // sendHandCursorEvents(state, nextState);

  yield put(updateHandState(nextState));
}

function* messageHandler(action: ReturnType<typeof messageAction>) {
  try {
    switch (action.payload.cmd) {
      case 'hand':
      case 'gesture':
        {
          const enable = yield select(isCursorEnable);
          if (!enable) break;

          const isSuspending = yield select(isCursorSuspending);
          if (isSuspending) break;

          const state = yield select(getCursor);
          let nextState =
            action.payload.cmd === 'hand'
              ? createHandByPosition(state, action.payload)
              : createHandByGesture(state, action.payload);

          nextState = stickyToButton(state, nextState);
          nextState = cancelChattering(state, nextState);
          nextState = updateButtonChanged(state, nextState);

          let event = getSideOfHandEventType(state, nextState);
          switch (event) {
            case SideOfHandEventType.NONE_TO_LEFT:
            case SideOfHandEventType.RIGHT_TO_LEFT:
              console.log('HAND_COORDS_LEFT');
              yield put(sendMessageAction({ to: 'pose', message: HAND_COORDS_LEFT }));
              break;
            case SideOfHandEventType.NONE_TO_RIGHT:
            case SideOfHandEventType.LEFT_TO_RIGHT:
              console.log('HAND_COORDS_RIGHT');
              yield put(sendMessageAction({ to: 'pose', message: HAND_COORDS_RIGHT }));
              break;
            case SideOfHandEventType.ANY_TO_NONE:
              // console.log('HAND_COORDS_DEFAULT');
              // yield put(sendMessageAction({ to: 'pose', message: DEFAULT_COORDS }));
              break;
            default:
              break;
          }
          yield put(emitHtmlEvents(nextState));

        }
        break;
      default:
        break;
    }
  } catch (error) {
    //
    console.log('error');
  }
}


function* handleDisableCursor(action: ReturnType<typeof disableCursor>) {
  const cursor = yield select((state: RootState) => state.cursor.hands.find((h: HandCursor) => h.isExist));
  if (cursor) {
    if (cursor.isDown) {
      sendPointerUp(cursor);
    }
    sendPointerCancel(cursor);
    sendPointerLeave(cursor);
    sendPointerOut(cursor);
  }
  put(updateHoverTimestamp(undefined));
  put(updateHoverState(false))
}


function* handleRouterActions() {
  let cursor: CursorState = yield select((state: RootState) => state.cursor);
  // suspend cursor
  yield put(suspendCursorReducer());
  yield put(updateHoverTimestamp(undefined));
  yield put(updateHoverState(false));
  yield delay(HANDSIGN_ROUTER_DELAY);
  cursor = yield select((state: RootState) => state.cursor);
  if (cursor.enable) {
    const nextState = resumeCursor(cursor);
    yield put(updateHandState(nextState));
  }
  yield put(resumeCursorReducer());
}

export function* watchRouterActions() {
  yield takeLatest(LOCATION_CHANGE, handleRouterActions);
}

export function* watchDisableCursor() {
  yield takeEvery(disableCursor, handleDisableCursor);
}

export function* watchEmitHtmlEvents() {
  yield takeEvery(emitHtmlEvents, runEmitHtmlEvents);
}

export default function* rootSaga() {
  yield all([fork(watchEmitHtmlEvents)]);
}

export function* watchMessageAction() {
  yield takeEvery(messageAction, messageHandler);
}
