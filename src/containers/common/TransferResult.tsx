import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';

import thumbsUp from './assets/Transfer_Result/thumbsUp.svg';
import { PrevBtn, RequestHelpBtn } from '../../components/common/button';
import { Profile } from '../../components/common/profile/Profile';

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
        top: 44px;
        border-radius: 100px;
        display: none;
      `,
      '& .text_hello': `
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
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
      `,
      '& .text_welcome': `
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
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
      `,
      '& .barcode_scan': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 6.3%;
        background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        border-radius: 20px;
      `,
      '& .thumbs_up': `
        position: absolute;
        width: 173px;
        height: 179px;
        top: 60px;
        left: calc(50% - 173px/2);
        background: url(${thumbsUp}) no-repeat center;
      `,
      '& .box_message': `
        position: absolute;
        width: 855px;
        height: 274px;
        left: 115px;
        top: 654px;
      `,
      '& .text_message': `
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 274px;
        top: 654px;
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
        height: 58px;
        top: 917px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 58px;
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .img_squat': {
        position: 'absolute',
        width: 188,
        height: 188,
        top: 1053,
        left: 158,
        background: props => `url(${props.itemIcon}) no-repeat center`,
      },
      '& .text_squat': `
        position: absolute;
        left: 381px;
        top: 1117px;
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 58px;
        text-align: center;
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
        text-align: center;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .box_level': `
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
        position: absolute;
        width: 118px;
        height: 48px;
        left: 677px;
        top: 1126px;

        background: radial-gradient(50% 50% at 50% 50%, #8DFDB5 0%, #1ED760 100%);
        border-radius: 60px 0px 0px 60px;
      `,
      '& .coin': {
        position: 'absolute',
        left: '42.13%',
        right: '41.67%',
        top: '73.28%',
        bottom: '17.6%',
        background: props => `url(${props.pointIcon}) no-repeat center`,
      },
      '& .box_info': `
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
    base1: `
      position: absolute;
      width: 807px;
      height: 452px;
      left: 139px;
      top: 1318px;
      background: radial-gradient(50% 50% at 50% 50%, #202020 0%, #000000 100%);
      border-radius: 50px;
      opacity: 0.74;
    `,
    base2: `
      position: absolute;
      width: 807px;
      height: 452px;
      left: 139px;
      top: 1318px;
      background: linear-gradient(166.86deg, rgba(0, 0, 0, 0) -0.22%, rgba(0, 0, 0, 0.0781197) 60.48%, rgba(0, 0, 0, 0.26) 100%);
      mix-blend-mode: overlay;
      border-radius: 50px;
      opacity: 0.74;
    `,
  })
);

interface TransferResultProps {
  itemIcon: any;
  itemTitle: string;
  pointIcon: any;
  pointTitle: string;
  onClose: Function;
  onNext: Function;
}

const TransferResult = (props: TransferResultProps) => {
  const { itemTitle, pointTitle, onClose, onNext } = props;
  const classes = useStyles(props);

  React.useEffect(() => {
    const timeout = setTimeout(onNext, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn onTap={onClose} />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        {/* <Typography className="text_hello">こんにちは</Typography>
        <Typography className="text_welcome">ミラーへようこそ！</Typography> */}
        <Box className="barcode_scan">
          <Box className="thumbs_up" />
        </Box>
        <Typography className="text_message">転送成功！</Typography>
        <Typography className="text_description">
          レベル２にレベルアップ！
        </Typography>
        <Box className="img_squat"></Box>
        <Typography className="text_squat">{itemTitle}</Typography>

        <Box className="box_profile">
          <Profile tagText="Level 2" size="small" />
        </Box>
        <Box className={classes.base1} />
        <Box className={classes.base2} />
        <Box className="coin" />
        <Typography className="text_info">{pointTitle}</Typography>
      </Box>
    </>
  );
};

export default TransferResult;

export { TransferResult };
