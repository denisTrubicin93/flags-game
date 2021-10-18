import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediapipe } from '../../components/common/useMediapipe';
import { RootState } from '../../features';
import { ExerciseData, Squat as SquatData } from '../../features/Exercise/models';
import SquatDownImg from './assets/squat/squat_down.png';
import SquatStandImg from './assets/squat/squat_stand.png';
import SquatUpImg from './assets/squat/squat_up.png';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

/** 15枚の画像のスプライト */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes sprite': {
      "0%": { transform: 'translate(0, 0)' },
      "100%": { transform: 'translate(0, -93.33%)' },
    },
    root:  {
      position: 'relative',
      overflow: 'hidden',
      width: '260px',
      height: '450px',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, 0)',
      '-webkit-transform': 'translate(-50%, 0)',
      '-ms-transform': 'translate(-50%, 0)',
      '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '6750px', // 15 * 450
        animation: '$sprite 0.5s steps(14)',
        animationFillMode: 'forwards',
        MozAnimationFillMode: 'forwards',
        WebkitAnimationFillMode: 'forwards',
        animationPlayState: 'paused',
      },
    },
  }),
);

const Squat = () => {
  const exerciseData = useSelector<RootState, ExerciseData | undefined>(state => state.exercise.data) as SquatData;
  const isLower = exerciseData.isLower;
  const { mpCommands } = useMediapipe();
  const classes = useStyles();

  useEffect(() => {
    mpCommands.squatMode();
  }, []);

  return (
    <Box className={classes.root}>
      {!isLower && <img src={SquatUpImg} alt=""/>}
      {isLower && <img src={SquatDownImg} alt=""/>}
    </Box>
  )
}

export default Squat;
export {Squat,}
