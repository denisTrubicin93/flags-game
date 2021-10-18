import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useModeExercise } from './useModeExercise';
import { DeviceService } from '../../service/DeviceService';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import BackIcon from '../Entertainment/assets/Common/back.png';
import ConfirmIcon from './assets/ar.png';
import AdultSuccessBox from './assets/adult_success_box.png';
import ChildSuccessBox from './assets/child_success_box.png';
import useFootControl from '../../components/common/hook/useFootControl';
import SquatCheerUp from './assets/squat_cheer_up.gif';
import RunningCheerUp from './assets/running_cheer_up.png';
import SquatScoreTitle from './assets/squat_score_title.png';
import FlagScoreTitle from './assets/flag_score_title.png';
import FlagJumping from './assets/flags/Flag-jumping.gif'
import FlagSad from './assets/flags/flag-sad.gif'
import ChildRunningScoreTitle from './assets/child_running_score_title.png';
import AdultRunningScoreTitle from './assets/adult_running_score_title.png';
import CounterBackground from './assets/15_Calories_Burnt/CounterBackground.png';
import EncouragementText from './assets/15_Calories_Burnt/EncouragementText.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../features';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        ...BACKGROUND,
        position: 'relative',
        background: '#FED777',
        '& .result_title': {
          height: 143,
          position: 'absolute',
          top: 65,
        },
        '& .result_score': {
          height: 300,
          width: '100%',
          display: 'flex',
          position: 'absolute',
          top: 230,
          alignItems: 'center',
          gap: 25,
          '& .score_circle': {
            width: 200,
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `url(${CounterBackground}) center/contain no-repeat`,
            '& .score_text': {
              fontSize: 70,
              fontWeight: 800,
            },
          },
          '& .score_game_title': {},
        },
        '& .animal_box': {
          width: 970,
          height: 715,
          position: 'absolute',
          top: 525,
          left: 65,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          marginBottom: 50,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            position: 'relative',
            top: 30,
            textAlign: 'center',
          },
          '& .icon': {
            maxHeight: '45%',
            maxWidth: '45%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
      },
    },
  })
);

const Success = () => {
  const classes = useStyles();
  const history = useHistory();
  const { mode, config, scenesType } = useModeExercise();
  const counts = useSelector<RootState, number | undefined>(
    (state) => state.exercise.data?.counts
  );
  const ResultGame = useSelector<RootState, 'success' | 'failure' | undefined>(
    (state) => state.exercise.data?.result
  );
  const buttons = [
    {
      adultTitle: '最初にもどる',
      childTitle: 'さいしょにもどる',
      icon: BackIcon,
      onTap: () => history.push('menu'),
    },
    {
      adultTitle: 'ステッカーをもらう',
      childTitle: 'ステッカーをもらう',
      icon: ConfirmIcon,
      onTap: () => {
        const qrs = [
          'https://8th.io/jnjs3',
          'https://8th.io/j66rx',
          'https://8th.io/mare8',
          'https://8th.io/r6pxb',
        ];
        var index = Math.floor(Math.random() * qrs.length);

        // TODO Make QrCode & Print.
        DeviceService.default().qrPrint(qrs[index]);
        history.push('issuanceCard');
        // history.push('scanCardError');
      },
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <Box className={classes.app_content}>
      <Box className="background">
        <img className="result_title" src={EncouragementText} />

        <Box className="result_score">
          {mode === 'squat' ? (
            <img width="300px" height="300px" src={SquatCheerUp} />
          ) : null}
          {mode === 'flag' ? (
            <img width="300px" height="300px" src={ResultGame === 'success' ? FlagJumping : FlagSad} />
          ) : null}

          <Box className="score_circle">
              <Typography
              className="score_text"
              style={
                counts !== undefined && counts >= 100
                  ? { fontSize: 50 }
                  : { fontSize: 70 }
              }
            >
              {counts}
            </Typography>
          </Box>
          {mode === 'squat' ? (
            <img className="score_game_title" src={SquatScoreTitle} />
          ) : mode === 'flag' ? (
            <img className="score_game_title" src={FlagScoreTitle} />
          ) : scenesType === 'child' ? (
            <img width="460px" className="score_game_title" src={ChildRunningScoreTitle} />
          ) : (
            <img width="460px" className="score_game_title" src={AdultRunningScoreTitle} />
          )}
        </Box>

        <img
          className="animal_box"
          src={scenesType === 'child' ? ChildSuccessBox : AdultSuccessBox}
        />
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ width: 930, position: 'absolute', top: 1426 }}
        >
          {buttons.map((x, index) => (
            <Box
              className={buttonClasses(index)}
              key={index}
              onClick={() => onTap(index)}
              onMouseOver={() => onHover(index)}
            >
              <img src={x.icon} className="icon" />
              <Typography
                className="center_title"
                style={{ width: index === 1 ? 330 : 440 }}
              >
                {scenesType === 'child' ? x.childTitle : x.adultTitle}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Success;

export { Success };
