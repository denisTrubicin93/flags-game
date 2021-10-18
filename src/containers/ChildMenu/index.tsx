import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';

import MiddleBar from '../../components/common/MiddleBar';
import { FancyBorderBtn } from '../../components/common/button';
import exercise from './assets/exercise.png';
import quiz from './assets/quiz.png';
import backArrow from '../../components/common/button/assets/back_arrow.png';

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
        border-radius: 70px;
      `,
    },
  })
);

const ChildMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />

        <Grid
          style={{ position: 'absolute', top: 425 }}
          container
          justify="space-around"
          alignItems="center"
        >
          <FancyBorderBtn
            size="large"
            onTap={() => {
              history.push('fitness');
            }}
            icon={exercise}
            title="たいそうチャレンジ"
            type={['L1']}
          />
          <FancyBorderBtn
            size="large"
            onTap={() => {
              history.push('quiz');
            }}
            icon={quiz}
            title="クイズ"
            type={['R1', 'R2']}
          />
        </Grid>

        <MiddleBar title="手をまえにかざして" subTitle="そうさしてね！" />
        <Grid
          style={{ position: 'absolute', top: 1272 }}
          container
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs container justify="center">
            <FancyBorderBtn
              size="large"
              onTap={() => {
                history.push('scenes');
              }}
              icon={backArrow}
              title="さいしょにもどる"
              type={['L2']}
            />
          </Grid>
          <Grid item xs />
        </Grid>

      </Box>
    </>
  );
};

export default ChildMenu;

export { ChildMenu };
