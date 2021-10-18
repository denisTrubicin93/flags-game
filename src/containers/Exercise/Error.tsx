import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import NoCard from './assets/13_Error/NoCard.png';
import { PrevBtn, RequestHelpBtn } from '../../components/common/button';

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
      width: 240px;
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
      '& .noCard': `
        position: absolute;
        width: 512px;
        height: 512px;
        top: 214px;
        left: calc(50% - 512px/2);

        background: url(${NoCard}) no-repeat center;
      `,
      '& .box_message': `
        /* ステッカーが足りません。
        店員呼び出し中。 */
        position: absolute;
        width: 855px;
        height: 337px;
        left: 115px;
        top: 1206px;
      `,
      '& .text_message': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 70px;
        line-height: 101px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
    },
  })
);

const ScanCardError = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn
            onTap={() => {
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
          <Box className="noCard" />
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
              エラー
            </Typography>
          </Grid>
          <Grid item xs container alignItems="center" justify="center">
            <Typography className="text_message">
              カードが足りません。
            </Typography>
          </Grid>
          <Grid item xs container alignItems="center" justify="center">
            <Typography className="text_message">
              店員を呼び出し中。
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ScanCardError;

export { ScanCardError };
