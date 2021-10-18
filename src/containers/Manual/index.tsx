import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';

import MiddleBar from '../../components/common/MiddleBar';
import L1 from '../../components/common/svg/gesture/L1.png';
import L2 from '../../components/common/svg/gesture/L2.png';
import R1 from '../../components/common/svg/gesture/R1.png';
import R2 from '../../components/common/svg/gesture/R2.png';
import normal from './assets/normal.png';
import active from './assets/active.png';
import rightArrow from './assets/right-arrow.png';
import notice from './assets/notice.png';
import TimerCountdown from '../../components/common/TimerCountdown';
import {
  DeviceService
} from '../../service/DeviceService';
import { FancyBorderBtn } from '../../components/common/button';

const useStyles = makeStyles(() =>
  createStyles({
    '@keyframes blink': {
      "100%": { opacity: 0 },
    },
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
      '& .manual_title': `
        position: absolute;
        left: 353px;
        top: 271px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 96px;
        line-height: 139px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .manual_gesture_title': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 70px;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .manual_btn_title': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 47.7233px;
        line-height: 69px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #DFDEDF;
        text-shadow: 0px 2.38616px 2.38616px rgba(0, 0, 0, 0.5);
      `,
      '& .manual_counter': `
        position: absolute;
        left: 969px;
        top: 442px;
        z-index: 100;
      `,
      '& .manual_button': `
        position: absolute;
        left: 842px;
        top: 472px;
      `,
      '& .manual_notice': `
        position: absolute;
        left: 588.67px;
        top: 541.67px;
        animation: $blink 1s ease-out 0s infinite alternate;
      `,
      '& .manual_guide_message':  `
        position: absolute;
        left: 121px;
        top: 1564px;
        width: 892px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 96px;
        line-height: 139px;
        text-align: center;
        letter-spacing: -0.04em;

        color: #DFDEDF;
        text-shadow: 0px 2.38616px 2.38616px rgba(0, 0, 0, 0.5);
        animation: $blink 1s ease-out 0s infinite alternate;
      `
    },
    countdownContainer: {
      width: '10px',
      height: '10px'
    },
    countdownText: {
      fontSize: '10px',
    }
  })
);

const Manual = () => {
  const classes = useStyles();
  const history = useHistory();

  const onShoot = () => {
    let personDetecter= DeviceService.default();
    personDetecter.faceRecognition()
    history.push('scenes');
  };

  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowNotice(true);
    }, 2000);
  }, []);

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />

        <Typography className="manual_title">操作方法</Typography>

        <Box style={{ position: 'absolute', top: 465, width: '100%' }}>
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs container justify="center" alignItems="center">
              <Typography className="manual_gesture_title">左上</Typography>
              <img src={L1} alt="L1" />
            </Grid>
            <Grid item xs container justify="center" alignItems="center">
              <img src={R1} alt="R1" />
              <Typography className="manual_gesture_title" style={{ zIndex: 100, transform: 'translate(15px, -6px)' }}>右上</Typography>
            </Grid>
          </Grid>
          <Grid
            style={{ marginTop: 115 }}
            container
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs container justify="center" alignItems="center">
              <Typography className="manual_gesture_title">左下</Typography>
              <img src={L2} alt="L2" />
            </Grid>
            <Grid item xs container justify="center" alignItems="center">
              <img src={R2} alt="R2" />
              <Typography className="manual_gesture_title">右下</Typography>
            </Grid>
          </Grid>
        </Box>

        <MiddleBar
          title="手を前にかざして"
          subTitle="４つの方向でボタンを選択！"
        />

        <Grid
          style={{ position: 'absolute', top: 1320 }}
          container
          alignItems="center"
        >
          <Grid
            item
            xs
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography className="manual_btn_title">ボタンが正しく</Typography>
            <Typography className="manual_btn_title">選択されると</Typography>
            <Box>
              <Box className="manual_btn_title" style={{ display: 'inline-block' }}>周りが</Box>
              <Box className="manual_btn_title" style={{ display: 'inline-block', color: 'limegreen' }}>みどり</Box>
              <Box className="manual_btn_title" style={{ display: 'inline-block' }}>になるよ！</Box>
            </Box>
          </Grid>
          <Grid item xs container alignItems="center">
            <img src={normal} alt="normal_btn" />
            <img src={rightArrow} alt="right_arrow" />
            <img src={active} alt="active_btn" />
          </Grid>
        </Grid>

        <TimerCountdown className="manual_counter" seconds={10} onShoot={onShoot}
          containerStyle={{ width: '91px', height: '91px' }}
          textStyle={{ fontSize: '50px', lineHeight: '76px' }}
        />
        <FancyBorderBtn
          size="xs"
          className="manual_button"
          type={['R1']}
          onTap={onShoot}
          gestureGuide={false}
        />
        <img src={notice} alt="notice" className="manual_notice" style={{ visibility: showNotice ? 'visible' : 'hidden' }}/>
        <Typography className="manual_guide_message" style={{ visibility: showNotice ? 'visible' : 'hidden' }}>
          右上のボタンを<br />
          選択してみよう！
        </Typography>
      </Box>
    </>
  );
};

export default Manual;

export { Manual };
