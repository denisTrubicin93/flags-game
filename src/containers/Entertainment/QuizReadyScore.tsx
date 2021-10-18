import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../features';
import { Question } from '../../features/Quiz/models';
import {
  addOk,
  addNg,
  addCurrent,
  setChoose,
} from '../../features/Quiz/reducer';

import MaskGroup from './assets/Common/MaskGroup.png';
import Dashboard from './assets/Quiz_Ready_Score/Dashboard.png';
import DashboardChild from './assets/Quiz_Ready_Score/Dashboard_child.png';
import { useTimeout } from '../../components/common/hook/useTimeout';
import ChildBg from './assets/Child_Quiz/main_bg.png';
import ScoreTitle from './assets/Child_Quiz/score_title.png';
import BackIcon from './assets/Common/back.png';
import PhoneIcon from './assets/Common/phone.png';
import { DeviceService } from '../../service/DeviceService';
import { addContent } from '../../service/DigitalAvatarService';
import Loading from '../../components/common/Loading';
import MiddleBar from '../../components/common/MiddleBar';
import useFootControl from '../../components/common/hook/useFootControl';
import { ICON_TEXT_BUTTON } from '../common/styles';

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
      '& .request_help': `
        /* Request_Help */

        position: absolute;
        width: 400px;
        height: 114px;
        left: 647px;
        top: 44px;

        border-radius: 100px;
        display: none;
      `,
      '& .title_containner': `
        position: absolute;
        width: 956px;
        height: 191px;
        left: calc(50% - 956px/2);
        top: 270px;
        text-align: center;
      `,
      '& .title': `
        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 72px;
        line-height: 108.02px;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .barcode_scan': `
        position: absolute;
        left: 8.8%;
        right: 8.33%;
        top: 21.98%;
        bottom: 6.3%;

        // background: linear-gradient(302.01deg, #250055 -6.72%, #5300FF 111.36%);
        background: url(${MaskGroup}) no-repeat center;
        border-radius: 20px;
      `,
      '& .barcode_scan .dashboard': `
        /* dashboard */

        position: absolute;
        width: 803.05px;
        height: 326.11px;
        top: 523px;
        left: calc(50% - 803px/2);

        background: url(${Dashboard}) no-repeat center;
      `,
      '& .barcode_scan .dashboard_child': `
        /* dashboard */

        position: absolute;
        width: 803.05px;
        height: 326.11px;
        top: 523px;
        left: calc(50% - 803px/2);

        background: url(${DashboardChild}) no-repeat center;
      `,
      '& .score_incorrect': `
        position: absolute;
        width: 154.84px;
        height: 88.48px;
        left: 11%;
        top: 641.82px;
        text-align: center;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 59.14px;
        line-height: 88.72px;
        letter-spacing: -0.04em;
        color: #E65C00;

        // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .score_correct': `
        position: absolute;
        width: 154.84px;
        height: 88.48px;
        left: 41%;
        top: 641.82px;
        text-align: center;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 59.14px;
        line-height: 88.72px;
        letter-spacing: -0.04em;
        color: #EC008C;

        // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .experience': `
        position: absolute;
        width: 154.84px;
        height: 88.48px;
        left: 70%;
        top: 641.82px;
        text-align: center;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: 700;
        font-size: 59.14px;
        line-height: 88.72px;
        letter-spacing: -0.04em;
        color: #1FA2FF;

        // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .child_bg': {
        position: 'absolute',
        width: 1080,
        height: 1920,
        left: 0,
        background: `url(${ChildBg}) center no-repeat`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .score_title': {
          width: 649,
          height: 143,
          position: 'relative',
          top: 348,
          background: `url(${ScoreTitle}) center/contain no-repeat`,
        },
        '& .count_box': {
          width: 280,
          height: 280,
          border: '16px solid #FFFFFF',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)',
          borderRadius: 32,
          '& .count_title': {
            fontSize: 96,
            fontWeight: 900,
            textAlign: 'center',
          },
          '& .count_note': {
            fontSize: 56,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        '& .correct_count': {
          background: '#42DC76',
        },
        '& .incorrect_count': {
          background: '#FF5CB8',
          '& .count_note': {
            fontSize: '46px !important',
            marginTop: 8,
          },
        },
        '& .total_score_box': {
          width: 680,
          height: 163,
          position: 'relative',
          top: 477,
          border: '16px solid #FFFFFF',
          borderRadius: 32,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          '& .left_title': {
            width: '65%',
            height: '100%',
            display: 'flex',
            paddingLeft: 30,
            justifyContent: 'flex-start',
            alignItems: 'center',
            boxSizing: 'border-box',
            fontSize: 56,
            fontWeight: 'bold',
          },
          '& .right_score': {
            width: '35%',
            height: '100%',
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            background: '#4D27EB',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 64,
            fontWeight: 'bold',
          },
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            marginTop: 20
          },
          '& .icon': {
            maxHeight: '45%',
            maxWidth: '45%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
      },
    },
  })
);

