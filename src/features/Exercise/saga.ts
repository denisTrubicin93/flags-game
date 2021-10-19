import { call, delay, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { messageAction, sendMessageAction } from '../Websocket/reducer';
import { MODE_BALL_STRIKE, MODE_KABEANA, MODE_SQUAT,  MODE_FLAG } from './models';
import { addCount,  finishSubway, getCount, getMode, nextKabeanaPose, setCount, setImage, setIsLower, setNumPose, setPose, startSubway } from './reducer';
import axios from 'axios';

function* messageHandler(action: ReturnType<typeof messageAction>) {
  // console.log(action.payload)
  try {
    switch (action.payload.cmd) {
      case 'event':
        {
          const mode = yield select(getMode);
          if (!mode) break;

          const result = action.payload.result;
          // console.log(result.event);
          if (result.event === MODE_SQUAT) {
            if (result.result) {
              yield put(addCount(1));
            }
            yield put(setIsLower(result.is_lower));
            yield put(setImage(result.image));
          }
          if (result.event === MODE_FLAG) {
            if (result.result !== null){
              yield put(setNumPose(result.result));
              yield put(setImage(result.image));
            }
          }
          if (result.event === MODE_KABEANA) {
            if (result.result) {
              yield put(addCount(1));
              yield put(nextKabeanaPose());
            }
            yield put(setImage(result.image));
          }
          if (result.event === MODE_BALL_STRIKE) {
            yield put(addCount(result.result as number));
            yield put(setImage(result.image));
          }
        }
        break;
      case 'hand':
        {
          const result = action.payload.result;
          yield put(setPose(result.pose));
        }
        break;
      default:
        break;
    }
  } catch (error) {
    //
    console.log('error: ', error);
  }
}

export function* watchMessageAction() {
  yield takeEvery(messageAction, messageHandler);
}

const requestGetCoinCountApi = () => {
  const url = 'http://localhost:5000/get_score'
  return axios.get(url, { responseType: 'json'}).then((response) => {
    const score = response.data.score;
    return score;
  })
  .catch((error) => {
    console.error(error);
    return 0;
  })
}

function* startSubwayHandler() {
  console.debug('startSubwayHandler')
  try {
    yield put(
      sendMessageAction(
      {
        to: 'pose',
        message: {
          cmd: 'squat_stop',
        }
      }
    ));
    yield delay(1000);
    yield put(
      sendMessageAction(
      {
        to: 'pose',
        message: {
          cmd: 'subway_start',
        }
      }
    ));
  } catch (error) {
    console.error('error: ', error);
  }
}

export function* watchStartSubway() {
  yield takeEvery(startSubway, startSubwayHandler);
}

function* finishSubwayHandler() {
  console.debug('finishSubwayHandler');
  try {
    yield put(
      sendMessageAction(
      {
        to: 'pose',
        message: {
          cmd: 'subway_finish',
        }
      }
    ));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFinishSubway() {
  yield takeEvery(finishSubway, finishSubwayHandler);
}
