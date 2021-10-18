import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features';
import { SkinState } from '../../../features/Skin/models';
import { DeviceService } from '../../../service/DeviceService';
import { makeStyles, createStyles, Box, Typography, Grid, Dialog } from '@material-ui/core';
import {
  BACKGROUND,
  ICON_TEXT_BUTTON,
} from '../../common/styles';
import { addContent } from '../../../service/DigitalAvatarService';
import useFootControl from '../../../components/common/hook/useFootControl';
import ScreenIcon from '../assets/Common/screen.png';
import PhoneIcon from '../assets/Common/phone.png';
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
        '& .top_title': {
          width: 570,
          fontSize: 80,
          fontWeight: 800,
          color: '#000000',
          textAlign: 'center',
          position: 'absolute',
          top: 228
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
      textAlign: 'center',
      color: '#FFFFFF',
    },
  })
);

export default function SkinTransferHint() {
  const history = useHistory();
  const classes = useStyles();
  const skinState: SkinState = useSelector((state: RootState) => state.skin);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const showErrorAwhile = (onNext: any) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'skin',
    coins: 20,
    content: JSON.stringify(skinState.attributes),
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

  const buttons: any[] = [
    {
      centerTitle: '画面に表示',
      icon: ScreenIcon,
      onTap: () => history.push('skinAnalysis')
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
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="top_title">肌診断結果を 表示しますか？</Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: 900, position: 'absolute', top: 780 }}
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
}
export { SkinTransferHint };
