import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setAge } from '../../features/Person/reducer';
import { RootState } from '../../features';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import AgeUpArrowIcon from './assets/age_up_arrow.png';
import AgeDownArrowIcon from './assets/age_down_arrow.png';
import useFootControl from '../../components/common/hook/useFootControl';
import CheckIcon from '../common/assets/Capture_Photo/camera_check_icon.png';
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

function InsuranceChangeSpecAge(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.person.profile);

  const minAge = props.location?.state?.minAge;
  const maxAge = props.location?.state?.maxAge;

  const [currentAge, setCurrentAge] = React.useState(
    minAge <= profile.age && profile.age <= maxAge
      ? profile.age
      : (props.location?.state?.age as number)
  );

  const buttons = [
    {
      centerTitle: '下げる',
      icon: AgeDownArrowIcon,
      onTap: () =>
        currentAge > minAge && setCurrentAge((currentAge) => currentAge - 1),
    },
    {
      centerTitle: '上げる',
      icon: AgeUpArrowIcon,
      onTap: () =>
        currentAge < maxAge && setCurrentAge((currentAge) => currentAge + 1),
    },
  ];

  const onConfirm = () => {
    dispatch(setAge(currentAge));
    history.push('/insuranceDetectResult');
  };

  const actions = buttons.map((x: any) => x.onTap as Function);

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: [...actions, onConfirm as Function],
    goBack: () => history.push('insuranceChangeAge'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="result_age_gender">
            {`${currentAge}歳`} <br />
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
            style={{ width: 920, position: 'absolute', top: 780 }}
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
          <Grid
            container
            direction="row"
            justify="flex-end"
            style={{ width: 920, position: 'absolute', top: 1200 }}
          >
            <Box
              className={buttonClasses(2)}
              key={2}
              onClick={() => onTap(2)}
              onMouseOver={() => onHover(2)}
            >
              <img src={CheckIcon} className="icon" />
              <Typography className="center_title">確認</Typography>
            </Box>
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

export default InsuranceChangeSpecAge;
