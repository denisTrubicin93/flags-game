import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid, Typography } from '@material-ui/core';

import Base from './assets/9_Failure/Base.png';
import ThumbsDown from './assets/9_Failure/ThumbsDown.png';
import { MenuBtn } from '../../components/common/button/MenuBtn';
import { PrevBtn, RequestHelpBtn } from '../../components/common/button';
import { Profile } from '../../components/common/profile/Profile';
import { useHistory } from 'react-router-dom';
import { useModeExercise } from './useModeExercise';

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
      `,
      '& .request_help': `
        /* Request_Help */


        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
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
      '& .thumbs_down': `
        position: absolute;
        width: 173px;
        height: 179px;
        top: 60px;
        left: calc(50% - 173px/2);

        background: url(${ThumbsDown}) no-repeat center;
      `,
      '& .box_message': `
        /* 残念！ 再度チャレンジしてね！ */
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
      '& .text_experience': `
        /* ＋10スクワット経験値 */


        position: absolute;
        width: 100%;
        height: 48px;
        top: 945px;

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
      zIndex: 0,
    },
    baseOpacity: {
      position: 'absolute',
      width: '807px',
      height: '452px',
      left: '139px',
      top: '1318px',
      opacity: 0.74,
      background: `url(${Base}) no-repeat center`,
    }
  })
);

const Failure = () => {
  const classes = useStyles();
  const history = useHistory();
  const { mode, config } = useModeExercise();

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn
            onTap={(e: any) => {
              history.push('scenes');
            }}
          />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        {/* <Typography className="text_hello">こんにちは</Typography>
        <Typography className="text_welcome">ミラーへようこそ！</Typography> */}
        <Box className="barcode_scan">
          <Box className="thumbs_down" />
        </Box>
        <Grid
          className="box_message"
          container
          direction="column"
          alignItems="center"
          justify="space-around"
        >
          <Grid item xs container alignItems="center" justify="center">
            <Typography className="text_message">残念！</Typography>
          </Grid>
          <Grid item xs container alignItems="center" justify="center">
            <Typography className="text_message">
              再度チャレンジしてね！
            </Typography>
          </Grid>
        </Grid>
        <Typography className="text_experience">
          ＋{config.exp.failure}{config.name}経験値
        </Typography>
        <Box className="img_squat">
          <img src={config.icon} />
        </Box>
        <Typography className="text_squat">{config.name}</Typography>

        <Box className="box_profile">
          <Profile tagText={`+${config.exp.failure}`} size="small" />
        </Box>

        <Box className={classes.baseOpacity} />
        <Box className={classes.base}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-evenly"
            style={{ height: '100%', width: '100%' }}
          >
            <Grid item>
              <MenuBtn label="経験値を保存" color="primary"
                onTap={() => {
                  history.push('experienceSave');
                }}
              />
            </Grid>
            <Grid item>
              <MenuBtn label="メニューへ戻る" color="secondary"
                onTap={() => {
                  history.push('scenes');
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Failure;

export { Failure };
