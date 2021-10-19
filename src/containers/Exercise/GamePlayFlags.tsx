/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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

import EllipseBack from './assets/squat/ellipse_back.png';
import EllipseFoot from './assets/squat/ellipse_foot.png';
import useFootControl from '../../components/common/hook/useFootControl';
import { setTimeout } from 'timers';

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

  const maxProgress = [5, 5, 5];
  const currency = useSelector<RootState, number | undefined>(
    // (state) => console.log(state)
    (state) => state.exercise.data?.numPose
  );

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
  const [fail, setFail] = useState();
  const [image, setImage] = useState(roundPng);
  const [rndCommand, setRndCommand] = useState('');
  const [rndColorText, setRndColorText] = useState(2);
  const [startGame, setStartGame] = useState(false);
  const [think, setThink] = useState(false);
  const [avatarDistracts, setAvatarDistracts] = useState<any>(null);

  const addCounteProgress = () => {
    if (textCommand === 'Game Over') return;
    const sound = soundMap.get('Correct');
    if (sound) sound();
    setCounteProgress((prev) => prev + 1);
    // counteProgress + 1 >= maxProgress[round - 1] ? setPoints(() => Points + round + 1) : setPoints(() => Points + round);
  };
  const commandChange = (cm) => {
    if (seconds >= 2) {
      setTimeout(() => {
        setThink(false);
        // const rndCommand = cm[Math.floor(Math.random() * cm.length)];
        setRndCommand(() => {
          let rnd = cm[Math.floor(Math.random() * cm.length)];
          while (rnd === rndCommand) {
            rnd = cm[Math.floor(Math.random() * cm.length)];
          }
          return rnd;
        });
        // setRndCommand(() => textCommands.red_not_up);
      }, 900);
    }
  };
  const lossOfHeart = () => {
    console.log('Fail')
    setImage(FlagFail);
    setTextCommand('Fail');
    const sound = soundMap.get('Fail');
    if (sound) {
      sound();
    }
    setTimeout(() => {
      setWhiteFlag(() => 'down');
      setRedFlag(() => 'down');
      setImage(FlagStart);
      commandChange(flagsCommand.flagsDown);
    }, 2000);
    if (heart > 0) setHeart(() => heart - 1);
    else setFail(true);
  };

  useEffect(() => {
    if (!startGame) return;
    setTimeout(() => {
      setThink(true);
    }, 1000);
    console.log('rndCommand', rndCommand)
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
      setTimeout(() => {
        if (seconds > 2) {
          console.log(redFlag, whiteFlag, seconds);
          addCounteProgress();
          if (redFlag === 'down' && whiteFlag === 'down')
            commandChange(flagsCommand.flagsDown);
          if (redFlag === 'up' && whiteFlag === 'up')
            commandChange(flagsCommand.flagsUp);
          if (redFlag === 'down' && whiteFlag === 'up')
            commandChange(flagsCommand.redDownWhiteUp);
          if (redFlag === 'up' && whiteFlag === 'down')
            commandChange(flagsCommand.redUpWhiteDown);
        }
      }, 1500);
    }
  }, [rndCommand]);

  useEffect(() => {
    if (counteProgress > maxProgress[round - 1])
      setPoints(() => Points + round + 1);
    else setPoints(() => Points + round);
  }, [counteProgress]);

  const tick = useCallback(() => {
    if (!startGame) return;
    if (seconds <= 1 && round === 3) {
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
      setImage(FlagSucces);
      setTimeout(() => {
        dispatch(setCount(Points));
        dispatch(setResult('success'));
        history.push('success');
      }, 2000);
      return;
    }
    if (seconds === 1 && round < 3) {
      if (counteProgress < maxProgress[round - 1]) {
        setFail(true);
        return;
      }
      setThink(false);
      setStartGame(false);
      setTextCommand(() => '');
      setWhiteFlag(() => 'down');
      setRedFlag(() => 'down');
      setCounteProgress(() => 0);
      setSeconds(() => 20);
      setRound(() => round + 1);
    } else setSeconds(() => seconds - 1);
    dispatch(setBtnPoint(ButtonPoint.BLUR));
  }, [seconds]);

  useEffect(() => {
    if (
      textCommand === 'Fail' ||
      textCommand === 'Game Over' ||
      textCommand === ''
    )
      return;
    const sound = soundMap.get(textCommand);
    if (sound) sound();
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
    setImage(() => roundPng);
    setTimeout(() => {
      setImage(() => FlagStart);
      // dispatch(
      //   sendMessageAction({
      //     to: 'pose',
      //     message: {
      //       cmd: 'flag_restart',
      //       result: { event: 'flag', result: 2, score: 0.4, image: 'base64ed' },
      //     },
      //   })
      // );
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
    // const timer = setInterval(() => {
    //   dispatch(
    //     sendMessageAction({
    //       to: 'pose',
    //       message: {
    //         cmd: 'flag_restart',
    //         result: { event: 'flag', result: 0, score: 0.4, image: 'base64ed' },
    //       },
    //     })
    //   );
    // }, 1000);

    return () => {
      // clearInterval(timer);
      clearInterval(avatarInterval);
    };
  }, []);
  // useEffect(() => {
  //   dispatch(sendMessageAction({ to: 'pose', message: DEFAULT_COORDS }));
  // }, []);

  // const getPercent = useCallback((count: number = 0) => {
  //   return Math.floor((100 * count) / config.target.value);
  // }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  useEffect(() => {
    if (currency === undefined || currency === null) return;
    switch (textCommand) {
      case '':
        if (
          whiteFlag === 'down' &&
          redFlag === 'down' &&
          currency === 2 &&
          image === FlagStart
        ) {
          setImage(() => FlagsUp);
          setWhiteFlag(() => 'up');
          setRedFlag(() => 'up');
          commandChange(flagsCommand.flagsUp);
          setStartGame(true);
        }
        break;
      case textCommands.red_up:
        if (redFlag === 'down' && whiteFlag === 'down' && currency === 0) {
          setImage(() => RedUp);
          setRedFlag(() => 'up');
          commandChange(flagsCommand.redUpWhiteDown);
          addCounteProgress();
        } else if (redFlag === 'down' && whiteFlag === 'up' && currency === 2) {
          setImage(() => TopRedUp);
          setRedFlag(() => 'up');
          commandChange(flagsCommand.flagsUp);
          addCounteProgress();
        } else lossOfHeart();
        break;
      case textCommands.red_down:
        if (redFlag === 'up' && whiteFlag === 'down' && currency === 3) {
          setImage(() => RedDown);
          setRedFlag(() => 'down');
          commandChange(flagsCommand.flagsDown);
          addCounteProgress();
        } else if (redFlag === 'up' && whiteFlag === 'up' && currency === 1) {
          setImage(() => TopRedDown);
          setRedFlag(() => 'down');
          commandChange(flagsCommand.redDownWhiteUp);
          addCounteProgress();
        } else lossOfHeart();
        break;
      case textCommands.white_up:
        if (whiteFlag === 'down' && redFlag === 'down' && currency === 1) {
          setImage(() => WhiteUp);
          setWhiteFlag(() => 'up');
          commandChange(flagsCommand.redDownWhiteUp);
          addCounteProgress();
        } else if (whiteFlag === 'down' && redFlag === 'up' && currency === 2) {
          setImage(() => TopWhiteUp);
          setWhiteFlag(() => 'up');
          commandChange(flagsCommand.flagsUp);
          addCounteProgress();
        } else lossOfHeart();
        break;
      case textCommands.white_down:
        if (whiteFlag === 'up' && redFlag === 'down' && currency === 3) {
          setImage(() => WhiteDown);
          commandChange(flagsCommand.flagsDown);
          setWhiteFlag(() => 'down');
          addCounteProgress();
        } else if (whiteFlag === 'up' && redFlag === 'up' && currency === 0) {
          setImage(() => TopWhiteDown);
          setWhiteFlag(() => 'down');
          commandChange(flagsCommand.redUpWhiteDown);
          addCounteProgress();
        } else lossOfHeart();
        break;
      case textCommands.flags_up:
        if (whiteFlag === 'down' && redFlag === 'down' && currency === 2) {
          setImage(() => FlagsUp);
          setWhiteFlag(() => 'up');
          setRedFlag(() => 'up');
          commandChange(flagsCommand.flagsUp);
          addCounteProgress();
        } else lossOfHeart();
        break;
      case textCommands.flags_down:
        if (whiteFlag === 'up' && redFlag === 'up' && currency === 3) {
          setImage(() => FlagsDown);
          setWhiteFlag(() => 'down');
          setRedFlag(() => 'down');
          commandChange(flagsCommand.flagsDown);
          addCounteProgress();
        } else lossOfHeart();
        break;
      default:
        break;
    }
  }, [currency]);

  return (
    <>
      {/* <audio src={R_UpVoice} autoPlay ></audio> */}
      <Box className={classes.app_content}>
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
              display: `${think && startGame ? 'block' : 'none'}`,
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
          {image === roundPng ? (
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
                <Typography className="round-number">{round}</Typography>
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
            {round === 3 ? '' : textCommand}!
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
