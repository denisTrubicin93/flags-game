/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Box,
  Typography,
  Grid,
  Input,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { RootState } from '../../features';
import { setMode, setResult, setCount } from '../../features/Exercise/reducer';
import { useModeExercise } from './useModeExercise';
import { Pose } from '../../features/Exercise/models';

import { DEFAULT_COORDS } from '../HandTracking/config';
import { sendMessageAction } from '../../features/Websocket/reducer';
import { getPose } from '../../features/Exercise/reducer';
import { ButtonPoint } from '../../features/Button/models';
import { setBtnPoint } from '../../features/Button/reducer';

import RandW_DownVoice from './assets/flags/voiceover/red&white_down.mp3';
import RandW_NotDownVoice from './assets/flags/voiceover/red&white_NO_down.mp3';
import RandW_UpVoice from './assets/flags/voiceover/red&white_up.mp3';
import RandW_NotUpVoice from './assets/flags/voiceover/red&white_NO_up.mp3';
import R_DownVoice from './assets/flags/voiceover/red_down.mp3';
import R_NotDownVoice from './assets/flags/voiceover/red_NO_down.mp3';
import R_NotUpVoice from './assets/flags/voiceover/red_NO_up.mp3';
import R_UpVoice from './assets/flags/voiceover/red_up.mp3';
import W_DownVoice from './assets/flags/voiceover/white_down.mp3';
import W_NotDownVoice from './assets/flags/voiceover/white_NO_down.mp3';
import W_NotUpVoice from './assets/flags/voiceover/white_NO_up.mp3';
import W_UpVoice from './assets/flags/voiceover/white_up.mp3';
import FailAudio from './assets/flags/wrong-answer.mp3';
import CorrectAudio from './assets/flags/correct-answer.mp3';
import readyAudio from './assets/flags/readyUp-flag-raise.mp3';

import counterPointsBG from './assets/flags/counterPoints.png';
import BackGroundPng from './assets/squat/background.png';
import TimerPng from './assets/squat/timer.png';
import RoundsPng from './assets/flags/timer-rounds.png';
// import SquatAnimationGif from './assets/squat/squat-animation.gif';
import FlagStart from './assets/flags/flag.png';
import RedUp from './assets/flags/red-up.gif';
import RedDown from './assets/flags/red-down.gif';
import WhiteUp from './assets/flags/white-up.gif';
import WhiteDown from './assets/flags/white-down.gif';
import TopRedUp from './assets/flags/top-red-up.gif';
import TopRedDown from './assets/flags/top-red-down.gif';
import TopWhiteUp from './assets/flags/top-white-up.gif';
import TopWhiteDown from './assets/flags/top-white-down.gif';
import FlagsUp from './assets/flags/flags-up.gif';
import FlagsDown from './assets/flags/flags-down.gif';
import FlagFail from './assets/flags/flag-sad.gif';
import FlagSucces from './assets/flags/Flag-jumping.gif';
import CounterBG from './assets/flags/counterBackground.png';
import arrowUp from './assets/flags/arrow-up.png';
import readyText from './assets/flags/are-you-ready.png';
import roundPng from './assets/flags/round.png';
import thinkPng from './assets/flags/think.png';
import successRound from './assets/flags/success.png';

