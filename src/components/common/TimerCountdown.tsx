import React, { CSSProperties } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import bg from './svg/timer-countdown-bg.svg';

const useStyles = makeStyles({
  container: {
    width: 250,
    height: 250,
    background: `center / cover no-repeat url(${bg})`,
  },
  text: `
    font-family: Noto Sans JP;
    font-style: normal;
    font-weight: bold;
    font-size: 144px;
    line-height: 209px;
    letter-spacing: -0.04em;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  `,
});

interface TimerCountdownProps {
  seconds: number;
  onShoot: Function;
  className?: string;
  containerStyle?: CSSProperties;
  textStyle?: CSSProperties;
  cycle?: boolean;
}

export default function TimerCountdown(props: TimerCountdownProps) {
  const { seconds, onShoot, className, containerStyle, textStyle, cycle } = props;
  const classes = useStyles();
  const cn = classNames(classes.container, className);
  const [timer, setTimer] = React.useState(seconds);
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      onShoot();
      if(cycle){
        setTimer(seconds);
      }else{
        clear();
      }
    }
  }, [timer]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={cn}
      style={containerStyle}
    >
      <Typography className={classes.text} style={textStyle}>
        {timer}
      </Typography>
    </Grid>
  );
}
