import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  PrevBtn,
  RequestHelpBtn,
  MenuBtn,
} from '../../../components/common/button';
import portrait from './assets/Skin_Beautify/portrait.png';
import skinBeautifyMask from './assets/Skin_Beautify/skinBeautifyMask.svg';

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
        z-index: -300;
      `,
      '& .containner': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        top: 0px;
        overflow: hidden;
      `,
      '& .up': `
        position: absolute;
        width: 1085px;
        height: 1617px;
        left: 1px;
        top: -39px;
        background: url(${portrait}) no-repeat;
        z-index: 1;
      `,
      '& .skinBeautifyMask': `
        position: absolute;
        top: 0px;
        right: 0px;
      `,
      '& .vector': `
        position: absolute;
        left: 90px;
        top: 66px;
        display: none;
      `,
      '& .request_help': `
        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 77px;
        border-radius: 100px;
        display: none;
      `,
      '& .down': `
        position: absolute;
        width: 1080px;
        height: 420px;
        left: 0px;
        top: 1500px;
        background: linear-gradient(99.99deg, #250055 -5.81%, #5300FF 106.67%);
        z-index: 2;
      `,
      '& .title': `
        position: absolute;
        width: 464px;
        height: 54px;
        left: 308px;
        top: 1551px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 50px;
        line-height: 54px;
        color: #FFFFFF;
      `,
      '& .skinAnalysisMask': `
        position: absolute;
        width: 665.38px;
        height: 824.24px;
        left: 209.81px;
        top: 293.73px;
      `,
      '& .count': `
        position: absolute;
        width: 92.91px;
        height: 35.97px;
        left: 125.88px;
        top: 1303.79px;
        font-family:  Noto Sans JP;
        font-style: normal;
        font-weight: 500;
        font-size: 71.9333px;
        line-height: 36px;
        text-align: center;
        color: #FF4444;
      `,
      '& .acne': `
        position: absolute;
        width: 164.85px;
        height: 35.97px;
        left: 89.92px;
        top: 1375.72px;
        font-family:  Noto Sans JP;
        font-style: normal;
        font-weight: 500;
        font-size: 32.9694px;
        line-height: 36px;
        text-align: center;
        color: #FFFFFF;
      `,
      '& .next_btn': `
        position: absolute;
        width: 333px;
        height: 116px;
        left: 180px;
        top: 1668px;
      `,
      '& .back_btn': `
        position: absolute;
        width: 333px;
        height: 116px;
        left: 567px;
        top: 1668px;
        background: linear-gradient(101.84deg, #000000 2.78%, #3297B8 2.79%, #17576F 98.95%);
      `,
    },
  })
);

const SkinBeautify = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="containner">
            <Box className="up">
              <img className="skinBeautifyMask" src={skinBeautifyMask} />
            </Box>
            <Box className="down"></Box>
          </Box>
        </Box>
        <Box className="vector">
          <PrevBtn onTap={() => history.push('skinFood')} />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        <Typography className="title">若返り写真を作成！</Typography>
        <MenuBtn
          className="next_btn"
          label="確認"
          color="primary"
          onTap={(e: any) => {
            history.push('skinQRCodeScan');
          }}
          type={['L1', 'L2']}
        />
        <MenuBtn
          className="back_btn"
          label="戻る"
          color="primary"
          onTap={(e: any) => {
            history.push('menu');
          }}
          type={['R1', 'R2']}
        />
      </Box>
    </>
  );
};

export default SkinBeautify;

export { SkinBeautify };
