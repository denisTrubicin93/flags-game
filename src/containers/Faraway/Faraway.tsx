import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// import video1 from './assets/Ochibahiroi_final.mp4';
// import video2 from './assets/Princess_final.mp4';
// import video3 from './assets/Matching_final.mp4';
import video4 from './assets/squat_challenge_finalv3.mp4';
import video5 from './assets/squat_challenge_finalv4.mp4';

import { useDispatch } from 'react-redux';
import { disableCursor } from '../../features/Handtracking/reducer';

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      alignContent: 'center',
      width: '100vw',
      height: '100vh',
      verticalAlign: 'top',
      backgroundColor: '#000000',
    },
    content: {
      width: '100vw',
      height: '100vh',
    },
  })
);

export default function Faraway(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const audioPlayer: any = useRef();
  const [video, setVideo] = useState(video4);
  const dispatch = useDispatch();

  useEffect(() => {
    // const { pathname, state } = props.location;
    // var random = Math.floor( Math.random() * 5 );
    // const videos = [video1, video2, video3, video4, video5];
    var random = Math.floor( Math.random() * 2 );
    const videos = [video4, video5];
    setVideo(videos[random]);

  }, [props.location]);

  useEffect(() => {
    dispatch(disableCursor());
  }, []);

  const videoEnded = () => {
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.layout}
      onClick={() => history.push('voice')}
    >
      <video
        controls
        src={video}
        width="1080"
        onEnded={videoEnded}
        autoPlay
        ref={audioPlayer}
      />
    </Grid>
  );
}
