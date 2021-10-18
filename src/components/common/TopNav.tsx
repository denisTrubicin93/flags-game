import React, { memo, ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid } from '@material-ui/core';
import ArrowDown from './icons/ArrowDown';
import Clock from './Clock';
import wifiIcon from '../assets/beauty/png/wifi.png';
import temiIcon from '../assets/beauty/png/temi1.png';
import bluetoothIcon from '../assets/beauty/png/bluetooth.png';
import { useSpring } from "react-spring";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      textAlign: 'center',
      width: '100%',
      marginTop: 24,
    },
    goBack: {
      border: 0,
      outline: 0,
      background: 'none',
      color: '#fff',
      fontSize: 24,
      lineHeight: '100%',
      position: 'relative',
      verticalAlign: 'top',
    },
    icon: {
      position: 'absolute',
      height: 8,
      width: 28,
      bottom: 0,
      left: '50%',
      marginLeft: -14,
    },
  })
);

const useStylesIcon = makeStyles({
  wifi: {
    width: '24px',
    height: '24px',
    // top: 24,
    right: 40,
    position: 'fixed',
    background: `url(${wifiIcon}) no-repeat center`,
  },
  bluetooth: {
    width: '24px',
    height: '24px',
    position: 'fixed',
    // top: 24,
    right: 80,
    background: `url(${bluetoothIcon}) no-repeat center`,
  },
  temi: {
    width: '24px',
    height: '24px',
    position: 'fixed',
    // top: 24,
    right: 120,
    background: `url(${temiIcon}) no-repeat center`,
  },
});

type TopNavProps = {
  onClick: () => void;
  children: NonNullable<ReactNode>;
  finished: Boolean
};

function TopNav({ onClick, children, finished }: TopNavProps) {
  const classes = useStyles();
  const classesIcon = useStylesIcon();
  const fontsize = useSpring({
    fontSize: finished ? '32px' : '24px',
  });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={4}>
        <div className="topNavLeft">
          <Clock />
        </div>
      </Grid>
      <Grid item xs={4}>
        <button type="button" className={classes.goBack} style={fontsize} onClick={onClick}>
          {children}
          <div className={classes.icon}>
            <ArrowDown />
          </div>
        </button>
      </Grid>
      <Grid item xs={4}>
        <div>
          <Box className={classesIcon.temi} />
          <Box className={classesIcon.bluetooth} />
          <Box className={classesIcon.wifi} />
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(TopNav);
