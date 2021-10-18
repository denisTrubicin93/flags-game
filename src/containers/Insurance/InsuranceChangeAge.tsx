import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../features';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import AgeRangeIcon1 from './assets/age_0_20.png';
import AgeRangeIcon2 from './assets/age_21_40.png';
import AgeRangeIcon3 from './assets/age_41_60.png';
import AgeRangeIcon4 from './assets/age_61_85.png';
import useFootControl from '../../components/common/hook/useFootControl';
import MiddleBar from '../../components/common/MiddleBar';

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
        '& .result_age_gender': {
          fontSize: 144,
          fontWeight: 800,
          color: '#333333',
          position: 'absolute',
          top: 295,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          marginBottom: 50,
          '& .center_title': {
            fontSize: 48,
            color: '#613BFF',
            fontWeight: 800,
            marginTop: 10,
          },
          '& .icon': {
            maxHeight: '50%',
            maxWidth: '50%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
        '& .gesture_bar': {
          position: 'relative',
          top: 1680,
          width: 920,
          height: 160,
          borderRadius: 24,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          justifyContent: 'space-between',
          padding: '0 20px',
        },
      },
    },
  })
);

function InsuranceChangeAge(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const profile = useSelector((state: RootState) => state.person.profile);

  const buttons = [
    {
      centerTitle: '0～20歳',
      icon: AgeRangeIcon1,
      onTap: () =>
        history.push({
          pathname: '/insuranceChangeSpecAge',
          state: { age: 10, minAge: 0, maxAge: 20 },
        }),
    },
    {
      centerTitle: '21～40歳',
      icon: AgeRangeIcon2,
      onTap: () =>
        history.push({
          pathname: '/insuranceChangeSpecAge',
          state: { age: 30, minAge: 21, maxAge: 40 },
        }),
    },
    {
      centerTitle: '41～60歳',
      icon: AgeRangeIcon3,
      onTap: () =>
        history.push({
          pathname: '/insuranceChangeSpecAge',
          state: { age: 50, minAge: 41, maxAge: 60 },
        }),
    },
    {
      centerTitle: '61～85歳',
      icon: AgeRangeIcon4,
      onTap: () =>
        history.push({
          pathname: '/insuranceChangeSpecAge',
          state: { age: 73, minAge: 61, maxAge: 85 },
        }),
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('insuranceDetectResult'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="result_age_gender">
            {profile.age === 0 ? '測定失敗!' : `${profile.age}歳`} <br />
            {profile.age === 0
              ? ''
              : `${
                  profile.gender == 'male'
                    ? '男性'
                    : profile.gender == 'female'
                    ? '女性'
                    : 'unknown'
                }`}
          </Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 930, position: 'absolute', top: 780 }}
          >
            {buttons.map((x, index) => (
              <Box
                className={buttonClasses(index)}
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <img src={x.icon} className="icon" />
                <Typography className="center_title">
                  {x.centerTitle}
                </Typography>
              </Box>
            ))}
          </Grid>
          <MiddleBar
            title="操作パッドの右・左を"
            subTitle="足で踏んで選んでね"
            className="gesture_bar"
          />
        </Box>
      </Box>
    </>
  );
}

export default InsuranceChangeAge;
