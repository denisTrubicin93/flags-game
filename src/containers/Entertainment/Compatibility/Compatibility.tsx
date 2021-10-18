import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';

import {
  BACKGROUND,
  TOP_BG,
  BOTTOM_BG,
  BLUR_TITLE,
  CARD,
  CARD_SHADOW,
  COUNTER,
  COUNTER_NOTE,
} from '../../common/styles';
import TopBg from '../assets/Compatibility/compatibility_top_bg.png';
import CompatibilityIcon from '../assets/Compatibility/compatibility_icon.png';
import TimerCountdown from '../../../components/common/TimerCountdown';
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
          background: `url(${TopBg}) center no-repeat `,
        },
        '& .bottom_bg': {
          ...BOTTOM_BG,
          '& .blur_title': {
            ...BLUR_TITLE,
          },
          '& .card': {
            ...CARD,
            background:
              'linear-gradient(180deg, #FF7E9D 0%, #FF5C84 100%), #FF7E9D;',
            '& .icon': {
              width: 200,
              height: 200,
              background: `url(${CompatibilityIcon}) center no-repeat`,
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

const Compatibility = () => {
  const classes = useStyles();
  const history = useHistory();

  const onShoot = () => {
    history.push('compatibilityCapturePhoto');
  };

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="top_bg"></Box>
          <Box className="bottom_bg">
            <Typography className="blur_title">ゲームせつめい</Typography>
            <Grid container direction="column" className="card">
              <Grid container direction="row" alignItems="center">
                <Box className="icon"></Box>
                <Typography className="title">相性診断</Typography>
              </Grid>
              <Typography className="card_body">
                2人でカメラの前に左右に立ち
                <br /> 相性診断をしてみよう！
                <br /> ミラーが2人の相性を
                <br /> うらなってくれるよ！
              </Typography>
            </Grid>
            <Box className="card_shadow" />
            <TimerCountdown
              className="counter"
              seconds={3}
              onShoot={onShoot}
            />
            <Typography className="counter_note">ゲームスタートまで</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Compatibility;

export { Compatibility };
