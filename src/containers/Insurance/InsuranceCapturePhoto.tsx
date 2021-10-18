import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';

import { useMediapipe } from '../../components/common/useMediapipe';
import { RootState } from '../../features';

import captureBorder from '../common/assets/Capture_Photo/capture_border.svg';
import { BACKGROUND, COUNTER } from '../common/styles';
import CameraArrowUpIcon from '../common/assets/Capture_Photo/camera_arrow_up_icon.png';
import CameraIcon from '../common/assets/Capture_Photo/camera_icon.png';
import TimerCountdown from '../../components/common/TimerCountdown';
import useFootControl from '../../components/common/hook/useFootControl';

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
          position: 'absolute',
          top: 250,
          fontSize: 80,
          fontWeight: 800,
          color: "#333333"
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
        '& .camera_note': {
          position: 'absolute',
          top: 1310,
          fontSize: 80,
          fontWeight: 800,
          color: "#333333"
        },
        '& .counter': {
          ...COUNTER,
          position: 'absolute',
          top: 1440,
        },
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

interface CapturePhotoProps {
  onNext: Function;
}

const cameraOptions = { width: 800, height: 869.33 };

const videoConstraints = {
  aspectRatio: cameraOptions.width / cameraOptions.height,
  facingMode: 'user',
};

const totalSeconds = 5;

const InsuranceCapturePhoto = (props: CapturePhotoProps) => {
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
      props.onNext(imageSrc);
    } else {
      console.log('カメラが占有されています！');
      // setPic(Face);
      // props.onNext(Face);
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
  }
  ;

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <img className="camera_arrow_up_icon" src={CameraArrowUpIcon} />
          <img className="camera_icon" src={CameraIcon} />
          <Typography className="camera_tips">年齢測定中</Typography>
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
          <Typography className="camera_note">マスクを外してください</Typography>
          <TimerCountdown
            className="counter"
            seconds={seconds}
            onShoot={onShoot}
          />
        </Box>
      </Box>
    </>
  );
};

export default InsuranceCapturePhoto;

export { InsuranceCapturePhoto };
