import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features';

import { useModeExercise } from './useModeExercise';
import {
  Pose,
} from '../../features/Exercise/models';
import { DEFAULT_COORDS } from '../HandTracking/config';
import { sendMessageAction } from '../../features/Websocket/reducer';
import { getPose, setResult } from '../../features/Exercise/reducer';

import { ButtonPoint } from '../../features/Button/models';
import { setBtnPoint } from '../../features/Button/reducer';


import BackGroundPng from './assets/squat/background.png';
import TimerPng from './assets/squat/timer.png';
import CounterPng from './assets/squat/counter.png';
// import SquatAnimationGif from './assets/squat/squat-animation.gif';
import SquatStart from './assets/squat/squat-start.png';
import Squat1 from './assets/squat/squat-1.gif';
import Squat2 from './assets/squat/squat-2.gif';
import Squat3 from './assets/squat/squat-3.gif';
import Squat4 from './assets/squat/squat-4.gif';
import Squat5 from './assets/squat/squat-5.gif';
import Squat6 from './assets/squat/squat-6.gif';
import Squat7 from './assets/squat/squat-7.gif';
import Squat8 from './assets/squat/squat-8.gif';
import Squat9 from './assets/squat/squat-9.gif';
import Squat10 from './assets/squat/squat-10.gif';
import SquatSucces from './assets/squat/squat-end.gif';

import EllipseBack from './assets/squat/ellipse_back.png';
import EllipseFoot from './assets/squat/ellipse_foot.png';
import useFootControl from '../../components/common/hook/useFootControl';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
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
      '& .timer': `
        position: absolute;
        width: 765px;
        height: 217px;
        left: 173px;
        top: 47px;
        background: url(${TimerPng}) no-repeat center;
        z-index: 10;
      `,
      '& .timer .number': `
        position: absolute;
        font-family: "Dosis";
        font-style: normal;
        font-weight: 800;
        font-size: 105px;
        line-height: 130px;
        text-transform: uppercase;
        color: #000000;
        left: 480px;
        top: 55px;
        width: 130px;
        height:130px;
        z-index: 10;
        text-align: center;
      `,
      '& .counter': `
        position: absolute;
        width: 763px;
        height: 344px;
        left: 95px;
        top: 1534px;
        background: url(${CounterPng}) no-repeat center;
        z-index: 10;
      `,
      '& .counter .number': `
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
      '& .game_avatar': `
        position: absolute;
        width: 856px;
        height: 1416px;
        left: 0px;
        top: 250px;
      `,
      '& .imgAvatar': `
        position:absolute;
        width:130%;
        z-index:10;
      `,
      '& .game_avatar .avatar': `
        position: absolute;
        width: 856px;
        height: 1416px;
        left: 0px;
        top: 0px;
        background: url(${''}) no-repeat center;
        background-size: 1560px;
        z-index: 10;
      `,
      '& .game_avatar .back': `
        position: absolute;
        top: 356px;
        left: 250px;
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
        left: 250px;
        top: 1250px;
        background: url(${EllipseFoot}) no-repeat center;
        background-size: 471px 81px;
        z-index: 5;

      `,
    },
  })
);

export default function GamePlaySquat() {
  const classes = useStyles();
  const history = useHistory();
  const counts = useSelector<RootState, number | undefined>(
    (state) => state.exercise.data?.counts
  );
  const dispatch = useDispatch();
  const pose = useSelector<RootState, Pose>(getPose);
  const gender = useSelector<RootState, "male" | "female" | "unknown">((state: RootState) => state.person.profile.gender);
  const { mode, config } = useModeExercise();
  const [seconds, setSeconds] = React.useState(config.limit.value);
  const tick = useCallback(() => {
    // if(seconds === 10 || seconds === 5){
    //   dispatch(sendMessageAction({
    //     to: 'pose',
    //     message: {
    //       cmd: 'squat_restart'
    //     },
    //   }));
    // }
    if (seconds === 1) {
      dispatch(sendMessageAction({
        to: 'pose',
        message: {
          cmd: 'squat_stop'
        },
      }));
      setTimeout(() => {
        dispatch(setResult('success'));
        history.push('success');
      }, 200);
    } else setSeconds(seconds - 1);
    dispatch(setBtnPoint(ButtonPoint.BLUR));
  }, [seconds]);

  useEffect(() => {
    setTimeout(tick, 1000);
  }, [seconds]);

  useEffect(() => {
    dispatch(sendMessageAction({ to: 'pose', message: DEFAULT_COORDS }));
  }, []);

  const getPercent = useCallback((count: number = 0) => {
    return Math.floor((100 * count) / config.target.value);
  }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  const [image, setImage] = useState(SquatStart)

  // const [show, setShow] = useState(false)

  useEffect(() => {
    switch (counts){
      case 1:
        setImage(() => Squat1)
        break
      case 2:
        setImage(() => Squat2)
        break
      case 3:
        setImage(() => Squat3)
        break
      case 4:
        setImage(() => Squat4)
        break
      case 5:
        setImage(() => Squat5)
        break
      case 6:
        setImage(() => Squat6)
        break
      case 7:
        setImage(() => Squat7)
        break
      case 8:
        setImage(() => Squat8)
        break
      case 9:
        setImage(() => Squat9)
        break
      case 10:
        setImage(() => Squat10)
        setTimeout(() => {
          setImage(() => SquatSucces)
        }, 1000);
        break
      default:
        break
    }
    // if (counts === 1) {
    //   setImage(() => Squat2)
    // }
    // if (counts === 2) {
    //   setImage(() => CounterPngNewTo)
    // }
    // setShow(true)
    // setTimeout(() => setShow(false), 1000)
  }, [counts])
  // {show ? <img src={image} /> : }
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="base" />
        </Box>
        <Box className="timer">
          <Typography className="number">
            {seconds}
          </Typography>
        </Box>
        <Box className="counter">
          <Typography className="number">
            {counts}
          </Typography>
        </Box>
        <Box className="game_avatar">
          <Box className="avatar" />
          <img src={image} className="imgAvatar" />
          <Box className="back" />
          <Box className="foot" />
        </Box>
      </Box>
    </>
  );
}

export { GamePlaySquat };
