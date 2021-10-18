import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, Dialog } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../features';

import Loading from '../../components/common/Loading';
import { insuranceAnalytics } from '../../service/InsuranceAnalyticsService';
import { DeviceService } from '../../service/DeviceService';
import moment from 'moment';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../common/styles';
import useFootControl from '../../components/common/hook/useFootControl';
import GenerationIcon from './assets/generation_icon.png';
import GenderIcon from './assets/gender_icon.png';
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
        '& .result_title': {
          fontSize: 80,
          fontWeight: 800,
          color: '#333333',
          position: 'absolute',
          top: 150,
        },
        '& .result_age_gender': {
          fontSize: 144,
          fontWeight: 800,
          color: '#333333',
          position: 'absolute',
          top: 295,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
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
          padding: '0 20px'
        },
      },
    },
  })
);

function InsuranceDetectResult(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const profile = useSelector((state: RootState) => state.person.profile);
  const detectResult = props.location?.state?.detectResult;

  const [loading, setLoading] = React.useState(false);

  const deviceId = DeviceService.default().deviceId();
  const skeltonId = DeviceService.default().skeletonId() || '0';

  console.log('deviceId: ', deviceId);
  const data = {
    datas: [
      {
        device: deviceId,
        id: skeltonId,
        timestamp: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZZ'),
        age: profile.age,
        gender: profile.gender,
        emotion: profile.emotion,
      },
    ],
  };
  const onNext = () => {
    setLoading(true);
    insuranceAnalytics(data, deviceId)
      .then(function (response: any) {
        console.log('response.data: ', response.data);
        setLoading(false);
        history.push('insuranceChoose');
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        history.push('insuranceChoose');
      });
  };

  const buttons: any[] = [
    {
      centerTitle: '年齢変更',
      icon: GenerationIcon,
      onTap: () => history.push('insuranceChangeAge'),
    },
    {
      centerTitle: '性別変更',
      icon: GenderIcon,
      onTap: () => history.push('insuranceChangeGender'),
    },
  ];

  const actions = buttons.map((x: any) => x.onTap as Function);

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: [...actions, onNext as Function],
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="result_title">自動測定結果</Typography>
          <Typography className="result_age_gender">
            {detectResult == 'fail' ? '測定失敗!' : `${profile.age}歳`} <br />
            {detectResult === 'fail'
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
      <Dialog fullScreen open={loading}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Loading color="white" height={200} width={200} />
        </Grid>
      </Dialog>
    </>
  );
}

export default InsuranceDetectResult;