const QuizReadyScore = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const scenesType = useSelector((state: RootState) => state.scenes.type);
  const ok = useSelector<RootState, number>((state) => state.quiz.ok);
  const ng = useSelector<RootState, number>((state) => state.quiz.ng);
  const quiz = useSelector((state) => state.quiz);

  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'quiz',
    coins: 20,
    content: JSON.stringify({
      ok: ok,
      ng: ng,
      questions: quiz.questions,
    }),
  };

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
      history.push({
        pathname: '/quizQRCodeScan',
        state: { recordId: undefined },
      });
    }, 3000);
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response: any) {
        history.push({
          pathname: '/quizQRCodeScan',
          state: { recordId: response.data.recordId },
        });
      })
      .catch(function (error: any) {
        setLoading(false);
        showErrorAwhile();
        setErrorMsg('Save content error:(');
      });
  };

  const buttons: any[] = [
    {
      centerTitle: 'さいしょにもどる',
      icon: BackIcon,
      onTap: () => history.push('menu'),
    },
    {
      centerTitle: 'けいたいへ送る',
      icon: PhoneIcon,
      onTap: handleSaveClick,
    },
  ];

  const adultButtons: any[] = [
    {
      centerTitle: '最初に戻る',
      icon: BackIcon,
      onTap: () => history.push('menu'),
    },
    {
      centerTitle: '携帯へ送る',
      icon: PhoneIcon,
      onTap: handleSaveClick,
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      {scenesType === 'child' ? (
        <Box className={classes.app_content}>
          <Box className="child_bg">
            <Box className="score_title" />
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ width: 650, position: 'relative', top: 397 }}
            >
              <Grid
                item
                direction="column"
                className="count_box correct_count"
              >
                <Typography className="count_title">{ok}</Typography>
                <Typography className="count_note">せいかい</Typography>
              </Grid>
              <Grid
                item
                direction="column"
                className="count_box incorrect_count"
              >
                <Typography className="count_title">{ng}</Typography>
                <Typography className="count_note">ふせいかい</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" className="total_score_box">
              <Typography className="left_title">けいけんち</Typography>
              <Typography className="right_score">+{ok * 10}</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ width: 900, position: 'relative', top: 547 }}
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
          <Dialog fullScreen open={error}>
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
              <Typography className={classes.error_msg}>{errorMsg}</Typography>
            </Grid>
          </Dialog>
        </Box>
      ) : (
        <Box className={classes.app_content}>
          <Box className="child_bg">
            <Box className="score_title" />
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ width: 650, position: 'relative', top: 397 }}
            >
              <Grid
                item
                direction="column"
                className="count_box correct_count"
              >
                <Typography className="count_title">{ok}</Typography>
                <Typography className="count_note">正解</Typography>
              </Grid>
              <Grid
                item
                direction="column"
                className="count_box incorrect_count"
              >
                <Typography className="count_title">{ng}</Typography>
                <Typography className="count_note">不正解</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" className="total_score_box">
              <Typography className="left_title">経験値</Typography>
              <Typography className="right_score">+{ok * 10}</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ width: 900, position: 'relative', top: 547 }}
            >
              {adultButtons.map((x, index) => (
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
          <Dialog fullScreen open={error}>
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
              <Typography>{errorMsg}</Typography>
            </Grid>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default QuizReadyScore;

export { QuizReadyScore };
