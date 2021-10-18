/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as reactSweetProgress from 'react-sweet-progress';
import Unity, { UnityContent } from 'react-unity-webgl';
import { RequestHelpBtn, PrevBtn } from '../../components/common/button';
import Card from '../../components/common/card/Card';
import LeftCard from '../../components/common/card/leftCard/LeftCard';
import GameProgress from './assets/7_Game_Play/GameProgess.png';
import { RootState } from '../../features';

import InnerCircle from './assets/7_Game_Play/InnerCircle.inline.svg';
import OuterCircle from './assets/7_Game_Play/OuterCircle.inline.svg';
import StatusBase from './assets/7_Game_Play/StatusBase.inline.svg';
import { useModeExercise } from './useModeExercise';
import {
  MODE_BALL_STRIKE,
  MODE_KABEANA,
  MODE_SQUAT,
  Pose,
} from '../../features/Exercise/models';
import { KabeanaPose } from './KabeanaPose';
import { KabeanaImg } from './assets/kabeana/pose';
import { Squat } from './Squat';
import SkeletonImg from './assets/0_Common/skeleton.png';
import { DEFAULT_COORDS } from '../HandTracking/config';
import { sendMessageAction } from '../../features/Websocket/reducer';
import { getPose } from '../../features/Exercise/reducer';

