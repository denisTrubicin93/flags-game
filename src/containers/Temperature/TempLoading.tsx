import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ThermometerIcon from './assets/thermometer.png';
import { Subscription } from 'rxjs';

import { ThermalService } from '../../service/ThermalService';
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
        '& .thermometer_box': {
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: '#2E8DFF19',
          position: 'relative',
          top: 460,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& .thermometer_icon': {
            width: 133,
            height: 300,
          },
        },
        '& .title': {
          fontSize: 80,
          fontWeight: 800,
          color: '#2E8DFF',
          letterSpacing: '-0.04em',
          position: 'relative',
          top: 480,
        },
      },
    },
  })
);

const TempLoading = () => {
  const classes = useStyles();
  const history = useHistory();

  let tempDetecter: ThermalService;
  let disposable: Subscription;

  useEffect(() => {
    tempDetecter = ThermalService.default();

    disposable = tempDetecter.onDetectTempSubject.subscribe((data: any) => {
      let next = 'tempResult';
      if (data == -1) {
        next = 'tempErr'
      }

      history.push( {
        pathname:next,
        state: { temp: data}
      })

    });
    tempDetecter.start();

    return () => {
      disposable.unsubscribe();
    };
  },[]);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="thermometer_box">
            <img src={ThermometerIcon} className="thermometer_icon" />
          </Box>
          <Typography className="title">体温測定中...</Typography>
        </Box>
      </Box>
    </>
  );
};

export default TempLoading;

export { TempLoading };
