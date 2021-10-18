import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';

import { useMediapipe } from '../useMediapipe';
import { RootState } from '../../../features';

import leftTop from './assets/left-top.png';
import leftDown from './assets/left-down.png';
import rightTop from './assets/right-top.png';
import rightDown from './assets/right-down.png';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: (props) => props.width,
      height: (props) => props.height,
      borderRadius: 70,
      border: '10px solid',
      overflow: 'hidden',
    },
    leftTop: {
      position: 'absolute',
      top: 30,
      left: 30,
      zIndex: 1,
    },
    rightTop: {
      position: 'absolute',
      top: 30,
      right: 30,
      zIndex: 1,
    },
    leftDown: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      zIndex: 1,
    },
    rightDown: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      zIndex: 1,
    },
  })
);

interface CapturePhotoProps {
  width: number;
  height: number;
  onShoot: Function;
}

const totalSeconds = 3;

const CapturePhoto = (props: CapturePhotoProps) => {
  const classes = useStyles(props);
  const history = useHistory();

  const videoConstraints = {
    aspectRatio: props.width / props.height,
    facingMode: 'user',
  };

  const { mpCommands } = useMediapipe();
  React.useEffect(() => {
    mpCommands.squat_stop();
  }, []);

  const [pic, setPic] = React.useState('');
  const cameraState = useSelector((state: RootState) => state.device.camera);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const photo = webcamRef.current.getScreenshot();
    if (photo) {
      setPic(photo);
      props.onShoot(photo);
    } else {
      console.log('カメラが占有されています！');
      history.push('scenes');
    }
  }, [webcamRef]);

  const [seconds, setSeconds] = React.useState(totalSeconds);
  const [done, setDone] = React.useState(false);

  const tick = () => {
    if (seconds === 1 && !done) {
      setDone(true);
      capture();
      mpCommands.start();
    } else if (seconds > 1) {
      setSeconds(seconds - 1);
    }
  };

  React.useEffect(() => {
    if (cameraState === 'not-occupied') {
      setPic('');
      setSeconds(totalSeconds);
      setDone(false);
    }
  }, [cameraState]);

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <Box className={classes.root} style={{ background: `url(${pic})` }}>
      <img className={classes.leftTop} src={leftTop} />
      <img className={classes.rightTop} src={rightTop} />
      <img className={classes.leftDown} src={leftDown} />
      <img className={classes.rightDown} src={rightDown} />
      {!pic && cameraState === 'not-occupied' && (
        <Webcam
          audio={false}
          mirrored={true}
          width={props.width}
          height={props.height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      )}
    </Box>
  );
};

export default CapturePhoto;

export { CapturePhoto };
