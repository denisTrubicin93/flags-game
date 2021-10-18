import React, { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import Grid from '@material-ui/core/Grid';
import { Timer } from './clock/Timer';
import { useSpring, animated } from "react-spring";

export default function Clock(props: any) {
  const [time, setTime] = useState<string>('');
  let disposable: Subscription

  const request = function () {
    disposable = Timer.getInstance().updateTime.subscribe(
      (result) => {
        setTime(result);
      }
    );
    return () => {
      disposable.unsubscribe();
    };
  };

  useEffect(() => {
    request();
    return () => {
      disposable.unsubscribe();
    }
  });


  return (
    <>
      <Grid
        container
        justify="flex-start"
        direction="column"
        alignItems="flex-start"
      >
        <animated.div className="xsmallFont bright font">{time}</animated.div>
      </Grid>
    </>
  );
}
