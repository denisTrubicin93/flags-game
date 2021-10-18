import React, { memo } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Box, Grid } from '@material-ui/core';
import Clock from './Clock';
import wifiIcon from './menubar/wifi.png';
import temiIcon from './menubar/temi1.png';
import bluetoothIcon from './menubar/bluetooth.png';

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
    right: 56,
    position: 'fixed',
    background: `url(${wifiIcon}) no-repeat center`,
  },
  bluetooth: {
    width: '24px',
    height: '24px',
    position: 'fixed',
    // top: 24,
    right: 96,
    background: `url(${bluetoothIcon}) no-repeat center`,
  },
  temi: {
    width: '24px',
    height: '24px',
    position: 'fixed',
    // top: 24,
    right: 136,
    background: `url(${temiIcon}) no-repeat center`,
  },
});


function TopNavNo(props:any) {
  const classes = useStyles();
  const classesIcon = useStylesIcon();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={4}>
        <div className="topNavLeft">
          <Clock />
        </div>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        {props.children}
      </Grid>
      <Grid item xs={4}>
        <div>
          {props.type ? null :
          <Box className={classesIcon.temi} />}
          <Box className={classesIcon.bluetooth} />
          <Box className={classesIcon.wifi} />
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(TopNavNo);
