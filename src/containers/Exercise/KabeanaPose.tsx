import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediapipe } from '../../components/common/useMediapipe';
import { RootState } from '../../features';
import { Kabeana, ExerciseData } from '../../features/Exercise/models';
import { nextKabeanaPose } from '../../features/Exercise/reducer';
import { KabeanaImg } from './assets/kabeana/pose';


const KabeanaPose = () => {
  const { candidates, index } = useSelector<RootState, ExerciseData | undefined>(state => state.exercise.data) as Kabeana;
  const dispatch = useDispatch();
  const { mpCommands } = useMediapipe();

  useEffect(() => {
    mpCommands.kabeanaMode({ pose: candidates[index] });
  }, [candidates, index]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(nextKabeanaPose());
    }, 5000);
    return () => {clearTimeout(timeout)}
  }, [index]);

  return (
    <img src={KabeanaImg[candidates[index]]} style={{ width: '100%', height: '100%' }}/>
  );
}

export default KabeanaPose;
export {
  KabeanaPose,
}
