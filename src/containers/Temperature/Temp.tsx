import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TempBg from './assets/temp_bg.png';
import ClockIcon from './assets/clock.png';
import useFootControl from '../../components/common/hook/useFootControl';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      '& .background': {
        width: 1080,
        height: 1920,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .top_title': {
          width: 618,
          position: 'relative',
          top: 200,
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#333333',
          textAlign: 'center',
        },
        '& .temp_bg': {
          width: '100%',
          height: 900,
          top: 210,
          position: 'relative',
        },
        '& .bottom_box': {
          position: 'relative',
          top: 400,
          width: 640,
          height: 160,
          borderRadius: 80,
          border: '2px solid #EEEEEE',
          '& .bottom_icon': {
            width: 90,
            height: 90,
          },
          '& .bottom_title': {
            fontSize: 56,
            letterSpacing: '-0.04em',
            color: '#333333',
          },
        },
      },
    },
  })
);

export default function Temp() {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    setTimeout(() => history.push('tempLoading'), 3000);
  });

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="top_title">
            非接触体温測定器 の使い方
          </Typography>
          <img className="temp_bg" src={TempBg} />
          <Grid
            container
            direction="row"
            className="bottom_box"
            alignItems="center"
            justify="space-evenly"
          >
            <img src={ClockIcon} className="bottom_icon" />
            <Typography className="bottom_title">5秒で終わります！</Typography>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
export { Temp };