const squatContent = new UnityContent(
  '../assets/unity/squat/squat.json',
  '../assets/unity/UnityLoader.js'
);

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

        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
        border-radius: 70px;
      `,
      '& .vector': `
        /* Vector */

        position: absolute;
        left: 90px;
        top: 66px;
      `,
      '& .request_help': `
        /* Request_Help */

        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
      `,
      '& .text_hello': `
        position: absolute;
        width: 200px;
        height: 22px;
        left: 90px;
        top: 209px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 22px;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
      `,
      '& .text_welcome': `
        position: absolute;
        width: 594px;
        height: 40px;
        left: 90px;
        top: 274px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 900;
        font-size: 66px;
        line-height: 40px;

        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
      `,
      '& .game_progress': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 63.85%;

        background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        border-radius: 20px;
      `,
      '& .game_progress .timer': `
        position: absolute;
        left: 152px;
        top: 56px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .game_progress .description': `
        position: absolute;
        left: 231px;
        top: 171px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        line-height: 36px;
        text-align: center;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .game_progress .gauge': `
        position: absolute;
        top: 11px;
        left: 626px;
        height: 250px;
        width: 250px;
      `,
      '& .base': `
        position: absolute;
        width: 1080px;
        height: 1134px;
        left: 0px;
        top: 786px;
      `,
      '& .base-opacity': `
        position: absolute;
        width: 1080px;
        height: 1134px;
        left: 0px;
        top: 786px;
        background: linear-gradient(180deg, #0C0D0F 0%, rgba(65, 60, 60, 0) 100%);
        opacity: 1.0;
        border-radius: 70px 70px 0px 0px;
      `,
      '& .base .skeleton': `
        position: absolute;
        top: 48px;
        height: 708px;
        width: 90%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0);
        -webkit-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
      `,
      '& .base .status': `
        position: absolute;
        width: 895px;
        height: 252px;
        left: 65px;
        top: 807px;
      `,
      '& .base .status-opacity': `
        position: absolute;
        width: 895px;
        height: 252px;
        left: 65px;
        top: 807px;
        opacity: 0.74;
      `,
      '& .base .status .icon': `
        position: absolute;
        top: 32px;
        left: 48px;
      `,
      '& .base .status .label': `
        position: absolute;
        top: 50%;
        left: 45%;
        margin-right: -45%;
        transform: translate(-45%, -50%);
        -webkit-transform: translate(-45%, -50%);
        -ms-transform: translate(-45%, -50%);

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 70px;

        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .base .status .counter': `
        position: absolute;
        width: 316px;
        height: 316px;
        left: 640px;
        top: -32px;
      `,
      '& .base .status .counter .number': `
          position: absolute;
          width: 171px;
          height: 182px;
          top: 46%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          -webkit- transform: translateY(-50%) translateX(-50%);
          font-family: Noto Sans JP;
          font-style: normal;
          font-weight: bold;
          font-size: 150px;
          line-height: 182px;

          text-align: center;
          letter-spacing: -0.04em;

          color: #FFFFFF;

          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .base .status .counter .outer_circle': `
        position: absolute;
        left: 0px;
        top: 0;
      `,
      '& .base .status .counter .inner_circle': `
        /* Vector */
        position: absolute;
        left: 50px;
        top: 50px;
      `,
    },
    progress: {
      display: 'inline-block',
      position: 'absolute',
      '& .react-sweet-progress': `
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
            align-items: center;
        -ms-flex-pack: center;
            justify-content: center;
        width: 100%;
      `,
      '& .react-sweet-progress-symbol': `
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
            align-items: center;
        -ms-flex-pack: start;
            justify-content: flex-start;
        width: 35px;
        height: 20px;
        padding-left: 10px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 200; `,
      '& .react-sweet-progress-symbol-absolute': `
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-flex-align: center;
            align-items: center;
        -ms-flex-pack: center;
            justify-content: center;
        transform: translate3d(-50%, -50%, 0); `,
      '& .react-sweet-progress-symbol-absolute .react-sweet-progress-symbol': `
          padding: 0;
          width: 100%; `,
      '& .react-sweet-progress-circle-outer': `
        position: relative;
        display: block;
        vertical-align: middle;
      `,
      '& .react-sweet-progress-line': `
        width: 100%;
        border-radius: 100px;
        background-color: #efefef;
        vertical-align: middle; `,
      '& .react-sweet-progress-line-inner': `
          position: relative;
          min-height: 10px;
          border-radius: 100px;
          transition: width 0.3s ease; `,
      '& .react-sweet-progress-line-inner-status-active:before': `
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 10px;
        background: #fff;
        animation: active-anim 2s cubic-bezier(0.25, 1, 0.6, 1) infinite;
        content: "";
        opacity: 0; `,

      '& @keyframes active-anim': `
        0% {
          width: 0;
          opacity: .1; }
        20% {
          width: 0;
          opacity: .5; }
        to {
          width: 100%;
          opacity: 0; }
      `,
      '& .react-sweet-progress-circle path': `
        stroke-linecap: round;
      `,
    },
    progressSymbol: {
      color: '#FFFFFF !important',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontFamily: 'Noto Sans JP',
      fontSize: '22px',
      lineHeight: '32px',
      textAlign: 'center',
      letterSpacing: '0.5px',
    },
    unityView: {
      maxHeight: '640px',
      background: 'transparent !important',
      '& canvas': {
        borderRadius: '40px',
      },
    },
  })
);

export default function GamePlay() {
  const classes = useStyles();
  const history = useHistory();
  // const counts = useSelector<RootState, number | undefined>(state => state.exercise.data?.counts);
  const [counts, setCounts] = useState<number>(0);
  const image = useSelector<RootState, string | undefined>(
    (state) => state.exercise.data?.image
  );
  const dispatch = useDispatch();
  const pose = useSelector<RootState, Pose>(getPose);

  const { mode, config } = useModeExercise();
  const [unityLoaded, setUnityLoaded] = useState(false);
  const [seconds, setSeconds] = React.useState(config.limit.value);
  const tick = useCallback(() => {
    if (seconds === 1) {
      history.push('caloriesBurnt');
    } else setSeconds(seconds - 1);
  }, [seconds]);

  useEffect(() => {
    if (!unityLoaded) return;
    setTimeout(tick, 1000);
  }, [seconds]);

  useEffect(() => {
    dispatch(sendMessageAction({ to: 'pose', message: DEFAULT_COORDS }));
  }, []);

  useEffect(() => {
    if (unityLoaded) setTimeout(tick, 2000);
  }, [unityLoaded]);

  useEffect(() => {
    if (!unityLoaded) return;
    switch (mode) {
      case 'squat':
        squatContent.send(
          'GameController',
          'ReceiveCoordinates',
          JSON.stringify(pose)
        );
        break;
      default:
        break;
    }
  }, [mode, pose, unityLoaded]);

  useEffect(() => {
    setUnityLoaded(false);
    switch (mode) {
      case 'squat':
        // eslint-disable-next-line no-lone-blocks
        {
          squatContent.on('loaded', () => {
            // Unityのロード画面をスキップするために遅らせる
            // setTimeout(() => setUnityLoaded(true), 2000);
            // Unity書き出し時の設定でロード画面は消せる
            setUnityLoaded(true);
          });
          squatContent.on('SendScore', (value: number) => {
            setCounts(value);
          });

          squatContent.on('debug', (message: string) => {
            console.log('debug: ', message);
          });

          squatContent.on('error', (message: string) => {
            console.log('error: ', message);
          });
        }
        break;
      default:
        setUnityLoaded(true);
        squatContent.on('Result', () => { });
        break;
    }
  }, [mode]);

  const getPercent = useCallback((count = 0) => {
    return Math.floor((100 * count) / config.target.value);
  }, []);

  const getStatus = useCallback((count = 0) => {
    const percent = getPercent(count);
    let status = 'default';
    if (percent < 20) {
      status = 'default';
    } else if (percent < 50) {
      status = 'success';
    } else if (percent < 75) {
      status = 'active';
    } else {
      status = 'error';
    }
    return status;
  }, []);

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        {/* <Typography className="text_hello">こんにちは</Typography>
        <Typography className="text_welcome">ミラーへようこそ！</Typography> */}
        <Box className="game_progress">
          <Typography className="timer">{`残り ：${seconds}${config.limit.decoration}`}</Typography>
          <Typography className="description">{`合計 ${config.limit.value} ${config.limit.decoration}`}</Typography>
          <Box className="gauge">
            <Box className={classes.progress}>
              <reactSweetProgress.Progress
                type="circle"
                percent={getPercent(counts)}
                status={getStatus(counts)}
                strokeWidth="22"
                width="250px"
                symbolClassName={classes.progressSymbol}
                theme={{
                  default: {
                    symbol: `${getPercent(counts)}% 達成`,
                    trailColor: `rgba(255,255,255,0.4)`,
                    color: `rgba(115, 103, 240, 1)`,
                  },
                  success: {
                    symbol: `${getPercent(counts)}% 達成`,
                    trailColor: `rgba(255,255,255,0.4)`,
                    color: `rgba(246, 65, 108, 1)`,
                  },
                  active: {
                    symbol: `${getPercent(counts)}% 達成`,
                    trailColor: `rgba(255,255,255,0.4)`,
                    color: `rgba(250, 116, 43, 1)`,
                  },
                  error: {
                    symbol: `${getPercent(counts)}% 達成`,
                    trailColor: `rgba(255,255,255,0.4)`,
                    color: `rgba(15, 225, 194, 1)`,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box className="base-opacity" />
        <Box className="base">
          <Box className="skeleton">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-end"
              style={{ height: '100%' }}
              spacing={0}
            >
              {mode === MODE_KABEANA && (
                <>
                  <Grid item xs={6}>
                    <KabeanaPose />
                  </Grid>
                  <Grid item xs>
                    <img
                      src={
                        image ? `data:image/jpeg;base64,${image}` : SkeletonImg
                      }
                      style={{ width: '90%', height: '90%' }}
                    />
                  </Grid>
                </>
              )}
              {mode === MODE_SQUAT && (
                <>
                  <Grid
                    item
                    xs={5}
                    container
                    direction="row"
                    justify="flex-end"
                  >
                    <Grid item xs={11}>
                      <Squat />
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={7} container direction="row" justify="center" alignItems="stretch">
                <Grid item xs={11} style={{ visibility: unityLoaded ? 'visible' : 'hidden' }}>
                  <Unity unityContent={squatContent} className={classes.unityView}/>
                </Grid>
              </Grid> */}
                  <Grid item xs={7} container direction="row">
                    <Unity unityContent={squatContent} />
                  </Grid>
                </>
              )}
              {mode === MODE_BALL_STRIKE && (
                <>
                  <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justify="center"
                  >
                    <img
                      src={
                        image ? `data:image/jpeg;base64,${image}` : SkeletonImg
                      }
                      style={{ height: '550px' }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Box className="status-opacity">
            <StatusBase />
          </Box>
          <Box className="status">
            <Box className="icon">
              <img src={config.icon} />
            </Box>
            <Typography className="label">{config.name}回数</Typography>
            <Box className="counter">
              <Box className="outer_circle">
                <OuterCircle />
              </Box>
              <Box className="inner_circle">
                <InnerCircle />
              </Box>
              <Typography className="number">{counts || 0}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export { GamePlay };
