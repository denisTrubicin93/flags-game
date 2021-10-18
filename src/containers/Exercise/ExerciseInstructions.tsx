import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { setCount } from '../../features/Exercise/reducer';
import { disableCursor } from '../../features/Handtracking/reducer';

import {
  PrevBtn,
  RequestHelpBtn,
  MenuBtn,
} from '../../components/common/button';

import CommonHeader from '../../components/common/CommonHeader';
import TimerCountdown from '../../components/common/TimerCountdown';
import { useModeExercise } from './useModeExercise';

import GameInstructionLabel from './assets/5_Exercise_Instructions/GameInstructionLabel.png';
import counterBackground from './assets/squat/counterBackground.png';
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
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
      `,
      '& .vector': `
        position: absolute;
        left: 90px;
        top: 66px;
        display: none;
      `,
      '& .request_help': `
        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;
        border-radius: 100px;
        display: none;
      `,
      '& .choose_app_title': `
        position: absolute;
        top: 402px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0%);
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .instructions': `
        position: absolute;
        width: 895px;
        height: 804px;
        left: 90px;
        top: 598px;
        z-index: 1;
      `,
      '& .instructions_back': `
        position: absolute;
        width: 895px;
        height: 804px;
        left: 90px;
        top: 598px;
        opacity: 0.7;
        background: radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%);
        border-radius: 50px;
      `,
      '& .instructions_text1': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        line-height: 58px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .instructions_text2': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 50px;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .exercise_icon': `
        position: absolute;
        left: 41.67%;
        right: 42.13%;
        top: 28.59%;
        bottom: 62.29%;
        z-index: 2;
      `,
      '& .counter': `
        position: absolute;
        width: 250px;
        height: 250px;
        left: 415px;
        top: 1439px;
      `,
    },
  })
);

const useSquatStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        background: rgba(254, 215, 119, 1);
      `,
      '& .choose_app_title': `
        position: absolute;
        top: 568px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 10%);
        font-family: "Rounded Mplus 1c";
        font-style: normal;
        font-weight: 800;
        font-size: 96px;
        line-height: 143px;
        text-align: center;
        vertical-align: middle;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        z-index: 10;
      `,
      '& .instructions': `
        position: absolute;
        width: 810px;
        height: 390px;
        left: 152px;
        top: 700px;
        z-index: 1;
      `,
      '& .instructions_back': `
        position: absolute;
        width: 920px;
        height: 560px;
        left: 80px;
        top: 640px;
        background: #FFE8AD;
        border: 20px solid #000000;
        border-radius: 32px;
      `,
      '& .instructions_back:before': `
        position: absolute;
        top: 10px;
        left: 10px;
        width: 900px;
        height: 540px;
        background: #FEC05E;
        content: '';
        border-radius: 8px;
      `,
      '& .instructions_text2': `
        font-family: 'Rounded Mplus 1c';
        font-style: normal;
        font-weight: 800;
        font-size: 56px;
        line-height: 140%;
        text-align: center;
        color: #000000;
      `,
      '& .exercise_icon': `
        position: absolute;
        top: 326px;
        left: 50%;
        width: 320px;
        height: 320px;
        margin-right: -50%;
        transform: translate(-50%, 0%);
        z-index: 2;
      `,
      '& .counter': `
        position: absolute;
        width: 360px;
        height: 360px;
        left: 360px;
        top: 1439px;
        background: center / cover no-repeat url(${counterBackground});
      `,
    },
  })
);

const ExerciseInstructions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { mode, config, scenesType } = useModeExercise();
  const classes = mode === 'squat' ? useSquatStyles() : useStyles();

  const onShoot = () => {
    if (mode === 'squat') {
      history.push('gamePlaySquat');
      // history.push('gamePlayFlags');
    } else if (mode === 'kabeana') {
      history.push('gamePlay/kabeana');
    } else if (mode === 'ball_strike') {
      history.push('gamePlay/ball');
    } else if (mode === 'running') {
      history.push('gamePlayRunning');
    } else if (mode === 'flag') {
      history.push('gamePlayFlag');
    }else {
      history.push('gamePlaySquat');
    }
    dispatch(setCount(0));
  };

  React.useEffect(() => {
    dispatch(disableCursor());
  }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  })

  return (
    <>
      { mode === 'squat' &&
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="choose_app_title">
          <img src={GameInstructionLabel} />
        </Box>
        <Box className="exercise_icon">
          <img src={config.instruction.icon} />
        </Box>
        <Box className="instructions">
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            <Grid style={{ marginTop: 40 }}>
              {config.instruction.context.map((text, index) => (
                <Typography
                  key={`instructions_${index}`}
                  style={{ marginBottom: 0 }}
                  className="instructions_text2"
                >
                  {text}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box className="instructions_back" />
        <TimerCountdown className="counter" seconds={3} onShoot={onShoot}
          textStyle={{
            fontFamily: 'Rounded Mplus 1c',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '144px',
            lineHeight: '214px',
            color: '#FFFFFF'
          }}
        />
      </Box>
      }
      { mode !== 'squat' &&
        <Box className={classes.app_content}>
        <Box className="background" />

        <Box className="vector">
          <PrevBtn
            onTap={(e: any) => {
              history.push('fitness');
            }}
          />
        </Box>

        <Box className="request_help">
          <RequestHelpBtn />
        </Box>

        {/* <CommonHeader
          title="スクワット"
          subTitle="何回できるかな？"
          rightContent={<img src={config.icon} />}
        /> */}

        <Typography className="choose_app_title">{scenesType === 'child' ? 'ゲームせつめい' : 'ゲーム説明'}</Typography>
        <Box className="exercise_icon">
          <img src={config.instruction.icon} />
        </Box>
        <Box className="instructions">
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{
              height: '100%',
              width: '100%',
              paddingTop: 150,
              paddingBottom: 30,
              paddingLeft: 45,
              paddingRight: 45,
              opacity: 1,
            }}
          >
            <Typography className="instructions_text1">
              {config.limit.value!=0?config.limit.value:''}
              {config.limit.decoration}
              <br />
              {config.target.value!=0? config.target.value:''}
              {config.target.decoration}
            </Typography>
            <Grid style={{ marginTop: 40 }}>
              {config.instruction.context.map((text, index) => (
                <Typography
                  key={`instructions_${index}`}
                  style={{ marginBottom: 0 }}
                  className="instructions_text2"
                >
                  {text}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box className="instructions_back" />
        <TimerCountdown className="counter" seconds={3} onShoot={onShoot} />
      </Box>
    }
    </>
  );
};

export default ExerciseInstructions;

export { ExerciseInstructions };
