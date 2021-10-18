import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';
import HeaderBg from '../assets/Omikuji/omnikuji-header.png';
import TinyOmnikujiIcon from '../assets/Omikuji/omnikuji-small.png';
import TimerCountdown from '../../../components/common/TimerCountdown';
import {
  BACKGROUND,
  BLUR_TITLE,
  BOTTOM_BG,
  CARD,
  CARD_SHADOW,
  COUNTER,
  COUNTER_NOTE,
  TOP_BG,
} from '../../common/styles';
import useFootControl from '../../../components/common/hook/useFootControl';

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
        '& .top_bg': {
          ...TOP_BG,
          background: `url(${HeaderBg}) center no-repeat `,
        },
        '& .bottom_bg': {
          ...BOTTOM_BG,
          '& .blur_title': {
            ...BLUR_TITLE,
          },
          '& .card': {
            ...CARD,
            background:
              'linear-gradient(180deg, #FED17C 0%, #FFBA37 100%), #FFC14B;',
            '& .icon': {
              width: 200,
              height: 200,
              background: `url(${TinyOmnikujiIcon}) center no-repeat`,
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
              display: 'flex',
            },
          },
          '& .card_shadow': {
            ...CARD_SHADOW,
            background: '#FF7E9D33',
            opacity: 1,
          },
          '& .counter': {
            ...COUNTER,
          },
          '& .counter_note': {
            ...COUNTER_NOTE,
          },
        },
      },
    },
  })
);

const Omikuji = () => {
  const classes = useStyles();
  const history = useHistory();

  const onShoot = () => {
    history.push('omikujiQuestions');
  };

  useFootControl({
    intitialIndex: 0,
    actions: [],
    goBack: () => history.push('menu'),
  });

  return (
    <Box className={classes.app_content}>
      <Box className="background">
        <Box className="top_bg"></Box>
        <Box className="bottom_bg">
          <Typography className="blur_title">ゲームせつめい</Typography>
          <Grid container direction="column" className="card">
            <Grid container direction="row" alignItems="center">
              <Box className="icon"></Box>
              <Typography className="title">おみくじ</Typography>
            </Grid>
            <Typography className="card_body">
              あなたの運勢を占ってくれるよ！ 今日の運勢を占ってもらおう！
            </Typography>
          </Grid>
          <Box className="card_shadow" />
          <TimerCountdown className="counter" seconds={3} onShoot={onShoot} />
          <Typography className="counter_note">ゲームスタートまで</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Omikuji;

export { Omikuji };
