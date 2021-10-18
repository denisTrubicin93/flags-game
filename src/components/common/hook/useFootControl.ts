import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCurrentPoint,
  setFootPoint,
} from '../../../features/Button/reducer';
import {
  ButtonPoint,
  FOOT_LIMIT_THRESHOLD,
} from '../../../features/Button/models';
import useSound from 'use-sound';
import beep from './assets/beep.mp3';
import back from './assets/back.mp3';
import quizVoice from './assets/voiceover_quiz.mp3';
import compatibilityVoice from './assets/voiceover_compatibility.mp3';
import exerciseVoice from './assets/voiceover_exercise.mp3';
import faceReadingVoice from './assets/voiceover_face-reading.mp3';
import horoscopeVoice from './assets/voiceover_horoscope.mp3';
import insuranceVoice from './assets/voiceover_insurance.mp3';
import skinVoice from './assets/voiceover_skin.mp3';
import temperatureVoice from './assets/voiceover_temperature.mp3';
import { useStateCallback } from './useStateCallback';
import { HookOptions, PlayFunction } from 'use-sound/dist/types';

export const MENU_NAME = Object.freeze({
  /** FINTESS_MENU: child_fitness */
  FINTESS_MENU: 'fitness',
  /** QUIZ_MENU: quiz */
  QUIZ_MENU: 'quiz',
  /** FLAG_MENU: flag */
  FLAG_MENU: 'flag',
  /** OMIKUJI_MENU: omikuji */
  OMIKUJI_MENU: 'omikuji',
  /** SKIN_CAPTURE_MENU: skinCapturePhoto */
  SKIN_CAPTURE_MENU: 'skinCapturePhoto',
  /** INSURANCE_DETECT_MENU: insuranceDetect */
  INSURANCE_DETECT_MENU: 'insuranceDetect',
  /** TEMPERATE_MENU: temperature */
  TEMPERATE_MENU: 'temperature',
  /** FACE_CAPTURE_MENU: faceCapturePhoto */
  FACE_CAPTURE_MENU: 'faceCapturePhoto',
  /** COMPATIBILITY_MENU: compatibility */
  COMPATIBILITY_MENU: 'compatibility',
});

export interface FootControlProps {
  intitialIndex?: number;
  actions?: Function[];
  goBack: () => void;

  menuNames?: string[];
}

const soundByMenu = () => {
  const soundMap = new Map<string, PlayFunction>();
  const defaultOptions: HookOptions = { volume: 0.5 };
  const [excerciseSoundVoice] = useSound(exerciseVoice, defaultOptions);
  const [quizSoundVoice] = useSound(quizVoice, defaultOptions);
  const [horoscopeSoundVoice] = useSound(horoscopeVoice, defaultOptions);
  const [skinSoundVoice] = useSound(skinVoice, defaultOptions);
  const [insuranceSoundVoice] = useSound(insuranceVoice, defaultOptions);
  const [temperatureSoundVoice] = useSound(temperatureVoice, defaultOptions);
  const [faceReadingSoundVoice] = useSound(faceReadingVoice, defaultOptions);
  const [compatibilitySoundVoice] = useSound(
    compatibilityVoice,
    defaultOptions,
  );

  soundMap.set(MENU_NAME.FINTESS_MENU, excerciseSoundVoice);
  soundMap.set(MENU_NAME.QUIZ_MENU, quizSoundVoice);
  soundMap.set(MENU_NAME.OMIKUJI_MENU, horoscopeSoundVoice);
  soundMap.set(MENU_NAME.SKIN_CAPTURE_MENU, skinSoundVoice);
  soundMap.set(MENU_NAME.INSURANCE_DETECT_MENU, insuranceSoundVoice);
  soundMap.set(MENU_NAME.TEMPERATE_MENU, temperatureSoundVoice);
  soundMap.set(MENU_NAME.FACE_CAPTURE_MENU, faceReadingSoundVoice);
  soundMap.set(MENU_NAME.COMPATIBILITY_MENU, compatibilitySoundVoice);
  return soundMap;
};

export default function useFootControl(props: FootControlProps) {
  const { intitialIndex = 0, actions = [], goBack, menuNames } = props;
  const [currentIndex, setCurrentIndex] =
    useStateCallback<number>(intitialIndex);
  const [firstLoad, setFirstLoad] = useState(false);
  const footPoint = useSelector(getCurrentPoint) as ButtonPoint;

  const soundMap = soundByMenu();
  const [playBeep] = useSound(beep, { volume: 0.5 });
  const [backPlay] = useSound(back, { volume: 0.5 });
  const dispatch = useDispatch();

  const playVoice = () => {
    const menuName = menuNames ? menuNames[currentIndex] : '';
    const sound = soundMap.get(menuName);
    if (sound) {
      sound();
    } else {
      playBeep();
    }
  };

  const next = () => {
    actions.length > 0 &&
      setCurrentIndex(
        currentIndex === actions.length - 1 ? 0 : currentIndex + 1,
        playVoice,
      );
  };

  const prev = () => {
    actions.length > 0 &&
      setCurrentIndex(
        currentIndex === 0 ? actions.length - 1 : currentIndex - 1,
        playVoice,
      );
  };

  const onTap = (index: number) => {
    console.log(actions[index])
    const onTap = actions[index];
    onTap();
  };

  const onHover = (index: number) => {
    setCurrentIndex(index, playVoice);
  };

  useEffect(() => {
    // make sure button point is blur when first load
    dispatch(setFootPoint(ButtonPoint.BLUR));
    setFirstLoad(true);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      switch (footPoint) {
        case ButtonPoint.L1:
          prev();
          break;
        case ButtonPoint.L2:
          next();
          break;
        case ButtonPoint.R1:
          backPlay();
          goBack();
          break;
        case ButtonPoint.R2:
          const onTap = actions[currentIndex];
          onTap && playBeep();
          onTap && onTap();
          break;
        default:
          break;
      }
    }

    const timeoutId = setTimeout(
      () => dispatch(setFootPoint(ButtonPoint.BLUR)),
      FOOT_LIMIT_THRESHOLD,
    );

    return function () {
      clearTimeout(timeoutId);
    };
  }, [footPoint]);

  return { currentIndex, onTap, onHover };
}
