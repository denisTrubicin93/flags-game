import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Base from './assets/8_Success/Base.png';
import ThumbsUp from './assets/8_Success/ThumbsUp.png';
import { PrevBtn, RequestHelpBtn } from '../../components/common/button';
import Jump from './assets/8_Success/Jump.png';
import { Profile } from '../../components/common/profile/Profile';
import { useModeExercise } from './useModeExercise';
import { useSelector } from 'react-redux';
import { RootState } from '../../features';

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
      '& .vector': `
        /* Vector */


        position: absolute;
        left: 90px;
        top: 66px;
        display: none;
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
      '& .text_hello': `
      /* こんにちは */


      position: absolute;
      width: 200px;
      height: 22px;
      left: 90px;
      top: 209px;

      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 22px;
      /* identical to box height, or 55% */


      color: #FFFFFF;

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      `,
      '& .text_welcome': `
      /* ミラーへようこそ！ */


      position: absolute;
      width: 594px;
      height: 40px;
      left: 90px;
      top: 274px;

      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: 900;
      font-size: 66px;
      line-height: 40px;
      /* identical to box height, or 61% */


      /* Label / Dark / Primary */

      color: #FFFFFF;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      `,
      '& .barcode_scan': `
        /* Barcode_Scan */


        position: absolute;
        left: 95px;
        top: 422px;
        width: 895px;
        height: 1377px;
        background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        border-radius: 20px;
      `,
      '& .thumbs_up': `
        position: absolute;
        width: 173px;
        height: 179px;
        top: 60px;
        left: calc(50% - 173px/2);

        background: url(${ThumbsUp}) no-repeat center;
      `,
      '& .box_message': `
        position: absolute;
        width: 855px;
        height: 274px;
        left: 115px;
        top: 654px;
      `,
      '& .text_message': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 70px;
        line-height: 101px;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .text_description': `
        position: absolute;
        width: 100%;
        height: 48px;
        top: 917px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 600;
        font-size: 40px;
        line-height: 48px;
        text-align: center;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .img_squat': `
        position: absolute;
        width: 188px;
        height: 188px;
        top: 1053px;
        left: 158px;
      `,
      '& .text_squat': `
        /* スクワット */


        position: absolute;
        height: 70px;
        top: 1111px;

        left: 45%;
        margin-right: -45%;
        transform: translate(-45%, 0);
        -webkit-transform: translate(-45%, 0);
        -ms-transform: translate(-45%, 0);

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 48px;
        line-height: 70px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .text_level': `
        height: 20px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        line-height: 20px;
        /* identical to box height, or 77% */

        text-align: center;
        /* Label / Dark / Primary */

        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .box_level': `
        /* Level */

        position: absolute;
        width: 118px;
        height: 48px;
        left: 677px;
        top: 1139px;
        text-align: center;
        background: linear-gradient(166.86deg, rgba(255, 255, 255, 0.26) -0.22%, rgba(255, 255, 255, 0.0781197) 63.98%, rgba(255, 255, 255, 0) 100%);
        border-radius: 50px 0px 0px 50px;
      `,
      '& .box_label_bg': `
        /* Level */


        position: absolute;
        width: 118px;
        height: 48px;
        left: 677px;
        top: 1126px;

        background: radial-gradient(50% 50% at 50% 50%, #8DFDB5 0%, #1ED760 100%);
        border-radius: 60px 0px 0px 60px;
      `,
      '& .jump': `
      /* Jump */
      position: absolute;
      left: 42.13%;
      right: 41.67%;
      top: 73.28%;
      bottom: 17.6%;
      background: url(${Jump}) no-repeat center;
    `,
      '& .box_info': `
      /* ステッカーをスキャンして ARコンテンツへ 無料アクセス！ */
      position: absolute;
      width: 496px;
      height: 204px;
      left: 267px;
      top: 60px;
    `,
      '& .text_info': `
      position: absolute;
      width: 621px;
      height: 50px;
      left: 234px;
      top: 1629px;

      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: 600;
      font-size: 60px;
      line-height: 50px;
      /* identical to box height, or 83% */

      text-align: center;

      color: #FFFFFF;

      text-shadow: 0px 4px 4px #000000;
    `,
    '& .box_profile': `
    position: absolute;
    left: 677px;
    top: 1090px;
  `,
    },
    base: {
      position: 'absolute',
      width: '807px',
      height: '452px',
      left: '139px',
      top: '1318px',
      opacity: '0.74',
      background: `url(${Base}) no-repeat center`,
    },
  })
);

const GameProgress = () => {
  const classes = useStyles();
  const history = useHistory();
  const { mode, config } = useModeExercise();
  const result = useSelector<RootState, 'success' | 'failure' | undefined>(state => state.exercise.data?.result);

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn onTap={(e: any) => history.push('scenes')} />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        {/* <Typography className="text_hello">こんにちは</Typography>
        <Typography className="text_welcome">ミラーへようこそ！</Typography> */}
        <Box className="barcode_scan">
          <Box className="thumbs_up" />
        </Box>
        <Grid
          className="box_message"
          container
          direction="column"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs container alignItems="center" justify="center">
            <Typography className="text_message">
              転送成功！
            </Typography>
          </Grid>
        </Grid>
        <Typography className="text_description">
          レベル２にレベルアップ！
        </Typography>
        <Box className="img_squat">
          <img src={config.icon} />
        </Box>
        <Typography className="text_squat">{config.name}</Typography>

        <Box className="box_profile">
          <Profile tagText="Level 2" size="small" />
        </Box>
        <Box className={classes.base} />
        <Box className="jump" />
        {result && result === 'success' &&
          <Typography className="text_info">＋{config.exp.success} 経験値</Typography>
        }
        {!result || result === 'failure' &&
          <Typography className="text_info">＋{config.exp.failure} 経験値</Typography>
        }
      </Box>
    </>
  );
};

export default GameProgress;

export { GameProgress };
