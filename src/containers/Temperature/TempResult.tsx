import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useTimeout } from '../../components/common/hook/useTimeout';
import TempOk from './assets/temp_ok.png';
import TempNg from './assets/temp_ng.png';
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
        '& .temp_box': {
          width: 600,
          height: 600,
          borderRadius: '50%',
          position: 'relative',
          top: 460,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .temp_icon': {
            width: 300,
            height: 300,
          },
        },
        '& .temp_box_ok': {
          background: '#30D67C19',
        },
        '& .temp_box_ng': {
          background: '#FF4B7719',
        },
        '& .title': {
          fontSize: 80,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          position: 'relative',
          top: 480,
        },
        '& .title_ok': {
          color: '#30D67C',
        },
        '& .title_ng': {
          color: '#FF4B77',
        },
        '& .degree': {
          width: 400,
          height: 120,
          textAlign: 'center',
          position: 'relative',
          top: 500,
          borderRadius: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 80,
          fontWeight: 'bold',
        },
        '& .degree_ok': {
          background: '#30D67C',
        },
        '& .degree_ng': {
          background: '#FF4B77',
        },
        '& .note': {
          fontSize: 48,
          maxWidth: 530,
          textAlign: 'center',
          position: 'relative',
          top: 530,
          lineHeight: 1.3
        },
        '& .note_ok': {
          color: '#30D67C',
        },
        '& .note_ng': {
          color: '#FF4B77',
        },
      },
    },
  })
);

const TempResult = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const degree = location.state.temp;
  useTimeout(() => history.push('menu'), 5000);

  useFootControl({
    goBack: () => history.push('menu'),
  });
  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          {degree > 37.5 ? (
            <>
              <Box className="temp_box temp_box_ng">
                <img src={TempNg} className="temp_icon" />
              </Box>
              <Typography className="title title_ng">現在の体温</Typography>
              <Typography className="degree degree_ng">{degree}°C</Typography>
              <Typography className="note note_ng">
                そのままお待ちください スタッフが参ります
              </Typography>
            </>
          ) : (
            <>
              <Box className="temp_box temp_box_ok">
                <img src={TempOk} className="temp_icon" />
              </Box>
              <Typography className="title title_ok">現在の体温</Typography>
              <Typography className="degree degree_ok">{degree}°C</Typography>
              <Typography className="note note_ok">体温正常</Typography>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TempResult;

export { TempResult };
