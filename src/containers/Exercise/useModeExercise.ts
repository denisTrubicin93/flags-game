import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../features"

import SquatsIcon from './assets/5_Exercise_Instructions/squats.svg';
import KabeanaIcon from './assets/kabeana/KabeanaIcon.svg';
import BallStrikeIcon from './assets/ball_strike/BallStrikeIcon.svg';
import RunningIcon from './assets/5_Exercise_Instructions/running.svg';
import Running from './assets/7_Game_Play/BallCatch.png';

import { MODE_BALL_STRIKE, MODE_KABEANA, MODE_SQUAT, MODE_FLAG, MODE_RUNNING } from "../../features/Exercise/models";
import { sendMessageAction } from "../../features/Websocket/reducer";
import { Dispatch } from "redux";
import KabeanaInstructionIcon from './assets/kabeana/InstructionIcon.png';
import BallStrikeInstructionIcon from './assets/ball_strike/InstructionIcon.png';
import SquatInstructionIcon from './assets/squat/InstructionIcon.png';
import { ScenesState } from "../../features/Scenes/models";

const conf = {
  MODE_SQUAT: (dispatch: Dispatch<any>, scenesType: ScenesState["type"] = 'adult') => {
    const config = {
      name: 'スクワット',
      icon: `${SquatsIcon}`,
      message: scenesType === 'child' ? 'なんかいできるかな？' : '何回できるかな？',
      limit: {
        value: 2,
        decoration: scenesType === 'child' ? 'びょう' : '秒',
      },
      target: {
        value: 10,
        decoration: scenesType === 'child' ? 'かい以上' : '回以上',
      },
      exp: {
        success: 20,
        failure: 10,
      },
      calorie: {
        total: 1.7,
        unit: 0.1,
      },
      instruction: {
        icon: SquatInstructionIcon,
        context: scenesType === 'child' ? [
          'ゆっくりからだをたちいちからしゃがんで、したまでしゃがんだら、またもとのたちいちにもどってね！',
          'なんかいできるかな？',
        ] : [
          'ゆっくり体を立ち位置からしゃがんで、下までしゃがんだら、また元の立ち位置に戻ってね！',
          '何回できるかな？',
        ],
      },
      start: () => {
        dispatch(sendMessageAction(`
        `));
      },
      update: () => {
        //
      },
      finish: () => {
        dispatch(sendMessageAction(`
        `));
      },
    };
    return config;
  },
  MODE_FLAG: (dispatch: Dispatch<any>, scenesType: ScenesState["type"] = 'adult') => {
    const config = {
      name: '',
      icon: ``,
      message: '',
      limit: {
        value: 20,
        decoration: '',
      },
      target: {
        value: 10,
        decoration: scenesType === 'child' ? 'かい以上' : '回以上',
      },
      start: () => {
        dispatch(sendMessageAction(`
        `));
      },
      update: () => {
        //
      },
      finish: () => {
        dispatch(sendMessageAction(`
        `));
      },
    };
    return config;
  },
  MODE_BALL_STRIKE: (dispatch: Dispatch<any>, scenesType: ScenesState["type"] = 'adult') => {
    const config = {
      name: 'ボールキャッチ',
      icon: BallStrikeIcon,
      message: '何回キャッチできるかな？',
      limit: {
        value: 40,
        decoration: '秒',
      },
      target: {
        value: 40,
        decoration: '個以上',
      },
      exp: {
        success: 15,
        failure: 10,
      },
      calorie: {
        total: 2.0,
        unit: 0.2,
      },
      instruction: {
        icon: BallStrikeInstructionIcon,
        context: [
          '画面にランダムで表示されている',
          'まるい緑のボールをキャッチしてね！',
          '　　',
          '40個以上取れたら合格！',
          '　　',
          '赤いボールは減点になるから注意！',
        ],
      },
      start: () => {
        dispatch(sendMessageAction(`
        `));
      },
      update: () => {

      },
      finish: () => {
        dispatch(sendMessageAction(`
        `));
      },
    };
    return config;
  },
  MODE_KABEANA: (dispatch: Dispatch<any>, scenesType: ScenesState["type"] = 'adult') => {
    const config = {
      name: '壁穴ポーズ',
      icon: KabeanaIcon,
      message: '５秒以内で同じポーズ！',
      limit: {
        value: 40,
        decoration: '秒',
      },

      target: {
        value: 4,
        decoration: '回以上',
      },
      exp: {
        success: 30,
        failure: 10,
      },
      calorie: {
        total: 1.2,
        unit: 0.1,
      },
      instruction: {
        icon: KabeanaInstructionIcon,
        context: [
          '５秒以内に画面に表示されている',
          '白いアバターと同じポーズをしてね！',
          '　　',
          '４回以上出来たら合格！',
        ],
      },
      start: () => {
        dispatch(sendMessageAction(`
        `));
      },
      update: () => {

      },
      finish: () => {
        dispatch(sendMessageAction(`
        `));
      },
    };
    return config;
  },
  MODE_RUNNING: (dispatch: Dispatch<any>, scenesType: ScenesState["type"] = 'adult') => {
    const config = {
      name: scenesType === 'child' ? 'しょうがいぶつレース' : '障害物レース',
      icon: `${RunningIcon}`,
      message: 'ゴール：100コイン',
      limit: {
        value: 0,
        decoration: '',
      },
      target: {
        value: 0,
        decoration: 'ゴール：100コイン',
      },
      exp: {
        success: 30,
        failure: 10,
      },
      calorie: {
        total: 1.2,
        unit: 0.1,
      },
      instruction: {
        icon: `${Running}`,
        context: scenesType === 'child' ? [
          'からだを左右に動かして、',
          'しょうがいぶつをさけてね！',
          '　　',
          '100コインかくとくしたら',
          'だいせいこう！',

        ] : [
          '体を左右に動かして、',
          '障害物をさけてね！',
          '　　',
          '100コイン獲得したら',
          '成功！',
        ],
      },
      start: () => {
        dispatch(sendMessageAction(`
        `));
      },
      update: () => {

      },
      finish: () => {
        dispatch(sendMessageAction(`
        `));
      },
    };
    return config;
  },
};

export const useModeExercise = () => {
  const mode = useSelector<RootState, 'squat' | 'flag' | 'ball_strike' | 'kabeana' | 'running' | undefined>(state => state.exercise.mode);
  const dispatch = useDispatch();
  const scenesType = useSelector<RootState, ScenesState["type"]>((state) => state.scenes.type);

  let config = conf.MODE_SQUAT(dispatch, scenesType);

  switch(mode) {
    case MODE_SQUAT:
      config = conf.MODE_SQUAT(dispatch, scenesType);
      break;
    case MODE_FLAG:
      config = conf.MODE_FLAG(dispatch, scenesType);
      break;
    case MODE_BALL_STRIKE:
      config = conf.MODE_BALL_STRIKE(dispatch, scenesType);
      break;
    case MODE_KABEANA:
      config = conf.MODE_KABEANA(dispatch, scenesType);
      break;
    case MODE_RUNNING:
      config = conf.MODE_RUNNING(dispatch, scenesType);
      break;
    default:
      break;
  }

  return {mode, config, scenesType};
}