import EllipseBack from './assets/squat/ellipse_back.png';
import EllipseFoot from './assets/squat/ellipse_foot.png';
import useFootControl from '../../components/common/hook/useFootControl';
import { setTimeout } from 'timers';
import { numberLiteral } from '@babel/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .hide': `
        display:none;
      `,
      '& .background': `
        /* Background */

        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;

        opacity: 1.0;
        background: #FED777;
      `,
      '& .background .base': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;

        opacity: 0.6;
        background: url(${BackGroundPng}) no-repeat center;
      `,
      '& .points': `
        display:flex;
        position: absolute;
        width: 120px;
        height: 120px;
        right: 50px;
        top: 160px;
        border: 5px solid #000;
        border-radius: 20px;
        background: #FFD600;
        z-index: 10;
      `,
      '& .points .number': `
        color:#000;
        font-size:60px;
        text-align:center;
        font-weight: 800;
        margin:auto;
      `,
      '& .time-round': `

        position: absolute;
        width: 763px;
        height: 344px;
        left: 95px;
        top: 50px;
        background: url(${RoundsPng}) no-repeat center;
        z-index: 10;
      `,
      '& .time-round .numberSecond': `
        position: absolute;
        width: 180px;
        height: 260.44px;
        left: 82px;
        top: 41px;

        font-family: "Dosis";
        font-style: normal;
        font-weight: 800;
        font-size: 193px;
        line-height: 244px;
        text-align: center;
        letter-spacing: 0.05em;

        color: #FFFFFF;
        z-index: 10;
      `,
      '& .time-round .numberRound': `
        position: absolute;
        width: 90px;
        height: 130.44px;
        top: 93px;
        left: 340px;

        font-family: "Dosis";
        font-style: normal;
        font-weight: 800;
        font-size: 80px;
        line-height: 150px;
        text-align: center;
        letter-spacing: 0.05em;

        color: #000000;
        z-index: 10;
      `,
      '& .heart-block': `
        display:flex;
        position: absolute;
        width: 90px;
        height: 130.44px;
        top: 225px;
        left: 340px;
      `,
      '& .heart-block .heart-points': `
          font-size: 85px;
          color:red;
      `,
      '& .game_avatar': `
        position: absolute;
        width: 115%;
        height: 1416px;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-50%);
      `,
      '& .avatar-distracts': `
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 1080px;
        height: 400px;
        left: 50%;
        top: 60%;
        transform:translate(-50%,-50%);
      `,
      '& .avatar-distracts img': `
        width: 400px;
      `,
      '& .game_avatar .ready': `
        position: absolute;
        padding: 20px;
        left: 50%;
        top: 50%;
        width: 1000px;
        height:800px;
        transform:translate(-50%,-50%);
        z-index:20;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      `,
      '& .game_avatar .ready img': `
        position: absolute;
      `,
      '& .imgAvatar': `
        position:absolute;
        bottom: 0px;
        width:100%;
        z-index:10;
      `,
      '& .imgRound': `
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:100%;
        z-index:10;
      `,
      '& .round-number': `
        top: 57%;
        left: 50%;
        position: absolute;
        font-size: 150px;
        transform: translate(-50%, -10%);
        z-index: 12;
        font-weight: 800;
        color: #544e30;
      `,
      '& .game_avatar .avatar': `
        position: absolute;
        width: 856px;

        left: 0px;
        top: 0px;
        background: url(${''}) no-repeat center;
        background-size: 1560px;
        z-index: 10;
      `,
      '& .game_avatar .back': `
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 685px;
        height: 685px;
        background: url(${EllipseBack}) no-repeat center;
        background-size: 685px;
        opacity: 0.3;
        z-index: 5;

      `,
      '& .game_avatar .foot': `
        position: absolute;
        width: 471px;
        height: 81px;
        left: 50%;
        transform:translateX(-50%);
        bottom: 250px;
        background: url(${EllipseFoot}) no-repeat center;
        background-size: 471px 81px;
        z-index: 5;

      `,
      '& .commands': `
        position: absolute;
        width: 471px;
        height: 81px;
        left: 250px;
        bottom: 250px;
        border:10px solid #000;
        border-radius: 50px;
        background: #ffffff;
        z-index: 5;

      `,
      '& .commands .text-command': `
        color:#000;
        font-size:60px;
        text-align:center;
        font-weight:800;
      `,
      '& .counterProgress': `
        position:absolute;
        right: 150px;
        width: 275px;
        bottom: 160px;
        height: 275px;
        background: url(${CounterBG}) no-repeat center;
        background-size:contain;
        display:flex;
        z-index:5;
      `,
      '& .counterProgress .number-counte': `
        color:#ffffff;
        font-size:60px;
        text-align:center;
        margin:auto;
      `,
      '& .command-execution': `
        position: absolute;
        left:50%;
        transform:translateX(-50%);
        top: 500px;
        color:#000;
        font-size:100px;
        background: #ffffff;
        text-align:center;
        font-weight:800;
      `,
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '550px',
      },
      '& .MuiInputBase-root': {
        fontSize: '100px',
      },
    },
  })
);

export default function GamePlayFlags() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const listImagesFlags = [
    RedUp,
    RedDown,
    WhiteUp,
    WhiteDown,
    TopRedUp,
    TopRedDown,
    TopWhiteUp,
    TopWhiteDown,
    FlagsUp,
    FlagsDown,
  ];
  // const textCommands = {
  //   red_up: '赤上げて',
  //   white_up: '白上げて',
  //   red_down: '赤下げて',
  //   white_down: '白下げて',
  //   flags_up: '赤白上げて',
  //   flags_down: '赤白下げて',
  //   red_not_up: '赤上げない',
  //   white_not_up: '白上げない',
  //   red_not_down: '赤下げない',
  //   white_not_down: '白下げない',
  //   flags_not_up: '赤白上げない',
  //   flags_not_down: '赤白下げない',
  // };
  const textCommands = {
    red_up: 'red_up',
    white_up: 'white_up',
    red_down: 'red_down',
    white_down: 'white_down',
    flags_up: 'flags_up',
    flags_down: 'flags_down',
    red_not_up: '赤上げない',
    white_not_up: '白上げない',
    red_not_down: '赤下げない',
    white_not_down: '白下げない',
    flags_not_up: '赤白上げない',
    flags_not_down: '赤白下げない',
  };
  const flagsCommand = {
    flagsDown: [
      textCommands.red_up,
      textCommands.white_up,
      textCommands.flags_up,
      textCommands.flags_not_up,
      textCommands.red_not_up,
      textCommands.white_not_up,
    ],
    flagsUp: [
      textCommands.red_down,
      textCommands.white_down,
      textCommands.flags_down,
      textCommands.flags_not_down,
      textCommands.red_not_down,
      textCommands.white_not_down,
    ],
    redUpWhiteDown: [
      textCommands.red_down,
      textCommands.white_up,
      textCommands.red_not_down,
      textCommands.white_not_up,
    ],
    redDownWhiteUp: [
      textCommands.red_up,
      textCommands.white_down,
      textCommands.red_not_up,
      textCommands.white_not_down,
    ],
  };
  // red up
  const soundCommandsFlag = () => {
    const soundMap = new Map<string, PlayFunction>();
    const defaultOptions: HookOptions = { volume: 0.5 };
    const [readySound] = useSound(readyAudio, defaultOptions);
    const [RandW_DownSoundVoice] = useSound(RandW_DownVoice, defaultOptions);
    const [RandW_NotDownSoundVoice] = useSound(
      RandW_NotDownVoice,
      defaultOptions
    );
    const [RandW_UpSoundVoice] = useSound(RandW_UpVoice, defaultOptions);
    const [RandW_NotUpSoundVoice] = useSound(RandW_NotUpVoice, defaultOptions);
    const [R_DownSoundVoice] = useSound(R_DownVoice, defaultOptions);
    const [R_NotDownSoundVoice] = useSound(R_NotDownVoice, defaultOptions);
    const [R_NotUpSoundVoice] = useSound(R_NotUpVoice, defaultOptions);
    const [R_UpSoundVoice] = useSound(R_UpVoice, defaultOptions);
    const [W_DownSoundVoice] = useSound(W_DownVoice, defaultOptions);
    const [W_NotDownSoundVoice] = useSound(W_NotDownVoice, defaultOptions);
    const [W_NotUpSoundVoice] = useSound(W_NotUpVoice, defaultOptions);
    const [W_UpSoundVoice] = useSound(W_UpVoice, defaultOptions);
    const [FailSound] = useSound(FailAudio, defaultOptions);
    const [CorrectSound] = useSound(CorrectAudio, defaultOptions);

    // soundMap.set('赤上げて', R_UpSoundVoice);
    // soundMap.set('白上げて', W_UpSoundVoice);
    // soundMap.set('赤白上げて', RandW_UpSoundVoice);
    // soundMap.set('赤白上げない', RandW_NotUpSoundVoice);
    // soundMap.set('赤白下げて', RandW_DownSoundVoice);
    // soundMap.set('赤白下げない', RandW_NotDownSoundVoice);
    // soundMap.set('赤下げて', R_DownSoundVoice);
    // soundMap.set('赤下げない', R_NotDownSoundVoice);
    // soundMap.set('赤上げない', R_NotUpSoundVoice);
    // soundMap.set('白下げて', W_DownSoundVoice);
    // soundMap.set('白下げない', W_NotDownSoundVoice);
    // soundMap.set('白上げない', W_NotUpSoundVoice);
    // soundMap.set('白上げない', W_NotUpSoundVoice);
    soundMap.set('ready', readySound);
    soundMap.set('red_up', R_UpSoundVoice);
    soundMap.set('white_up', W_UpSoundVoice);
    soundMap.set('flags_up', RandW_UpSoundVoice);
    soundMap.set('赤白上げない', RandW_NotUpSoundVoice);
    soundMap.set('flags_down', RandW_DownSoundVoice);
    soundMap.set('赤白下げない', RandW_NotDownSoundVoice);
    soundMap.set('red_down', R_DownSoundVoice);
    soundMap.set('赤下げない', R_NotDownSoundVoice);
    soundMap.set('赤上げない', R_NotUpSoundVoice);
    soundMap.set('white_down', W_DownSoundVoice);
    soundMap.set('白下げない', W_NotDownSoundVoice);
    soundMap.set('白上げない', W_NotUpSoundVoice);
    soundMap.set('白上げない', W_NotUpSoundVoice);
    soundMap.set('Fail', FailSound);
    soundMap.set('Correct', CorrectSound);

    return soundMap;
  };
  const soundMap = soundCommandsFlag();

  const paramsList = [
    {
      id: 1,
      tc: textCommands.red_up,
      rf: 'down',
      wf: 'down',
      pose: 0,
      img: RedUp,
      set_rf: 'up',
      set_wf: 'down',
      flag_com: flagsCommand.redUpWhiteDown,
    },
    {
      id: 2,
      tc: textCommands.white_up,
      rf: 'down',
      wf: 'down',
      pose: 1,
      img: WhiteUp,
      set_rf: 'down',
      set_wf: 'up',
      flag_com: flagsCommand.redDownWhiteUp,
    },
    {
      id: 3,
      tc: textCommands.flags_up,
      rf: 'down',
      wf: 'down',
      pose: 2,
      img: FlagsUp,
      set_rf: 'up',
      set_wf: 'up',
      flag_com: flagsCommand.flagsUp,
    },
    {
      id: 4,
      tc: textCommands.red_up,
      rf: 'down',
      wf: 'up',
      pose: 2,
      img: TopRedUp,
      set_rf: 'up',
      set_wf: 'up',
      flag_com: flagsCommand.flagsUp,
    },
    {
      id: 5,
      tc: textCommands.white_down,
      rf: 'down',
      wf: 'up',
      pose: 3,
      img: WhiteDown,
      set_rf: 'down',
      set_wf: 'down',
      flag_com: flagsCommand.flagsDown,
    },
    {
      id: 6,
      tc: '',
      rf: 'down',
      wf: 'up',
      pose: 0,
      img: TopWhiteDown,
      set_rf: 'up',
      set_wf: 'down',
      flag_com: flagsCommand.redUpWhiteDown,
    },
    {
      id: 7,
      tc: textCommands.red_down,
      rf: 'up',
      wf: 'down',
      pose: 3,
      img: RedDown,
      set_rf: 'down',
      set_wf: 'down',
      flag_com: flagsCommand.flagsDown,
    },
    {
      id: 8,
      tc: textCommands.white_up,
      rf: 'up',
      wf: 'down',
      pose: 2,
      img: TopWhiteUp,
      set_rf: 'up',
      set_wf: 'up',
      flag_com: flagsCommand.flagsUp,
    },
    {
      id: 9,
      tc: '',
      rf: 'up',
      wf: 'down',
      pose: 1,
      img: TopRedDown,
      set_rf: 'down',
      set_wf: 'up',
      flag_com: flagsCommand.redDownWhiteUp,
    },
    {
      id: 10,
      tc: textCommands.white_down,
      rf: 'up',
      wf: 'up',
      pose: 0,
      img: TopWhiteDown,
      set_rf: 'up',
      set_wf: 'down',
      flag_com: flagsCommand.redUpWhiteDown,
    },
    {
      id: 11,
      tc: textCommands.red_down,
      rf: 'up',
      wf: 'up',
      pose: 1,
      img: TopRedDown,
      set_rf: 'down',
      set_wf: 'up',
      flag_com: flagsCommand.redDownWhiteUp,
    },
    {
      id: 12,
      tc: textCommands.flags_down,
      rf: 'up',
      wf: 'up',
      pose: 3,
      img: FlagsDown,
      set_rf: 'down',
      set_wf: 'down',
      flag_com: flagsCommand.flagsDown,
    },
  ];

  const maxProgress = [3, 3, 3];
  // const flagPose = useSelector<RootState, number | undefined>(
  //   // (state) => console.log(state)
  //   (state) => state.exercise.data?.numPose
  // );

  const pose = useSelector<RootState, Pose>(getPose);
  const gender = useSelector<RootState, 'male' | 'female' | 'unknown'>(
    (state: RootState) => state.person.profile.gender
  );
  const { mode, config } = useModeExercise();
  const [seconds, setSeconds] = React.useState(config.limit.value);
  const [heart, setHeart] = useState(3);
  const [round, setRound] = useState(1);
  const [redFlag, setRedFlag] = useState('down');
  const [whiteFlag, setWhiteFlag] = useState('down');
  const [Points, setPoints] = useState(-1);
  const [textCommand, setTextCommand] = useState('');
  const [counteProgress, setCounteProgress] = useState(0);
  const [fail, setFail] = useState<boolean>();
  const [image, setImage] = useState(roundPng);
  const [rndCommand, setRndCommand] = useState('');
  const [rndColorText, setRndColorText] = useState(2);
  const [startGame, setStartGame] = useState(false);
  const [think, setThink] = useState(false);
  const [avatarDistracts, setAvatarDistracts] = useState<any>(null);
  const [sound, setSound] = useState('');
  const [commandNotExecute, setCommandNotExecute] = useState<number | null>();
  const [timerRNDcommand, setTimerRNDcommand] = useState<any>();
  const [isPaused, setIsPaused] = useState(false);
  // const [flagPose, setFlagPose] = useState<number>();
  const [miliSeconds, setMiliSeconds] = useState<number | null | undefined>();
  const [checkHandsUp, setCheckHandsUp] = useState<boolean>();

  const addCounteProgress = () => {
    if (textCommand === 'Game Over') return;
    setSound(() => 'Correct');
    setCounteProgress((prev) => prev + 1);
  };
  const commandChange = (cm) => {
    if (seconds >= 2) {
      setTimeout(() => {
        setThink(false);
        setRndCommand(() => {
          let rnd = cm[Math.floor(Math.random() * cm.length)];
          while (rnd === rndCommand) {
            rnd = cm[Math.floor(Math.random() * cm.length)];
          }
          return rnd;
        });
      }, 900);
    }
  };
  const lossOfHeart = () => {
    setIsPaused(true);
    setImage(FlagFail);
    setTextCommand('Fail');
    setSound(() => 'Fail');
    setTimeout(() => {
      setIsPaused(false);
      setStartGame(false);
      setSound(() => 'ready');
      setTextCommand(() => '両手を上げて');
      setWhiteFlag(() => 'down');
      setRedFlag(() => 'down');
      setImage(FlagStart);
      // commandChange(flagsCommand.flagsDown);
    }, 2000);
    if (heart > 0) setHeart(() => heart - 1);
    else setFail(true);
  };

  const endRound = () => {
    setTextCommand(() => '');
    setImage(() => successRound);
    setTextCommand(() => '');
    setTimeout(() => {
      setStartGame(false);
      setWhiteFlag(() => 'down');
      setRedFlag(() => 'down');
      setCounteProgress(() => 0);
      setSeconds(() => 20);
      setRound(() => round + 1);
    }, 2000);
  };

  const checkingForCorrectAction = (correct: boolean) => {
    paramsList.forEach((el) => {
      if (redFlag === el.rf && whiteFlag === el.wf && flagPose === el.pose) {
        console.log(el.id,el.rf,el.wf, el.pose, correct)
        console.log( redFlag === el.rf, whiteFlag === el.wf, flagPose === el.pose, correct)
        if (correct && textCommand === el.tc) {
          setImage(() => el.img);
          setRedFlag(() => el.set_rf);
          setWhiteFlag(() => el.set_wf);
          commandChange(el.flag_com);
          addCounteProgress();
        } else {
          console.log('Fail!!!!')
          lossOfHeart();
        }
      }
    });
  };

  useEffect(() => {
    if (!startGame) return;
    setTimeout(() => {
      setThink(true);
    }, 1000);
    if (round === 2) setRndColorText(() => Math.round(Math.random()));
    else setRndColorText(() => 0);
    setTextCommand(() => rndCommand);
    if (
      rndCommand === textCommands.red_not_up ||
      rndCommand === textCommands.white_not_up ||
      rndCommand === textCommands.red_not_down ||
      rndCommand === textCommands.white_not_down ||
      rndCommand === textCommands.flags_not_down ||
      rndCommand === textCommands.flags_not_up
    ) {
      setCommandNotExecute(() => flagPose);
    }
  }, [rndCommand]);

  useEffect(() => {
    if (
      commandNotExecute === undefined ||
      commandNotExecute === null ||
      textCommand === '両手を上げて' ||
      textCommand === ''
    )
      return;
    if (commandNotExecute === flagPose) {
      setMiliSeconds(() => 2501);
    } else {
      setMiliSeconds(() => null);
      lossOfHeart();
    }
  }, [commandNotExecute, flagPose]);

  useEffect(() => {
    if (miliSeconds === null || !miliSeconds) return;
    if (miliSeconds === 1) {
      setCommandNotExecute(() => null);
      addCounteProgress();
      if (redFlag === 'down' && whiteFlag === 'down')
        commandChange(flagsCommand.flagsDown);
      if (redFlag === 'up' && whiteFlag === 'up')
        commandChange(flagsCommand.flagsUp);
      if (redFlag === 'down' && whiteFlag === 'up')
        commandChange(flagsCommand.redDownWhiteUp);
      if (redFlag === 'up' && whiteFlag === 'down')
        commandChange(flagsCommand.redUpWhiteDown);
    } else {
      setTimeout(() => {
        setMiliSeconds(() => {
          return miliSeconds - 500;
        });
      }, 500);
    }
  }, [miliSeconds]);

  useEffect(() => {
    if (counteProgress > maxProgress[round - 1])
      setPoints(() => Points + round + 1);
    else setPoints(() => Points + round);
  }, [counteProgress]);

  const tick = useCallback(() => {
    if (!startGame) return;
    if (seconds <= 0 && round === 3) {
      setTimerRNDcommand(() => clearTimeout(timerRNDcommand));
      if (counteProgress < maxProgress[round - 1]) {
        setFail(true);
        return;
      }
      dispatch(
        sendMessageAction({
          to: 'pose',
          message: {
            cmd: 'flag_stop',
          },
        })
      );
      setMiliSeconds(() => null);
      setImage(FlagSucces);
      setTimeout(() => {
        dispatch(setCount(Points));
        dispatch(setResult('success'));
        history.push('success');
      }, 2000);
      return;
    }
    if (seconds === 0 && round < 3) {
      setTimerRNDcommand(() => clearTimeout(timerRNDcommand));
      if (counteProgress < maxProgress[round - 1]) {
        setFail(true);
        return;
      }
      setMiliSeconds(() => null);
      endRound();
      setThink(false);
    } else if (!isPaused) {
      setSeconds(() => seconds - 1);
    }
    dispatch(setBtnPoint(ButtonPoint.BLUR));
  }, [seconds]);

  useEffect(() => {
    const soundPlay = soundMap.get(sound);
    if (soundPlay) soundPlay();
  }, [sound]);

  useEffect(() => {
    if (
      textCommand === 'Fail' ||
      textCommand === 'Game Over' ||
      textCommand === '両手を上げて' ||
      textCommand === ''
    )
      return;

    setSound(() => textCommand);
  }, [textCommand]);

  useEffect(() => {
    if (fail) {
      setImage(FlagFail);
      setTextCommand('Game Over');
      dispatch(
        sendMessageAction({
          to: 'pose',
          message: {
            cmd: 'flag_stop',
          },
        })
      );
      setTimeout(() => {
        dispatch(setCount(Points));
        dispatch(setResult('failure'));
        history.push('success');
      }, 2000);
    }
  }, [fail]);

  useEffect(() => {
    setTimeout(tick, 1000);
  }, [seconds]);

  useEffect(() => {
    if (startGame) {
      setSeconds(() => seconds - 1);
    }
  }, [startGame]);

  useEffect(() => {
    if (checkHandsUp) {
      if (flagPose === 2 && image === FlagStart) {
        setImage(() => FlagsUp);
        setWhiteFlag(() => 'up');
        setRedFlag(() => 'up');
        setTimeout(() => {
          commandChange(flagsCommand.flagsUp);
        }, 500);
        setStartGame(true);
      }
    }
    setCheckHandsUp(false);
  }, [checkHandsUp]);

  useEffect(() => {
    setImage(() => roundPng);
    setTimeout(() => {
      setSound(() => 'ready');
      setTextCommand(() => '両手を上げて');
      setImage(() => FlagStart);
      setCheckHandsUp(true);
    }, 2000);
  }, [round]);

  useEffect(() => {
    const avatarInterval = setInterval(() => {
      setAvatarDistracts(() => {
        return {
          number: Math.round(Math.random()),
          image:
            listImagesFlags[
              Math.round(Math.random() * listImagesFlags.length - 1)
            ],
        };
      });
    }, 2000);
    return () => {
      clearInterval(avatarInterval);
    };
  }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  useEffect(() => {
    if (flagPose === undefined || flagPose === null) return;
    switch (textCommand) {
      case '':
      case '両手を上げて':
        if (
          whiteFlag === 'down' &&
          redFlag === 'down' &&
          flagPose === 2 &&
          image === FlagStart
        ) {
          setImage(() => FlagsUp);
          setWhiteFlag(() => 'up');
          setRedFlag(() => 'up');
          setTimeout(() => {
            commandChange(flagsCommand.flagsUp);
          }, 500);
          setStartGame(true);
        }
        break;
      case textCommands.red_up:
        if (flagPose === 2 || flagPose === 0) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      case textCommands.red_down:
        if (flagPose === 3 || flagPose === 1) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      case textCommands.white_up:
        if (flagPose === 2 || flagPose === 1) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      case textCommands.white_down:
        if (flagPose === 3 || flagPose === 0) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      case textCommands.flags_up:
        if (flagPose === 2) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      case textCommands.flags_down:
        if (flagPose === 3) {
          checkingForCorrectAction(true);
        } else checkingForCorrectAction(false);
        break;
      default:
        break;
    }
  }, [flagPose]);

  return (
    <>
      {/* <audio src={R_UpVoice} autoPlay ></audio> */}
      <Box className={classes.app_content}>
        {/* <Box>
          <Button onClick={() => setFlagPose(0)} variant="contained">
            0
          </Button>
          <Button onClick={() => setFlagPose(1)} variant="contained">
            1
          </Button>
          <Button onClick={() => setFlagPose(2)} variant="contained">
            2
          </Button>
          <Button onClick={() => setFlagPose(3)} variant="contained">
            3
          </Button>
        </Box> */}
        <Box className="background">
          <Box className="base" />
        </Box>
        <Box className="points">
          <Typography className="number"> {Points} </Typography>
        </Box>

        <Box className="time-round">
          <Typography className="numberSecond">{seconds}</Typography>
          <Typography className="numberRound">{round}</Typography>
          <Box className="heart-block">
            <Typography className="heart-points">
              {heart > 0 ? '❤' : ''}
            </Typography>
            <Typography className="heart-points">
              {heart > 1 ? '❤' : ''}
            </Typography>
            <Typography className="heart-points">
              {heart > 2 ? '❤' : ''}
            </Typography>
          </Box>
        </Box>

        <Box className="game_avatar">
          <Box className="avatar" />
          <Box
            className="avatar-distracts"
            style={{ display: `${round === 3 && startGame ? 'flex' : 'none'}` }}
          >
            <img
              src={avatarDistracts?.image}
              alt=""
              style={{
                opacity: `${avatarDistracts?.number === 0 ? '1' : '0'}`,
              }}
            />
            <img
              src={avatarDistracts?.image}
              alt=""
              style={{
                opacity: `${avatarDistracts?.number === 1 ? '1' : '0'}`,
              }}
            />
          </Box>
          <Box
            className="ready"
            style={{
              display: `${
                think && startGame && seconds > 0 ? 'block' : 'none'
              }`,
              animation: 'fadeIn 1s',
            }}
          >
            <img
              src={thinkPng}
              alt=""
              style={{
                top: '-110px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
              }}
            />
          </Box>
          <Box
            className="ready"
            style={{
              display: `${startGame || image === roundPng ? 'none' : 'block'}`,
              animation: `${
                startGame || image === roundPng ? 'none' : 'fadeIn 1s'
              }`,
            }}
          >
            <img
              src={readyText}
              alt=""
              style={{
                top: '-110px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
              }}
            />
            <img
              src={arrowUp}
              alt=""
              style={{
                top: '50%',
                left: '0',
                transform: 'translateY(-50%) scaleY(2)',
                animation: 'arrow-up 1s infinite',
                width: '150px',
              }}
            />
            <img
              src={arrowUp}
              alt=""
              style={{
                top: '50%',
                right: '0',
                transform: 'translateY(-50%) scaleY(2)',
                animation: 'arrow-up 1s infinite',
                width: '150px',
              }}
            />
          </Box>
          {image === roundPng || image === successRound ? (
            <>
              <Box
                className="imgRound"
                style={{ animation: 'scaleInOut 2.2s' }}
              >
                <img
                  src={image}
                  className="imgRound"
                  style={{ width: '50%' }}
                />
                <Typography
                  className="round-number"
                  style={{
                    display: `${image === successRound ? 'none' : 'block'}`,
                  }}
                >
                  {round}
                </Typography>
              </Box>
            </>
          ) : (
            <img src={image} className="imgAvatar" />
          )}
          <Box className="back" />
          <Box className="foot" />
        </Box>
        <Box
          className="commands"
          style={{
            backgroundColor: `${round > 1 ? '#000' : '#fff'}`,
            borderColor: `${round > 1 ? '#fff' : '#000'}`,
          }}
        >
          <Typography
            className="text-command"
            style={{
              color: `${
                round > 1 && textCommand !== ''
                  ? rndColorText === 1
                    ? 'red'
                    : 'white'
                  : '#000'
              }`,
            }}
          >
            {!startGame && image === FlagStart
              ? '両手を上げて'
              : round === 3
              ? ''
              : textCommand}
            !
          </Typography>
        </Box>
        <Box className="counterProgress">
          <Typography className="number-counte">
            {counteProgress}/{maxProgress[round - 1]}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export { GamePlayFlags };
