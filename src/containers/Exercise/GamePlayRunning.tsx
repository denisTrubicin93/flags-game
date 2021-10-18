import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features';

import { useModeExercise } from './useModeExercise';
import { DEFAULT_COORDS } from '../HandTracking/config';
import {
  sendMessageAction,
} from '../../features/Websocket/reducer';
import Unity, { UnityContent } from 'react-unity-webgl';
import {
  finishSubway,
  getRunningState,
  setCount,
} from '../../features/Exercise/reducer';

import { ButtonPoint } from '../../features/Button/models';
import { setBtnPoint } from '../../features/Button/reducer';

import { useMediapipe } from '../../components/common/useMediapipe';
import useFootControl from '../../components/common/hook/useFootControl';

const unityContent = new UnityContent(
  '../assets/unity/Running/SubwayPOC.json',
  '../assets/unity/Running/UnityLoader.js'
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
      '& .skeleton': `
        position: absolute;
        height: 1920px;
        width: 1080px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0);
        -webkit-transform: translate(-50%, 0);
        -ms-transform: translate(-50%, 0);
      `,
    },
    unityView: {
      maxHeight: '1920px',
      background: 'transparent !important',
      '& canvas': {
        borderRadius: '70px',
      },
    },
  })
);

export default function GamePlayRunning() {
  const classes = useStyles();
  const history = useHistory();

  const counts = useSelector<RootState, number | undefined>(
    (state) => state.exercise.data?.counts
  );
  const runningState = useSelector(getRunningState);

  useEffect(() => {
    // 無操作時のsleep画面への遷移の回避
    dispatch(setBtnPoint(ButtonPoint.BLUR));
  }, [counts]);

  useEffect(() => {
    if (runningState === 'finished') {
      setTimeout(() => {
        history.push('/caloriesBurnt');
      }, 200);
    }
  }, [runningState]);

  const dispatch = useDispatch();
  const { mode, config } = useModeExercise();
  const [seconds, setSeconds] = React.useState(config.limit.value);

  useEffect(() => {
    const intr = setInterval(() => {
      dispatch(setBtnPoint(ButtonPoint.BLUR));
    }, 5000);
    return () => {
      clearInterval(intr);
    };
  }, []);

  useEffect(() => {
    dispatch(sendMessageAction({ to: 'pose', message: DEFAULT_COORDS }));
  }, []);

  useEffect(() => {
    unityContent.on('SendScore', (value: number) => {
      console.debug('SendScore', value);
      dispatch(setCount(value));

      setTimeout(() => {
        dispatch(finishSubway());
      }, 5000);
    });
  }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="skeleton">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            style={{ height: '100%' }}
            spacing={0}
          >
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <>
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="center"
                  justify="center"
                >
                  <div
                    id="unityContainer"
                    style={{
                      width: '1080px',
                      height: '1920px',
                      margin: 'auto',
                    }}
                  >
                    <Unity unityContent={unityContent} />
                  </div>
                </Grid>
              </>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export { GamePlayRunning };
