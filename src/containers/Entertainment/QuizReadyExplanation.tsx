import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../features';
import { Question } from '../../features/Quiz/models';
import {
  setOk,
  setNg,
  setCurrent,
  setChoose,
} from '../../features/Quiz/reducer';

import { RequestHelpBtn } from '../../components/common/button';
import MaskGroup from './assets/Common/MaskGroup.png';
import CheckGroup from './assets/Quiz_Ready_Explanation/CheckGroup.png';
import quizDefault from './assets/Quiz_Ready_Explanation/quiz-default.png';
import smile from './assets/Quiz_Ready_Explanation/smile.svg';
import sad from './assets/Quiz_Ready_Explanation/sad.svg';
import ChildBg from './assets/Child_Quiz/main_bg.png';
import ExplanationBg from './assets/Child_Quiz/explanation_bg.png';
import AdultExplanationBg from './assets/Adult_Quiz/explanation_bg.png';
import yes from './assets/Child_Quiz/yes.png';
import no from './assets/Child_Quiz/no.png';
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
        /* Background */

        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;

        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
        border-radius: 70px;
      `,
      '& .request_help': `
        /* Request_Help */

        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
        display: none;
      `,
      '& .title_containner': `
        position: absolute;
        height: 300px;
        top: 50px;
        overflow: hidden;
      `,
      '& .answer_title': `
        width: 800px;
        text-align: center;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 72px;
        line-height: 108.02px;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .answer_tip': `
        position: absolute;
        left: 5.74%;
        right: 5.74%;
        top: 24.22%;
        bottom: 67.29%;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 150.02%;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 9.57509px 9.57509px rgba(0, 0, 0, 0.5);
        z-index: 10;
      `,
      '& .answer_icon': `
        position: absolute;
        width: 140px;
        height: 140px;
        left: 802px;
        top: 502px;
        z-index: 10;
      `,
      '& .barcode_scan': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 6.3%;

        // background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        background: url(${MaskGroup}) no-repeat center;
        border-radius: 20px;
      `,
      '& .checkGroup': `
        position: absolute;
        width: 466px;
        height: 466px;
        left: 307px;
        top: 572px;
        background: url(${CheckGroup}) no-repeat center;
        z-index: 1;
      `,
      '& .checkGroup_text': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 54.8058px;
        line-height: 79px;
        text-align: center;
        color: #000000;
      `,
      '& .message_containner': `
        position: absolute;
        left: 13.24%;
        right: 12.78%;
        top: 57.92%;
        bottom: 12.55%;
        text-align: center;
      `,
      '& .message': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 42px;
        line-height: 150.02%;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 9.57509px 9.57509px rgba(0, 0, 0, 0.5);

        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:9;
        overflow:hidden;
        text-overflow: ellipsis;
      `,
      '& .child_bg': {
        position: 'absolute',
        width: 1080,
        height: 1920,
        left: 0,
        background: `url(${ChildBg}) center no-repeat`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .card': {
          position: 'relative',
          top: 326,
          background: `url(${ExplanationBg}) center/cover no-repeat`,
          width: 920,
          height: 1412,
          paddingTop: 200,
          '& .card_title': {
            display: 'flex',
            width: 520,
            height: 120,
            borderRadius: 60,
          },
          '& .yes_icon': {
            width: 80,
            height: 80,
            background: `url(${yes}) center/contain no-repeat`,
            marginRight: 20,
            marginLeft: 15,
          },
          '& .no_icon': {
            width: 60,
            height: 60,
            background: `url(${no}) center/contain no-repeat`,
            marginRight: 20,
            marginLeft: 30,
          },
          '& .title': {
            fontSize: 64,
            fontWeight: 'bold',
          },
          '& .card_image': {
            width: 420,
            height: 420,
            borderRadius: 80,
            marginTop: 80,
          },
          '& .explan_message': {
            fontSize: 56,
            fontWeight: 'bold',
            width: 840,
            height: 468,
            textAlign: 'center',
            color: '#000000',
            overflow: 'hidden',
            padding: '0 10px',
            marginTop: 50,
          },
        },
      },
      '& .adult_bg': {
        position: 'absolute',
        width: 1080,
        height: 1920,
        left: 0,
        background: `url(${ChildBg}) center no-repeat`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .card': {
          position: 'relative',
          top: 326,
          background: `url(${AdultExplanationBg}) center/cover no-repeat`,
          width: 920,
          height: 1412,
          paddingTop: 200,
          '& .card_title': {
            display: 'flex',
            width: 520,
            height: 120,
            borderRadius: 60,
          },
          '& .yes_icon': {
            width: 80,
            height: 80,
            background: `url(${yes}) center/contain no-repeat`,
            marginRight: 20,
            marginLeft: 15,
          },
          '& .no_icon': {
            width: 60,
            height: 60,
            background: `url(${no}) center/contain no-repeat`,
            marginRight: 20,
            marginLeft: 30,
          },
          '& .title': {
            fontSize: 64,
            fontWeight: 'bold',
          },
          '& .card_image': {
            width: 420,
            height: 420,
            borderRadius: 80,
            marginTop: 80,
          },
          '& .explan_message': {
            fontSize: 40,
            fontWeight: 'bold',
            width: 840,
            height: 468,
            textAlign: 'center',
            color: '#000000',
            padding: '0 10px',
            marginTop: 50,
          },
        },
      },
    },
  })
);

