import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { HoverEffectBtn } from '../../../components/common/button/HoverEffectBtn';
import topLeft from '../../../components/common/svg/gesture/L1.png';
import downLeft from '../../../components/common/svg/gesture/L2.png';
import topRight from '../../../components/common/svg/gesture/R1.png';

const useStyles = makeStyles(() =>
  createStyles({
    quizBox: {
      '& .answerCard': `
        border-radius: 65px;
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
      '& .titleCard': `
        height: 135px;
        border-radius: 32px;
      `,
      '& .titleCardBackground-0': `
        background: #095CAA;
        box-shadow: 0px 3.08088px 38.511px rgba(27, 111, 172, 0.8);
      `,
      '& .titleCardBackground-1': `
        background: #E04839;
        box-shadow: 0px 3.08088px 38.511px rgba(224, 72, 57, 0.8);
      `,
      '& .titleCardBackground-2': `
        background: #7C1DB8;
        box-shadow: 0px 3.08088px 38.511px rgba(158, 39, 170, 0.8);
      `,
      '& .titleCardBackground-3': `
        background: #2847A6;
        box-shadow: 0px 3.08088px 38.511px rgba(58, 123, 213, 0.8);
      `,
      '& .answer_container': `
        height: 180px;
        overflow: hidden;
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

interface QuizBoxProps {
  index: number;
  answer: string;
  onChoose: (choose: number) => void;
  numOf?: number;
  isChild?: boolean;
}

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

const QuizBox: React.FC<QuizBoxProps> = ({
  index,
  answer,
  onChoose,
  numOf = 4,
}) => {
  const classes = useStyles();
  const answerTitle = ['A', 'B', 'C'];
  const typeList = getTypeList(numOf);

  return (
    <Box className={classes.quizBox}>
      <HoverEffectBtn
        className={`answerCard answerCardBackground-${index}`}
        onTap={() => onChoose(index)}
        radius={65}
        style={{ width: '100%', padding: 30 }}
        type={typeList[index]}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={`titleCard titleCardBackground-${index}`}
        >
          <img
            src={
              answerTitle[index] == 'A'
                ? topLeft
                : answerTitle[index] == 'B'
                ? topRight
                : downLeft
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
          <Typography className="answer">
            {answer.length > 20
              ? answer?.substring(0, 20).concat('...')
              : answer}
          </Typography>
        </Grid>
      </HoverEffectBtn>
    </Box>
  );
};

export default QuizBox;
