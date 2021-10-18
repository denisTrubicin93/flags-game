import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features';
import { setUrlIndex, setType } from '../../features/Insurance/reducer';
import icon1 from './assets/type1.png';
import icon2 from './assets/type2.png';
import icon3 from './assets/type3.png';
import icon4 from './assets/type4.png';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import useFootControl from '../../components/common/hook/useFootControl';
import { messageAction2 } from '../../features/Websocket/reducer';
import { ButtonPoint } from '../../features/Button/models';
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
        '& .insurance_title': {
          fontSize: 80,
          fontWeight: 800,
          color: '#333333',
          position: 'absolute',
          top: 295,
          textAlign: 'center',
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          width: 450,
          height: 450,
          borderRadius: 100,
          marginBottom: 50,
          '& .icon': {
            maxHeight: '85%',
            maxWidth: '85%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
        '& .btn_disabled': {
          borderColor: '#f2f2f2',
          background: '#f2f2f2',
          boxShadow: 'unset',
          '& .icon': {
            opacity: 0.5
          }
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

function InsuranceChoose(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const gender = useSelector((state: RootState) => state.person.profile.gender);

  const profile = useSelector((state: RootState) => state.person.profile);

  const types = [
    { url: 0, type: 0, icon: icon1 },
    { url: 1, type: 1, icon: icon2 },
    { url: 1, type: 2, icon: icon3 },
    { url: 1, type: 3, icon: icon4 },
  ];

  const buttons = [
    {
      icon: icon1,
      onTap: () => {
        dispatch(setUrlIndex(0));
        dispatch(setType(0));
        history.push('insurance');
      },
      disabled: false,
    },
    {
      icon: icon2,
      onTap: () => {
        dispatch(setUrlIndex(1));
        dispatch(setType(1));
        history.push('insurance');
      },
      disabled: false,
    },
    {
      icon: icon3,
      onTap: () => {
        dispatch(setUrlIndex(1));
        dispatch(setType(3));
        history.push('insurance');
      },
      disabled: false,
    },
    {
      icon: icon4,
      onTap: () => {
        dispatch(setUrlIndex(1));
        dispatch(setType(2));
        history.push('insurance');
      },
      disabled: profile.gender !== 'female',
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons
      .filter((x: any) => !x.disabled)
      .map((x: any) => x.onTap as Function),
    goBack: () => history.push('insuranceDetectResult'),
  });

  const buttonClasses = (index: number, disabled: boolean) => {
    if(disabled) {
      return 'btn btn_disabled';
    }

    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="insurance_title">
            保険プランを
            <br />
            選択してください
          </Typography>

          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 950, position: 'absolute', top: 615 }}
            onClick={() => dispatch(messageAction2(ButtonPoint.L2))}
          >
            {buttons.map((x, index) => (
              <Box
                className={buttonClasses(index, x.disabled)}
                key={index}
                onClick={() => !x.disabled && onTap(index)}
                onMouseOver={() => !x.disabled && onHover(index)}
              >
                <img src={x.icon} className="icon" />
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

export default InsuranceChoose;
