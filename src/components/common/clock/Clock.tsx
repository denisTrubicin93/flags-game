import React, { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { useSpring, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import { Timer } from './Timer';

export default function Clock(props: any) {
  const [time, setTime] = useState<string>('');
  const history = useHistory();

  let disposable: Subscription;

  const request = function () {
    disposable = Timer.getInstance().updateTime.subscribe((result) => {
      setTime(result);
    });
    return () => {
      disposable.unsubscribe();
    };
  };

  const handleClose = () => {
    history.push('demo');
  };

  useEffect(() => {
    request();
    return () => {
      disposable.unsubscribe();
    }
  });

  const spring = useSpring({
    fontSize: props.active ? '160px' : '64px',
    lineHeight: props.active ? '100%' : '100%'
  });

  const datePadding = useSpring({
    marginLeft: props.active ? '16px' : '0px',
    marginTop: props.active ? '16px' : '14px'
  });

  const date = moment(new Date()).format('MM月DD日');
  const week = moment(new Date()).format('dddd')

  return (
    <>
      <Grid
        container
        justify="flex-start"
        direction="column"
        alignItems="flex-start"
        onClick={handleClose}
      >
        <animated.div className="xlargeFont bright font" style={spring}>{time}</animated.div>
        <animated.div className="mediumFont bright font" style={datePadding}>{date}{week}</animated.div>
      </Grid>
    </>
  );
}
