import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';
import {
  PrevBtn,
  RequestHelpBtn,
  MenuBtn,
} from '../../../components/common/button';
import massage from './assets/Skin_Video/massage.mp4';
import Icon1 from './assets/Common/Icon1.png';
import Icon2 from './assets/Common/Icon2.png';
import Icon3 from './assets/Common/Icon3.png';

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
        top: 0px;
        background: linear-gradient(163.28deg, #250055 -5.88%, #5300FF 97.03%);
        z-index: -1;
      `,
      '& .vector': `
        position: absolute;
        width: 87px;
        height: 87px;
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
        display: none;
      `,
      '& .text_title': `
        position: absolute;
        width: 400px;
        height: 54px;
        left: 349px;
        top: 213px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 64px;
        line-height: 54px;
      `,
      '& .image_base': `
        position: absolute;
        width: 1080px;
        height: 622px;
        left: 0px;
        top: 296px;
      `,
      '& .food_name': `

        position: absolute;
        width: 513px;
        height: 87px;
        left: 63px;
        top: 1350px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 96px;
        line-height: 116.18px;
      `,
      '& .sub_title': `
        position: absolute;
        width: 546px;
        height: 48px;
        left: 87px;
        top: 999px;
        font-family: Lato;
        font-style: normal;
        font-weight: bold;
        font-size: 52px;
        line-height: 48px;
        color: #E6E6F4;
      `,
      '& .info': `
        position: absolute;
        width: 235px;
        height: 36px;
        left: 87px;
        top: 1071px;
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        line-height: 36px;
        color: #F1A44B;
      `,
      '& .items_container1': `
        position: absolute;
        width: 948px;
        height: 138px;
        left: 66px;
        top: 1188px;
        display: flex;
        align-items: flex-start;
      `,
      '& .items_container2': `
        position: absolute;
        width: 948px;
        height: 138px;
        left: 66px;
        top: 1344px;
        display: flex;
        align-items: flex-start;
      `,
      '& .items_container3': `
        position: absolute;
        width: 948px;
        height: 138px;
        left: 66px;
        top: 1500px;
        display: flex;
        align-items: flex-start;
      `,
      '& .item_style': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: normal;
        font-size: 42px;
        line-height: 60px;
        color: #E6E6F4;
        margin-left: 36px;
      `,
      '& .next_btn': `
        position: absolute;
        width: 333px;
        height: 116px;
        left: 707px;
        top: 965px;
      `,
    },
  })
);

const SkinVideo = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn onTap={() => history.push('skinAnalysis')} />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        <Typography className="text_title">肌マッサージ</Typography>
        <Box className="image_base">
        <ReactPlayer
          url={massage}
          playing
          loop
          // muted
          width="1080px"
          height="622px"
        />
        </Box>
        <Typography className="sub_title">目の下のクマを削減！</Typography>
        <Typography className="info">8-10分程度</Typography>
        <Box className="items_container1">
          <img src={Icon1} />
          <Typography className="item_style">
            耳の手前と後ろにあるリンパ節の滞りを解消しておきます。
          </Typography>
        </Box>
        <Box className="items_container2">
          <img src={Icon2} />
          <Typography className="item_style">
            手のひら全体で、耳下から鎖骨に向かってなで下ろします。
          </Typography>
        </Box>
        <Box className="items_container3">
          <img src={Icon3} />
          <Typography className="item_style">
            人さし指の腹を使い、目の下の青くまを解消するツボを押します。
          </Typography>
        </Box>
        <MenuBtn
          className="next_btn"
          label="次へ"
          color="primary"
          onTap={(e: any) => {
            history.push('skinFood');
          }}
          type={['R1', 'R2']}
        />
      </Box>
    </>
  );
};

export default SkinVideo;

export { SkinVideo };
