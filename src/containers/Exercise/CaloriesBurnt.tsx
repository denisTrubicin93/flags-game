import React, { useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';
import { RootState } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import { useModeExercise } from './useModeExercise';
import { setMode, setResult } from '../../features/Exercise/reducer';
import { enableCursor } from '../../features/Handtracking/reducer';
import { useMediapipe } from '../../components/common/useMediapipe';
import ThumbsUp from './assets/8_Success/ThumbsUp.png';
import bg from '../../components/common/svg/timer-countdown-bg.svg';
import Base from './assets/15_Calories_Burnt/Base.png';
import EncouragementText from './assets/15_Calories_Burnt/EncouragementText.png';
import SquatCounterLabel from './assets/15_Calories_Burnt/SquatCounterLabel.png';
import CounterBackground from './assets/15_Calories_Burnt/CounterBackground.png';
import CheerUp from './assets/15_Calories_Burnt/CheerUp.gif';
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
      '& .container': `
        position: absolute;
        left: 8.61%;
        top: 14.11%;
        width: 895px;
        height: 1377px;
        background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        border-radius: 20px;
      `,
      '& .text_message': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .count_box': `
        position: relative;
        width: 807px;
        height: 815px;
        background: center / cover no-repeat url(${Base});
      `,
      '& .img_squat': `
        position: absolute;
        width: 188px;
        height: 188px;
        top: -85px;
      `,
      '& .text_info': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        text-align: center;
        color: #DFDEDF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
    },
    countContainer: {
      width: 446,
      height: 446,
      background: `center / cover no-repeat url(${bg})`,
    },
    countText: `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: bold;
      font-size: 200px;
      line-height: 290px;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `,
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
      '& .encouragement': `
        position: absolute;
        top: 267px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0%);
      `,
      '& .counterCircle': `
        position: absolute;
        top: 665px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0%);
      `,
      '& .counterLabel': `
        position: absolute;
        top: 1060px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0%);
      `,
      '& .cheerUp': `
        position: absolute;
        top: 1120px;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, 0%);
      `,
    },
    countText: `
      position: absolute;
      top: 0;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, 0%);
      width: 440px;
      height: 440px;
      font-family: Dosis;
      font-style: normal;
      font-weight: 800;
      font-size: 192.757px;
      line-height: 440px;
      text-align: center;
      vertical-align: middle;
      letter-spacing: 0.05em;
      color: #FFFFFF;
    `,
  })
);

const CaloriesBurnt = () => {
  const history = useHistory();
  const counts = useSelector<RootState, number | undefined>(
    (state) => state.exercise.data?.counts
  );
  const { mode, config, scenesType } = useModeExercise();
  const classes = mode === 'squat' ? useSquatStyles() : useStyles();
  const { mpCommands } = useMediapipe();
  
  const dispatch = useDispatch();

  const win = useCallback(
    (counts: number) => {
      return counts >= config.target.value;
    },
    [config]
  );

  React.useEffect(() => {
    mpCommands.neutralMode();

    const timeout = setTimeout(() => {
      // if (counts && win(counts)) {
      dispatch(setResult('success'));
      history.push('success');
      // }
      // else {
      //   dispatch(setResult('failure'));
      //   history.push('failure');
      // }
      dispatch(enableCursor());
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
    { mode === 'squat' &&
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="encouragement">
          <img src={EncouragementText} />
        </Box>
        <Box className="counterCircle">
          <img src={CounterBackground} />
          <Typography className={classes.countText}>
            {counts}
          </Typography>
        </Box>
        <Box className="counterLabel">
          <img src={SquatCounterLabel} />
        </Box>
        { scenesType !== 'child' &&
          <Box className="cheerUp">
            <img  width="800px" height="800px" src={CheerUp} />
          </Box>
        }
      </Box>
    }
    { mode !== 'squat' &&
      <Box className={classes.app_content}>
        <Box className="background" />
        <Grid
          className="container"
          container
          direction="column"
          alignItems="center"
          justify="space-around"
        >
          <Grid item container direction="column" alignItems="center">
            <img src={ThumbsUp} />
            <Typography className="text_message">{scenesType === 'child' ? 'よくがんばりました' : 'よく頑張りました！'}</Typography>
          </Grid>
          <Grid
            className="count_box"
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <img className="img_squat" src={config.icon} />
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.countContainer}
            >
              <Typography className={classes.countText}>
                {counts}
              </Typography>
            </Grid>
            <Typography className="text_info">{config.name}</Typography>
          </Grid>
        </Grid>
      </Box>
    }
    </>
  );
};

export default CaloriesBurnt;

export { CaloriesBurnt };
