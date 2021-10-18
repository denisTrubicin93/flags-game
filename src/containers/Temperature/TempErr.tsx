import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Warning from './assets/Temp_NG/Warning.png';
import UserCross from './assets/Temp_NG/User_Cross.png';
import { RequestHelpBtn } from '../../components/common/button';
import { useTimeout } from '../../components/common/hook/useTimeout';
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
        height: 114px;userLocaton
        left: 647px;
        top: 44px;

        border-radius: 100px;
      `,
      '& .warning': `
        position: absolute;
        width: 256px;
        height: 256px;
        top: 496px;
        left: calc(50% - 256px/2);

        background: url(${Warning}) no-repeat center;
      `,
      '& .userCross': `
        position: absolute;
        width: 256px;
        height: 256px;
        top: 832px;
        left: calc(50% - 256px/2);

        background: url(${UserCross}) no-repeat center;
      `,
      '& .message_containner': `
        position: absolute;
        width: 519px;
        height: 224px;
        left: calc(50% - 519px/2);
        top: 1201px;
        text-align: center;
      `,
      '& .message': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: normal;
        font-size: 96px;
        line-height: 100%;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .text_info': `
        position: absolute;
        width: 795px;
        height: 276px;
        left: 143px;
        top: 1250px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 400;
        font-size: 56px;
        line-height: 56px;
        text-align: center;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px #000000;
      `,
    },
  })
);

const TempErr = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  useTimeout(() => history.push('scenes'), 10000);

  useFootControl({
    goBack: () => history.push('menu'),
  });
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="warning" />
        <Box className="userCross" />
        {/* <Box className="message_containner">
          <Typography className="message">現在の体温{location.state.temp}°C</Typography>
        </Box> */}
        <Typography className="text_info">
          検温できませんでした。<br/>もう一度やり直してください。
        </Typography>
      </Box>
    </>
  );
};

export default TempErr;

export { TempErr };
