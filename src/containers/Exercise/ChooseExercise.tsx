import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, startSubway } from '../../features/Exercise/reducer';
import { MODE_SQUAT, MODE_RUNNING,MODE_FLAG } from '../../features/Exercise/models';
import { enableCursor } from '../../features/Handtracking/reducer';
import { RootState } from '../../features';
import { useMediapipe } from '../../components/common/useMediapipe';
import { ScenesState } from '../../features/Scenes/models';
import SquatIcon from './assets/squat_icon.png';
import RunningIcon from './assets/running_icon.png';
import FlagIcon from './assets/flag.png';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import useFootControl from '../../components/common/hook/useFootControl';
import MiddleBar from '../../components/common/MiddleBar';

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
        '& .result_age_gender': {
          fontSize: 144,
          fontWeight: 800,
          color: '#333333',
          position: 'absolute',
          top: 295,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          width: 320,
          height: 320,
          borderRadius: 80,
          marginBottom: 20,
          '& .icon': {
            maxHeight: '70%',
            maxWidth: '70%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
        '& .center_title': {
          fontSize: 48,
          color: '#613BFF',
          fontWeight: 800,
          marginTop: 10,
          textAlign: 'center',
        },
        '& .gesture_bar': {
          position: 'absolute',
          left: 'unset',
          top: 1680,
          width: 920,
          height: 160,
          borderRadius: 24,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          justifyContent: 'space-between',
          padding: '0 20px',
        },
      },
    },
  })
);

const ChooseExercise = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const leftCursor = useSelector<RootState, HandCursor>(
  //   (state) => state.cursor.hands[HandIndex.LEFT]
  // );
  // const rightCursor = useSelector<RootState, HandCursor>(
  //   (state) => state.cursor.hands[HandIndex.RIGHT]
  // );
  const { mpCommands } = useMediapipe();
  const scenesType = useSelector<RootState, ScenesState['type']>(
    (state) => state.scenes.type
  );

  useEffect(() => {
    dispatch(enableCursor());
    mpCommands.neutralMode();
  }, []);

  const buttons = [
    {
      childTitle: 'スクワット',
      adultTitle: 'スクワット',
      icon: SquatIcon,
      onTap: () => {
        dispatch(setMode(MODE_SQUAT));
        mpCommands.squatMode();
        history.push('exerciseInstructions');
      },
    },
    {
      childTitle: 'しょうがいぶつレース',
      adultTitle: '障害物レース',
      icon: RunningIcon,
      onTap: () => {
        dispatch(setMode(MODE_RUNNING));
        mpCommands.neutralMode();
        dispatch(startSubway());
        history.push('exerciseInstructions');
      },
    },
    {
      childTitle: '',
      adultTitle: '',
      icon: FlagIcon,
      onTap: () => {
        dispatch(setMode(MODE_FLAG));
        mpCommands.flagMode();
        history.push('flag');
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
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 750, position: 'absolute', top: 545 }}
          >
            {buttons.map((x, index) => (
              <Grid
                item
                direction="column"
                key={index}
                justify="flex-start"
                alignItems="center"
                container
                style={{ width: 350 }}
              >
                <Box
                  className={buttonClasses(index)}
                  onClick={() => onTap(index)}
                  onMouseOver={() => onHover(index)}
                >
                  <img src={x.icon} className="icon" />
                </Box>
                <Typography className="center_title">
                  {scenesType === 'child' ? x.childTitle : x.adultTitle}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <MiddleBar
            title={
              scenesType === 'child'
                ? 'そうさぱっどの右・左を'
                : '操作パッドの右・左を'
            }
            subTitle={
              scenesType === 'child'
                ? 'あしでふんでえらんでね'
                : '足で踏んで選んでね'
            }
            className="gesture_bar"
          />
        </Box>
      </Box>
    </>
  );
};

export default ChooseExercise;

export { ChooseExercise };
