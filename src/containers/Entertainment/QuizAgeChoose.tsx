import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../features';
import { Question } from '../../features/Quiz/models';

import MiddleBar from '../../components/common/MiddleBar';
import { FancyBorderBtn } from '../../components/common/button';
import Loading from '../../components/common/Loading';
import { getChildQuizLibraryByAgeType } from '../../service/QuizService';
import { setChildLibrary, setQuestions } from '../../features/Quiz/reducer';
import { getRandomQuestions } from '../../features/Quiz/questions';
import { useQuiz } from './useQuiz';
import MainBg from './assets/Child_Quiz/main_bg.png';
import useFootControl from '../../components/common/hook/useFootControl';
import { ButtonPoint } from '../../features/Button/models';
import { setBtnPoint } from '../../features/Button/reducer';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        position: 'absolute',
        width: 1080,
        height: 1920,
        left: 0,
        background: `center no-repeat url(${MainBg})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .center_title': {
          fontFamily: 'Noto Sans JP',
          fontSize: 60,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000',
        },
        '& .age_btn': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 360,
          height: 400,
          background: '#ffffff',
          borderRadius: 16,
          border: '16px solid #FFFFFF',
        },
        '& .age_btn_active': {
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          '& .center_title': {
            color: '#ffffff',
          },
        },
      },
    },
  })
);

const QuizAgeChoose = () => {
  const classes = useStyles();
  const history = useHistory();
  const { config } = useQuiz();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const childLibrary = useSelector<RootState, Question[]>(
    (state) => state.quiz.childLibrary
  );

  const handleAgeChoose = (ageType: number) => {
    setLoading(true);
    getChildQuizLibraryByAgeType(ageType)
      .then(function (response: any) {
        response.data &&
          dispatch(setChildLibrary({ ageType: ageType, data: response.data }));
        dispatch(
          setQuestions(
            getRandomQuestions(
              response.data ? response.data : childLibrary[ageType],
              config.COUNT
            )
          )
        );
        history.push('quizQuestions');
        setLoading(false);
      })
      .catch(function (error: any) {
        console.log(error);
        dispatch(
          setQuestions(getRandomQuestions(childLibrary[ageType], config.COUNT))
        );
        history.push('quizQuestions');
        setLoading(false);
      });
  };

  const buttons: any[] = [
    {
      centerTitle: '小学5～6年生',
      onTap: () => handleAgeChoose(4),
    },
    {
      centerTitle: '小学3～4年生',
      onTap: () => handleAgeChoose(3),
    },
    {
      centerTitle: '小学1～2年生',
      onTap: () => handleAgeChoose(2),
    },
    {
      centerTitle: 'ようちえん',
      onTap: () => handleAgeChoose(1),
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'age_btn age_btn_active' : 'age_btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Grid
            style={{ position: 'absolute', top: 440, width: 920, height: 1040 }}
            container
            justify="space-between"
            alignContent="space-between"
          >
            {buttons.map((x, index) => (
              <Box
                className={buttonClasses(index)}
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <Typography className="center_title">
                  {x.centerTitle}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
      <Dialog fullScreen open={loading}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Loading color="white" height={200} width={200} />
        </Grid>
      </Dialog>
    </>
  );
};

export default QuizAgeChoose;

export { QuizAgeChoose };
