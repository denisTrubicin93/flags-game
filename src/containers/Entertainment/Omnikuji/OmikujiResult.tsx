import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography, Dialog } from '@material-ui/core';
import {
  BACKGROUND,
  CARD,
  CARD_SHADOW,
  ICON_TEXT_BUTTON,
} from '../../common/styles';
import FancyBorderBox from '../../../components/common/FancyBorderBox';
import Loading from '../../../components/common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features';
import {
  selector,
  submitDigitalAvatar,
} from '../../../features/Omnikuji/reducer';
import useFootControl from '../../../components/common/hook/useFootControl';
import BackIcon from '../assets/Common/back.png';
import PhoneIcon from '../assets/Common/phone.png';
import Type1 from '../assets/Omikuji/type1.png';
import Type2 from '../assets/Omikuji/type2.png';
import Type3 from '../assets/Omikuji/type3.png';
import Type4 from '../assets/Omikuji/type4.png';
import Type5 from '../assets/Omikuji/type5.png';
import {
  HoroscopeResult,
  SubcontentType,
} from '../../../features/Omnikuji/models';

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
          fontSize: 70,
          fontWeight: 800,
          color: '#FFC14B',
          position: 'absolute',
          top: 80,
        },
        '& .card': {
          ...CARD,
          position: 'absolute',
          top: 200,
          padding: 0,
          height: 1080,
          background: 'linear-gradient(90deg, #ffcd6f 0%, #FFC14B 100%);',
          '& .card_header': {
            width: '100%',
            height: 320,
            background: 'rgba(255, 255, 255, 0.2)',
            '& .result_type': {
              fontSize: 70,
              fontWeight: 800,
            },
            '& .result_content': {
              width: '65%',
            },
          },
          '& .card_body': {
            width: '100%',
            height: 760,
            overflow: 'hidden',
            padding: '40px',
            boxSizing: 'border-box',
            textAlign: 'justify',
            '& .content_message': {
              fontSize: 36,
              marginBottom: 30,
              fontWeight: 'bold',
            },
            '& .content_score': {
              fontSize: 144,
              fontWeight: 800,
              position: 'absolute',
              top: 850,
              left: 290,
            },
          },
        },
        '& .card_shadow': {
          ...CARD_SHADOW,
          background: 'rgba(97, 59, 255, 0.2)',
          opacity: 1,
          top: 1250,
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            marginTop: 20,
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
    error_msg: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 45,
      lineHeight: 50,
      textAlign: 'center',
      color: '#FFFFFF',
    },
  })
);

const types: HoroscopeResult[] = [
  {
    title: '仕事',
    icon: Type1,
    value: SubcontentType.Work,
    data: '',
  },
  {
    title: '人間関係',
    icon: Type2,
    value: SubcontentType.Relationships,
    data: '',
  },
  {
    title: 'お金',
    icon: Type3,
    value: SubcontentType.Money,
    data: '',
  },
  {
    title: '恋愛',
    icon: Type4,
    value: SubcontentType.Love,
    data: '',
  },
  {
    title: '健康',
    icon: Type5,
    value: SubcontentType.Health,
    data: '',
  },
];

const OmikujiResult = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((rootState: RootState) =>
    selector.getLoading(rootState.omnikuj)
  );
  const error = useSelector((rootState: RootState) =>
    selector.getError(rootState.omnikuj)
  );

  const horoscopeResults = useSelector((rootState: RootState) =>
    selector.getHoroscopeResults(rootState.omnikuj, types)
  );

  const [contentIndex, setContentIndex] = React.useState(0);
  const [seconds, setSeconds] = React.useState(10);

  const tick = () => {
    if (seconds === 1) {
      setContentIndex((index) => ++index % 5);
      setSeconds(10);
    } else {
      setSeconds(seconds - 1);
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const handleSaveClick = () => {
    dispatch(submitDigitalAvatar(horoscopeResults));
    history.push('/omikujiQRCodeScan');
  };

  const buttons: any[] = [
    {
      centerTitle: 'さいしょにもどる',
      icon: BackIcon,
      onTap: () => history.push('/menu'),
    },
    {
      centerTitle: 'けいたいへ送る',
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
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="result_title">おみくじ結果</Typography>
          <Grid container direction="column" className="card">
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              className="card_header"
            >
              <Typography className="result_type">
                {horoscopeResults[contentIndex].title}
              </Typography>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-evenly"
                className="result_content"
              >
                {horoscopeResults.map(
                  (result: HoroscopeResult, index: number) => (
                    <Grid key={index} item>
                      <FancyBorderBox
                        icon={result.icon}
                        defaultActive={index === contentIndex}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
            <Box className="card_body">
              <Typography className="content_message">
                {horoscopeResults[contentIndex].data}
              </Typography>
            </Box>
          </Grid>
          <Box className="card_shadow" />
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 900, position: 'absolute', top: 1400 }}
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
      <Dialog fullScreen open={error !== ''}>
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
          <Typography className={classes.error_msg}>{error}</Typography>
        </Grid>
      </Dialog>
    </>
  );
};

export default OmikujiResult;

export { OmikujiResult };
