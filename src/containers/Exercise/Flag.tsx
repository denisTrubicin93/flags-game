import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediapipe } from '../../components/common/useMediapipe';
import { ExerciseData, Flag as FlagData } from '../../features/Exercise/models';

const Flag = () => {
  const exerciseData = useSelector<RootState, ExerciseData | undefined>(state => state.exercise.data) as FlagData;
  const nPose = exerciseData.numPose;
  const { mpCommands } = useMediapipe();

  useEffect(() => {
    mpCommands.flagMode();
  }, []);
}

export default Flag;
export {Flag,}
