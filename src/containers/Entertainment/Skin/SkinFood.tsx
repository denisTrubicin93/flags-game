import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid, Divider, Dialog } from '@material-ui/core';
import {
  BACKGROUND,
  TOP_BG,
  BOTTOM_BG,
  ICON_TEXT_BUTTON,
} from '../../common/styles';
import TopBg from './assets/skin_food_top_bg.png';
import useFootControl from '../../../components/common/hook/useFootControl';
import NextIcon from '../assets/Common/blue_right_arrow.png';
import { SkinState } from '../../../features/Skin/models';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features';
import { DeviceService } from '../../../service/DeviceService';
import { addContent } from '../../../service/DigitalAvatarService';
import Loading from '../../../components/common/Loading';

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
        '& .top_bg': {
          ...TOP_BG,
          height: 520,
          background: `url(${TopBg}) center no-repeat `,
        },
        '& .bottom_bg': {
          ...BOTTOM_BG,
          height: 1400,
          '& .good_food_title': {
            width: 400,
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(97, 59, 255, 0.05)',
            fontSize: 48,
            fontWeight: 800,
            color: '#613BFF',
            position: 'relative',
            top: 40,
            left: 280,
            borderRadius: 40,
          },
          '& .food_info': {
            width: 920,
            height: 260,
            position: 'relative',
            top: 70,
            '& .food_name': {
              color: '#613BFF',
              fontWeight: 800,
              fontSize: 96,
              lineHeight: 1.3,
            },
            '& .food_sub': {
              color: '#613BFF',
              fontSize: 48,
              lineHeight: 1.3,
            },
          },
          '& .food_advantages': {
            width: 920,
            position: 'relative',
            top: 120,
            '& .item_index': {
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: '#613BFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 48,
              marginRight: 20,
            },
            '& .item_text': {
              color: '#333333',
              fontSize: 42,
            },
          },
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          position: 'absolute',
          top: 1480,
          left: 560,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            position: 'relative',
            top: 30,
          },
          '& .icon': {
            maxHeight: '45%',
            maxWidth: '45%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
        '& .divider': {
          position: 'absolute',
          width: 920,
          height: 2,
          background: '#EEEEEE',
        },
      },
    },
    error_msg: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 45,
      textAlign: 'center',
      color: '#FFFFFF',
    },
  })
);

const foodAdvantages = [
  'プニカ酸のアンチエイジング効果',
  '抗酸化成分による若返り効果',
  '美白成分によるシミの予防と改善',
];

const SkinFood = () => {
  const classes = useStyles();
  const history = useHistory();
  const skinState: SkinState = useSelector((state: RootState) => state.skin);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'skin',
    coins: 20,
    content: JSON.stringify(skinState.attributes),
  };

  const showErrorAwhile = (onNext: any) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response: any) {
        console.log('response.data: ', response.data);
        history.push({
          pathname: '/skinQRCodeScan',
          state: { recordId: response.data.recordId },
        });
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        showErrorAwhile(() => history.push('skinQRCodeScan'));
        setErrorMsg('Save content error:(');
      });
  };

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: [handleSaveClick as Function],
    goBack: () => history.push('skinAnalysis'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="top_bg"></Box>
          <Box className="bottom_bg">
            <Typography className="good_food_title">肌いい食べ物</Typography>
            <Grid
              container
              direction="column"
              justify="flex-start"
              className="food_info"
            >
              <Typography className="food_name">ザクロ</Typography>
              <Typography className="food_sub">
                ザクロは美容に最適！
                <br />
                その美肌効果とは？
              </Typography>
            </Grid>
            <Divider className="divider" style={{ top: 940 }} />
            <Grid
              container
              direction="column"
              justify="flex-start"
              className="food_advantages"
            >
              {foodAdvantages.map((x, index) => (
                <Grid
                  key={index}
                  item
                  direction="row"
                  container
                  alignItems="center"
                  style={{ marginBottom: 30 }}
                >
                  <Typography className="item_index">{index + 1}</Typography>
                  <Typography className="item_text">{x}</Typography>
                </Grid>
              ))}
            </Grid>
            <Box
              className={buttonClasses(0)}
              onClick={() => onTap(0)}
              onMouseOver={() => onHover(0)}
            >
              <img src={NextIcon} className="icon" />
              <Typography className="center_title">次へ</Typography>
            </Box>
          </Box>
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

export default SkinFood;

export { SkinFood };
