import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../features';
import { Question } from '../../features/Quiz/models';

import { getRandomQuestions } from '../../features/Quiz/questions';
import { init, setQuestions } from '../../features/Quiz/reducer';

import { PrevBtn } from '../../components/common/button';
import faceIcon from './assets/faceIcon.svg';
import background from './assets/background.svg';
import QuizIcon from './assets/QuizIcon.png';
import quiz from './assets/quiz.svg';
import CommonHeader from '../../components/common/CommonHeader';
import TimerCountdown from '../../components/common/TimerCountdown';
import { useQuiz } from './useQuiz';
import HeaderBg from './assets/Child_Quiz/header_bg.png';
import TinyOXIcon from './assets/Child_Quiz/tiny_ox_icon.png';
import useFootControl from '../../components/common/hook/useFootControl';
import {
  TOP_BG,
  BOTTOM_BG,
  BLUR_TITLE,
  CARD,
  COUNTER_NOTE,
  CARD_SHADOW,
  COUNTER,
} from '../common/styles';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        top: 0px;

        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.4;
        border-radius: 70px;
        z-index: -1;
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
      '& .barcode_scan': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 63.85%;

        background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        border-radius: 20px;
      `,
      '& .text_scan_title': `
        position: absolute;
        height: 116px;
        left: 180px;
        top: 468px;
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
      '& .text_scan_des': `
        position: absolute;
        height: 43px;
        left: 221px;
        top: 593px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 43px;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .scan_icon': `
        position: absolute;
        width: 424px;
        height: 265px;
        left: 566px;
        top: 429px;

        background: url(${faceIcon}) no-repeat center;
      `,
      '& .quiz_header': `
        top: 22.24%;
      `,
      '& .capture_icon': `
        z-index: -1;
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 39.74%;
        bottom: 6.3%;
        background: url(${background}) no-repeat center;
      `,
      '& .picture_icon': `
        position: absolute;
        width: 300px;
        height: 300px;
        left: 375px;
        top: 1012px;
      `,
      '& .counter': `
        position: absolute;
        left: 415px;
        top: 1474px;
      `,
      '& .child_top_bg': {
        ...TOP_BG,
        background: `url(${HeaderBg}) center no-repeat `,
      },
      '& .child_bottom_bg': {
        ...BOTTOM_BG,
        '& .blur_title': {
          ...BLUR_TITLE,
        },
        '& .card': {
          ...CARD,
          background: 'linear-gradient(180deg, #1BC7ED 0%, #2E8DFF 100%)',
          '& .icon': {
            width: 200,
            height: 200,
            background: `url(${TinyOXIcon}) center no-repeat`,
            marginRight: 30,
          },
          '& .title': {
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: '0.02em',
          },
          '& .card_body': {
            fontSize: 48,
            fontWeight: 800,
            padding: 15,
          },
        },
        '& .card_shadow': {
          ...CARD_SHADOW,
        },
        '& .child_counter': {
          ...COUNTER,
        },
        '& .counter_note': {
          ...COUNTER_NOTE,
        },
      },
    },
  })
);

const Quiz = () => {
  const classes = useStyles();
  const history = useHistory();
  const { config } = useQuiz();
  const dispatch = useDispatch();

  const scenesType = useSelector((state: RootState) => state.scenes.type);

  useEffect(() => {
    const logo = document.getElementById('aflac-logo');
    if (scenesType === 'child') {
      logo!.style.display = 'none';
    }
  }, []);

  const library = useSelector<RootState, Question[]>(
    (state) => state.quiz.library
  );

  const onShoot = () => {
    dispatch(init());
    if (scenesType === 'child') {
      history.push('quizAgeChoose');
    } else {
      dispatch(setQuestions(getRandomQuestions(library, config.COUNT)));
      history.push('quizQuestions');
    }
  };

  useFootControl({
    intitialIndex: 0,
    actions: [],
    goBack: () => history.push('menu'),
  });

  return (
    <>
      {scenesType === 'child' || scenesType === 'adult' ? (
        <Box className={classes.app_content}>
          <Box className="child_top_bg"></Box>
          <Box className="child_bottom_bg">
            <Typography className="blur_title">ゲームせつめい</Typography>
            <Grid container direction="column" className="card">
              <Grid container direction="row" alignItems="center">
                <Box className="icon"></Box>
                <Typography className="title">クイズ</Typography>
              </Grid>
              {scenesType === 'child' ? (
                <Typography className="card_body">
                  2つのこたえの中から、これ！とおもう<br/>
                  こたえをそうさパッドで<br/>
                  せんたくしてみよう！<br/>
                  いくつせいかいできるかな？
                </Typography>
              ) : (
                <Typography className="card_body">
                  3つの答えの中から、これ！と思う<br/>
                  答えを操作パッドで選択してみよう！<br/>
                  いくつ正解できるかな？
                </Typography>
              )}

            </Grid>
            <Box className="card_shadow" />
            <TimerCountdown
              className="child_counter"
              seconds={3}
              onShoot={onShoot}
            />
            <Typography className="counter_note">ゲームスタートまで</Typography>
          </Box>
        </Box>
      ) : (
        <Box className={classes.app_content}>
          <Box className="background" />

          <Box className="vector">
            <PrevBtn
              onTap={(e: any) => {
                history.push('menu');
              }}
            />
          </Box>
          <CommonHeader
            className="quiz_header"
            title={'雑学クイズ'}
            subTitle="何問正解できるかな？"
            rightContent={<img src={quiz} />}
          />
          <Box className="capture_icon" />

          <img className="picture_icon" src={QuizIcon} />
          <TimerCountdown className="counter" seconds={3} onShoot={onShoot} />
        </Box>
      )}
    </>
  );
};

export default Quiz;

export { Quiz };
