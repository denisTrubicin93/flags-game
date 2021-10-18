import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {
  PrevBtn,
  RequestHelpBtn,
  MenuBtn,
} from '../../../components/common/button';
import Card from '../../../components/common/card/Card';
import LeftCard from '../../../components/common/card/leftCard/LeftCard';
import { Profile } from '../../../components/common/profile/Profile';
import Base from './assets/11_Score_Ranking/Base.svg';
import HeaderBase from './assets/11_Score_Ranking/HeaderBase.svg';
import UserAvatar from './assets/11_Score_Ranking/user1.png';
import Avatar1 from './assets/11_Score_Ranking/avatar1.svg';
import Avatar2 from './assets/11_Score_Ranking/avatar2.svg';
import Avatar3 from './assets/11_Score_Ranking/avatar3.svg';
import Avatar4 from './assets/11_Score_Ranking/avatar4.svg';
import Avatar5 from './assets/11_Score_Ranking/avatar5.svg';
import Bullet from './assets/11_Score_Ranking/bullet.svg';

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
        z-index: -1;
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
      '& .reset_btn': `
      position: absolute;
      width: 273px;
      height: 116px;
      left: 411px;
      top: 1743px;

      background: linear-gradient(101.84deg, #000000 2.78%, #3297B8 2.79%, #17576F 98.95%);
      border-radius: 100px;
    `,
    },
    base: `
    position: absolute;
    width: 907px;
    height: 452px;
    left: 89px;
    top: 1568px;
    // opacity: 0.74;
    z-index: 1;
    `,
    box: `
    position: absolute;
    width: 895px;
    height: 957px;
    left: 93px;
    top: 743px;

    background: url(${Base}) no-repeat center;
    border-radius: 30px;
  `,
    header: `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 895px;
    height: 108px;
    text-align: center;
    background: url(${HeaderBase}) no-repeat center;
    border-radius: 30px 30px 0px 0px;
  `,
    title: `
    // margin-top: 29px;
    // margin-left: 155px;

    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 70px;
    line-height: 50px;
    /* identical to box height, or 71% */

    text-align: center;

    color: #FFFFFF;

    text-shadow: 0px 4px 4px #000000;
`,
    rankIcon: `
    position: absolute;
    width: 68px;
    height: 68px;
    // left: 124px;
    // top: 926px;

    background: url(${Bullet}) no-repeat center;
`,
    rankText: `
    // position: absolute;
    width: 46px;
    height: 46px;
    left: 135px;
    top: 937px;

    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 26px;
    /* or 76% */

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`,
    rankOrderBak: `
    width: 68px;
    height: 68px;
    border-radius: 68px;
    background: #FFFFFF;
    margin-right: 30px;
    `,
    rankOrderText: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 26px;
    color: #000000;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `,
    scoreValue: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 73px;
    letter-spacing: -0.04em;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `,
    scoreTitle: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 58px;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    `,
  })
);

const rankData = [
  {
    rankOrder: 1,
    avatar: Avatar1,
    name: 'まゆみ',
    score: '91',
  },
  {
    rankOrder: 2,
    avatar: Avatar2,
    name: 'よしー',
    score: '89',
  },
  {
    rankOrder: 3,
    avatar: Avatar3,
    name: '2134BB',
    score: '82',
  },
  {
    rankOrder: 4,
    avatar: Avatar4,
    name: 'rarachan',
    score: '77',
  },
  {
    rankOrder: 5,
    avatar: Avatar5,
    name: 'すじゃ',
    score: '71',
  },
];

const ScoreRanking = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />
        <Box className="vector">
          <PrevBtn onTap={() => history.push('menu')} />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
        {/* <Typography className="text_hello">こんにちは</Typography>
        <Typography className="text_welcome">ミラーへようこそ！</Typography> */}
        <Card
          left={
            <Profile
              tagText="けんじ"
              size="large"
              right={true}
              avatar={UserAvatar}
            />
          }
          right={<LeftCard title="94%" content="あなたのスコア" />}
          leftxs={8}
          rightxs={4}
        />
        <Box className={classes.box}>
          <Box className={classes.header}>
            <Typography className={classes.title}>今日のランキング</Typography>
          </Box>
          <Box style={{ position: 'relative', padding: 32 }}>
            {rankData.map((item, index) => {
              return (
                <Grid
                  key={index}
                  container
                  justify="space-between"
                  alignItems="center"
                  spacing={4}
                  style={{ padding: '5px 30px' }}
                >
                  <Grid item xs={10} container alignItems="center">
                    <Grid
                      item
                      container
                      justify="center"
                      alignItems="center"
                      className={classes.rankOrderBak}
                    >
                      <Typography className={classes.rankOrderText}>
                        {item.rankOrder}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Profile
                        tagText={item.name}
                        size="normal"
                        right={true}
                        avatar={item.avatar}
                        score={item.score}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={classes.scoreValue}>
                      {`${item.score}%`}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Box>
        <MenuBtn
          className="reset_btn"
          label="戻る"
          color="primary"
          onTap={() => history.push('menu')}
        />
      </Box>
    </>
  );
};

export default ScoreRanking;

export { ScoreRanking };