const QuizReadyExplanation = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const answerTitle = ['A', 'B', 'C', 'D'];

  const scenesType = useSelector((state: RootState) => state.scenes.type);

  const questions = useSelector<RootState, Question[]>(
    (state) => state.quiz.questions
  );
  const current = useSelector<RootState, number>((state) => state.quiz.current);
  const choose = useSelector<RootState, number | undefined>(
    (state) => state.quiz.choose
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (current + 1 < questions.length) {
        dispatch(setCurrent(current + 1));
        dispatch(setChoose(undefined));
        history.push('quizQuestions');
      } else {
        history.push('quizReadyScore');
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  useFootControl({
    intitialIndex: 0,
    actions: [],
    goBack: () => history.push('menu'),
  });

  return (
    <>
      {scenesType === 'child' ? (
        <Box className={classes.app_content}>
          <Box className="child_bg">
            <Grid
              container
              direction="column"
              alignItems="center"
              className="card"
            >
              <Grid
                item
                direction="row"
                alignItems="center"
                className="card_title"
                style={{
                  background:
                    choose === questions[current]?.apply
                      ? '#42DC76'
                      : '#FF5CB8',
                }}
              >
                <Box
                  className={
                    choose === questions[current]?.apply
                      ? 'yes_icon'
                      : 'no_icon'
                  }
                ></Box>
                <Typography className="title">
                  {choose === questions[current]?.apply
                    ? 'せいかい！'
                    : 'ふせいかい！'}
                </Typography>
              </Grid>
              <img
                className="card_image"
                src={
                  questions[current]?.url
                    ? questions[current]?.url
                    : quizDefault
                }
              />
              <Typography className="explan_message">
                {questions[current]?.explanation
                  .replaceAll('。', '。\n')
                  .replaceAll('？', '？\n')}
              </Typography>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box className={classes.app_content}>
          <Box className="adult_bg">
            <Grid
              container
              direction="column"
              alignItems="center"
              className="card"
            >
              <Grid
                item
                direction="row"
                alignItems="center"
                className="card_title"
                style={{
                  background:
                    choose === questions[current]?.apply
                      ? '#42DC76'
                      : '#FF5CB8',
                }}
              >
                <Box
                  className={
                    choose === questions[current]?.apply
                      ? 'yes_icon'
                      : 'no_icon'
                  }
                ></Box>
                <Typography className="title" style={{ marginLeft: '20px' }}>
                {choose === questions[current]?.apply
                      ? '正解！'
                      : '不正解'}
                </Typography>
              </Grid>
              <img
                className="card_image"
                src={
                  questions[current]?.url
                    ? questions[current]?.url
                    : quizDefault
                }
              />
              <Typography className="explan_message">
                {questions[current]?.explanation
                  .replaceAll('。', '。\n')
                  .replaceAll('？', '？\n')}
              </Typography>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default QuizReadyExplanation;

export { QuizReadyExplanation };
