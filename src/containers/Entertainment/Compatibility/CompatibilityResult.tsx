import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import CompatibilityAPI from '../../../service/CompatibilityService';
import { DeviceService } from '../../../service/DeviceService';
import CircularProgressWithLabel from '../../../components/common/CircularProgressWithLabel';
import { useDispatch } from 'react-redux';
import BackIcon from '../assets/Common/back.png';
import PhoneIcon from '../assets/Common/phone.png';
import Loading from '../../../components/common/Loading';
import { addContent } from '../../../service/DigitalAvatarService';
import randomNum from '../../../service/RandomNum';
import { BACKGROUND, CARD, CARD_SHADOW, ICON_TEXT_BUTTON } from '../../common/styles';
import useFootControl from '../../../components/common/hook/useFootControl';

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
        '& .card': {
          ...CARD,
          padding: 0,
          height: 1080,
          top: 125,
          background:
            'linear-gradient(180deg, #FF7E9D 0%, #FF5C84 100%), #FF7E9D;',
          '& .card_header': {
            width: '100%',
            height: 320,
            background: 'rgba(255, 255, 255, 0.2)',
            '& .lucky_box': {
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '& .lucky_title': {
                fontSize: 48,
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 1.2,
              },
              '& .lucky_color': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: '#ffffff',
                fontSize: 48,
                fontWeight: 800,
                color: '#000000',
                marginTop: 20,
              },
            },
            '& .circular_progress': {
              width: 220,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '& .progress_title': {
                fontSize: 70,
                fontWeight: 800,
              },
            },
          },
          '& .card_body': {
            width: '100%',
            height: 760,
            overflow: 'hidden',
            padding: '20px 30px',
            boxSizing: 'border-box',
            textAlign: 'justify',
            '& .card_body_data': {
              fontSize: 40,
              fontWeight: 800,
              fontStyle: 'normal',
            },
          },
        },
        '& .card_shadow': {
          ...CARD_SHADOW,
          background: '#FF7E9D33',
          opacity: 1,
          top: 100,
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
    error_msg: `
      font-family: Noto Sans JP;
      font-style: normal;
      font-weight: bold;
      font-size: 45px;
      line-height: 50px;
      text-align: center;
      color: #FFFFFF;
    `,
  })
);

const colorTitles = {
  1: '白',
  2: '黒',
  3: '灰',
  4: '赤',
  5: '青',
  6: '黄',
  7: '緑',
  8: '紫',
  9: '桃',
};

const colorStyles = {
  1: { background: '#ffffff' },
  2: { background: '#000000', color: '#ffffff' },
  3: { background: '#333333', color: '#ffffff' },
  4: { background: '#FF4B77', color: '#ffffff' },
  5: { background: '#2E8DFF', color: '#ffffff' },
  6: { background: '#FFC90B', color: '#ffffff' },
  7: { background: '#30D67C', color: '#ffffff' },
  8: { background: '#613BFF', color: '#ffffff' },
  9: { background: '#FB6FBB', color: '#ffffff' },
};

const CompatibilityResult = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  var parseString = require('xml2js').parseString;
  const dispatch = useDispatch();

  const color1 = props.location.state.color1;
  const color2 = props.location.state.color2;

  React.useEffect(() => {
    setValue(randomNum(70, 100));
  }, []);

  React.useEffect(() => {
    CompatibilityAPI(color1, color2)
      .then(function (response: any) {
        parseString(response.data, function (err, result) {
          setData(result.psychology.result[0].comment);
        });
      })
      .catch(function (error: any) {
        console.log(error);
        showErrorAwhile(() => {});
        setErrorMsg('Get result error:(');
      });
  }, []);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = (onNext) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'compatibility',
    coins: 20,
    content: JSON.stringify(data),
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response: any) {
        console.log('response.data: ', response.data);
        history.push({
          pathname: '/compatibilityQRCodeScan',
          state: { recordId: response.data.recordId },
        });
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        showErrorAwhile(() => history.push('compatibilityQRCodeScan'));
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
          <Grid container direction="column" className="card">
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="space-evenly"
              className="card_header"
            >
              <Box className="lucky_box">
                <Typography className="lucky_title">
                  左のあなたのラッキー色 :
                </Typography>
                <Typography className="lucky_color" style={colorStyles[color1]}>
                  {colorTitles[color1]}
                </Typography>
              </Box>
              <Box className="circular_progress">
                <CircularProgressWithLabel
                  value={value}
                  centerLabel={value}
                  downLabel=""
                  color="inherit"
                  style={{ color: '#FF4444' }}
                />
                <Typography className="progress_title">相性度</Typography>
              </Box>
              <Box className="lucky_box">
                <Typography className="lucky_title">
                  左のあなたのラッキー色 :
                </Typography>
                <Typography className="lucky_color" style={colorStyles[color2]}>
                  {colorTitles[color2]}
                </Typography>
              </Box>
            </Grid>

            <Box className="card_body">
              <Typography className="card_body_data">
                {data
                  ?.toString()
                  .replaceAll('。', '。\n')
                  .replaceAll('？', '？\n')}
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
    </>
  );
};

export default CompatibilityResult;

export { CompatibilityResult };
