import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';

import { useMediapipe } from '../../components/common/useMediapipe';
import { RootState } from '../../features';

import captureBorder from './assets/Capture_Photo/capture_border.svg';
import { BACKGROUND, COUNTER, ICON_TEXT_BUTTON } from './styles';
import CameraArrowUpIcon from './assets/Capture_Photo/camera_arrow_up_icon.png';
import CameraIcon from './assets/Capture_Photo/camera_icon.png';
import CameraTips from './assets/Capture_Photo/camera_tips.png';
import TimerCountdown from '../../components/common/TimerCountdown';
import CameraCheckIcon from './assets/Capture_Photo/camera_check_icon.png';
import CameraResetIcon from './assets/Capture_Photo/camera_reset_icon.png';
import useFootControl from '../../components/common/hook/useFootControl';
import Face from '../Entertainment/Skin/assets/face.png';

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
        '& .camera_arrow_up_icon': {
          width: 80,
          height: 80,
          animation: '$bounce 2s infinite',
          position: 'absolute',
          top: 30,
        },
        '& .camera_icon': {
          width: 133,
          height: 100,
          position: 'absolute',
          top: 120,
        },
        '& .camera_tips': {
          width: 772,
          height: 119,
          position: 'absolute',
          top: 250,
        },
        '& .camera_frame': {
          position: 'absolute',
          width: cameraOptions.width,
          height: cameraOptions.height,
          borderRadius: 70,
          border: '10px solid #2E8DFF',
          boxSizing: 'border-box',
          top: 420,
          '& .capture_border': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 100,
            background: `url(${captureBorder}) no-repeat center`,
          },
        },
        '& .counter': {
          ...COUNTER,
          position: 'absolute',
          top: 1440,
        },
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
    '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': {
        transform: 'translateY(0)',
      },
      '40%': {
        transform: 'translateY(30px)',
      },
      '60%': {
        transform: 'translateY(15px)',
      },
    },
  })
);

const BACK_BUTTON_INDEX = 2;

interface CapturePhotoProps {
  onNext: Function;
  background?: string;
}

const cameraOptions = { width: 800, height: 869.33 };

const videoConstraints = {
  aspectRatio: cameraOptions.width / cameraOptions.height,
  facingMode: 'user',
};

const totalSeconds = 5;

const CapturePhoto = (props: CapturePhotoProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { mpCommands } = useMediapipe();

  React.useEffect(() => {
    mpCommands.squat_stop();
  }, []);

  const [pic, setPic] = React.useState('');
  const cameraState = useSelector((state: RootState) => state.device.camera);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPic(imageSrc);
    } else {
      console.log('カメラが占有されています！');
      history.push('menu');
    }
  }, [webcamRef]);

  const [seconds, setSeconds] = React.useState(totalSeconds);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (cameraState === 'not-occupied') {
      setPic('');
      setSeconds(totalSeconds);
      setDone(false);
    }
  }, [cameraState]);

  const onShoot = () => {
    if (!done) {
      setDone(true);
      capture();
      mpCommands.start();
    }
  };

  const buttons: any[] = [
    {
      centerTitle: '確認',
      icon: CameraCheckIcon,
      onTap: () => props.onNext(pic),
    },
    {
      centerTitle: '取り直し',
      icon: CameraResetIcon,
      onTap: () => {
        mpCommands.squat_stop();
      },
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

  useEffect(() => {
    function resetButtonIndex() {
      onHover(0);
    }

    if (!pic) {
      resetButtonIndex();
    }
  }, [pic]);

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" style={{ background: props.background }}>
          {!pic && (
            <>
              <img className="camera_arrow_up_icon" src={CameraArrowUpIcon} />
              <img className="camera_icon" src={CameraIcon} />
              <img className="camera_tips" src={CameraTips} />
            </>
          )}
          <Box className="camera_frame" style={{ background: `url(${pic})` }}>
            <Box className="capture_border" />
            {!pic && cameraState === 'not-occupied' && (
              <Webcam
                audio={false}
                mirrored={true}
                width={cameraOptions.width}
                height={cameraOptions.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            )}
          </Box>

          {!pic && (
            <TimerCountdown
              className="counter"
              seconds={seconds}
              onShoot={onShoot}
            />
          )}

          {pic && (
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default CapturePhoto;

export { CapturePhoto };
