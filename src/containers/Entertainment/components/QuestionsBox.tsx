import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography, Grid } from '@material-ui/core';
import { HoverEffectBtn } from '../../../components/common/button/HoverEffectBtn';

import cardground from '../assets/cardground.svg';
import topLeft from '../../../components/common/svg/gesture/L1.png';
import downLeft from '../../../components/common/svg/gesture/L2.png';
import topRight from '../../../components/common/svg/gesture/R1.png';
import downRight from '../../../components/common/svg/gesture/R2.png';

const useStyles = makeStyles(() =>
  createStyles({
    questions: {
      position: 'absolute',
      left: '8.8%',
      right: '8.33%',
      top: '21.98%',
      bottom: '6.3%',

      textAlign: 'center',
      background: `url(${cardground}) no-repeat center`,
      borderRadius: '20px',
      '& .title_question': `
        /* スクワット */

        margin: 50px auto 0;
        height: 332px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 116px;
        /* identical to box height */

        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        white-space: pre-line;
      `,
      '& .avatar_style': `
        position: absolute;
        margin: 20px auto 0;
        width: 256px;
        height: 256px;
        left: 320px;
        top: 150px;
        border-radius: 5px;

      `,
      '& .answerCard': `
        // margin: 21px;
        margin: 60px 30px 0 30px;
        display: inline-block;
        border-radius: 64.8353px;
      `,
      '& .answerCard.hideborder .normal': `
        border-color: #FFF0;
      `,
      '& .answerCardBackground-0': `
        background: linear-gradient(90deg, #00D2FF 0%, #3A7BD5 100%);
      `,
      '& .answerCardBackground-1': `
        background: linear-gradient(135deg, #FCCF31 0%, #F55555 100%);
      `,
      '& .answerCardBackground-2': `
        background: linear-gradient(90deg, #DA22FF 0%, #9733EE 100%);
      `,
      '& .answerCardBackground-3': `
        background: linear-gradient(135deg, #97ABFF 0%, #123597 100%);
      `,
      '& .answerCheck': `
        margin: 30px 30px 0 30px;
        width: 301.16px;
        height: 136.33px;
        border-radius: 32.3493px;
      `,
      '& .answerCheckBackground-0': `
        background: #095CAA;
        box-shadow: 0px 3.08088px 38.511px rgba(27, 111, 172, 0.8);
      `,
      '& .answerCheckBackground-1': `
        background: #E04839;
        box-shadow: 0px 3.08088px 38.511px rgba(224, 72, 57, 0.8);
      `,
      '& .answerCheckBackground-2': `
        background: #7C1DB8;
        box-shadow: 0px 3.08088px 38.511px rgba(158, 39, 170, 0.8);
      `,
      '& .answerCheckBackground-3': `
        background: #2847A6;
        box-shadow: 0px 3.08088px 38.511px rgba(58, 123, 213, 0.8);
      `,
      '& .answerCheck .answerCheckText': `
        padding-top: 15.8px;

        font-family: Poppins;
        font-style: normal;
        font-weight: bold;
        font-size: 69.299px;
        line-height: 104px;

        color: #FFFFFF;
      `,
      '& .answerCard .answer': `
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;

          font-family: Poppins;
          font-style: normal;
          font-weight: bold;
          font-size: 42.9235px;
          line-height: 64px;
          text-align: center;

          color: #FFFFFF;
      `,
      '& .answer': `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: bold;
      font-size: 42.9235px;
      line-height: 62px;
      text-align: center;
      color: #FFFFFF;
    `,
    },
  })
);
const getTypeList = (num: number) => {
  switch (num) {
    case 1:
      return [
        ['L1', 'R1', 'L2', 'R2'],
        ['L1', 'R1', 'L2', 'R2'],
        ['L1', 'R1', 'L2', 'R2'],
        ['L1', 'R1', 'L2', 'R2'],
      ];
    case 2:
      return [
        ['L1', 'L2'],
        ['R1', 'R2'],
        ['L1', 'L2'],
        ['R1', 'R2'],
      ];
    case 3:
      return [['L1'], ['R1'], ['L2', 'R2'], ['L2', 'R2']];
    case 4:
      return [['L1'], ['R1'], ['L2'], ['R2']];
    default:
      return [['L1'], ['R1'], ['L2'], ['R2']];
  }
};

export type Questions = {
  question: string;
  avatar?: any;
  correctCheck?: string;
  time?: number;
  answers: {
    type: 'normal' | 'color';
    color?: string;
    check: string;
    answer: string;
    value?: string;
  }[];
}[];

interface QuestionsBoxProps {
  questions: Questions;
  questionIndex: number;
  nextQuestion: (questionIndex: number, value: string) => void;
  withBorder?: boolean;
  numOf?: number;
}

const QuestionsBox: React.FC<QuestionsBoxProps> = ({
  questions,
  questionIndex,
  nextQuestion,
  withBorder,
  numOf = 4,
}) => {
  const classes = useStyles();
  const answerTitle = ['A', 'B', 'O', 'AB'];
  const typeList = getTypeList(numOf);
  
  return (
    <Box className={classes.questions}>
      <Typography className="title_question">
        {questions[questionIndex].question}
      </Typography>
      <Avatar className="avatar_style" src={questions[questionIndex].avatar} />
      {questions[questionIndex].answers.map((item, index) => (
        <HoverEffectBtn
          className={`answerCard answerCardBackground-${index} ${
            withBorder ? '' : 'hideborder'
          }`}
          key={item.check}
          radius={50}
          onTap={() => nextQuestion(questionIndex, item.value)}
          type={typeList[index]}
        >
          {/* <Box
            className={`answerCheck answerCheckBackground-${index}`}
            style={
              item.type === 'color'
                ? {
                    background: item.color,
                  }
                : {}
            }
          >
            <Typography className="answerCheckText">{item.check}</Typography>
          </Box> */}
          <Grid
            container
            justify="center"
            alignItems="center"
            className={`answerCheck answerCheckBackground-${index}`}
          >
            <img
              src={
                answerTitle[index] == 'A'
                  ? topLeft
                  : answerTitle[index] == 'B'
                  ? topRight
                  : answerTitle[index] == 'O'
                  ? downLeft
                  : downRight
              }
              width={120}
              height={120}
            />
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            className="answer_container"
          >
            <Typography className="answer">{item.check}</Typography>
          </Grid>
        </HoverEffectBtn>
      ))}
    </Box>
  );
};

export default QuestionsBox;
