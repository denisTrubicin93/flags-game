import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import omikujiAPI from '../../service/OmikujiService';
import {
  BloodType,
  HoroscopeResponse,
  HoroscopeResult,
  HoroscopeType,
  SubcontentType,
} from './models';
import {
  setLoading,
  submitDigitalAvatar,
  submitDigitalAvatarError,
  submitDigitalAvatarSuccess,
  submitHoroscope,
  submitHoroscopeError,
  submitHoroscopeSuccess,
} from './reducer';
var parseStringPromise = require('xml2js').parseStringPromise;
import { DeviceService } from '../../service/DeviceService';
import { addContent } from '../../service/DigitalAvatarService';

const callHoroscopeApiAsync = async (
  subcontentType: string,
  blood: string,
  birth: string
): Promise<HoroscopeResponse> => {
  const response = await omikujiAPI({ subcontentType, blood, birth });
  const parseData: HoroscopeResponse = await parseStringPromise(response.data);
  return parseData;
};

function* submitHoroscopeApi(
  action: PayloadAction<{ blood: BloodType; birth: HoroscopeType }>
) {
  try {
    const subcontentType = [
      SubcontentType.Work.toString(),
      SubcontentType.Relationships.toString(),
      SubcontentType.Money.toString(),
      SubcontentType.Love.toString(),
      SubcontentType.Health.toString(),
    ];
    const { blood, birth } = action.payload;

    const data: HoroscopeResponse[] = yield all(
      subcontentType.map((type) =>
        call(callHoroscopeApiAsync, type, blood.toString(), birth.toString())
      )
    );

    yield put(
      submitHoroscopeSuccess(
        data.map((d) => ({
          data: d.psychology.result[0].comment[0],
          subContentType: d.psychology.result[0].$.subContentType,
        }))
      )
    );
  } catch (err) {
    yield put(submitHoroscopeError('エラー占い結果取得失敗！'));
  } finally {
    yield put(setLoading(false));
  }
}

const callDigitalAvatarApiAsync = async (content: any): Promise<string> => {
  const response = await addContent(content);
  return response.data.recordId;
};

function* submitDigitalAvatarApi(action: PayloadAction<HoroscopeResult[]>) {
  try {
    const types = action.payload;
    const content = {
      points: 20,
      mirrorID: DeviceService.default().deviceId(),
      contentID: 'omikuji',
      coins: 20,
      content: JSON.stringify(
        types.map((type) => {
          return { title: type.title, data: type.data };
        })
      ),
    };
    const data: string = yield call(callDigitalAvatarApiAsync, content);
    yield put(submitDigitalAvatarSuccess(data));
  } catch (err) {
    yield put(submitDigitalAvatarError('エラー占い結果取得失敗！'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* watchHoroscopeApi() {
  yield takeLatest(submitHoroscope.type, submitHoroscopeApi);
}

export function* watchDigitalAvatarApi() {
  yield takeLatest(submitDigitalAvatar, submitDigitalAvatarApi);
}
