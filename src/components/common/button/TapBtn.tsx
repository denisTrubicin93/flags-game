import React, { CSSProperties, useEffect, useRef } from 'react';
import { useGesture } from 'react-use-gesture';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { updateHoverState } from '../../../features/Handtracking/reducer';
import beep from './assets/beep.mp3';
import back from './assets/back.mp3';
import { RootState } from '../../../features';
import { ButtonPoint, ButtonStatus } from '../../../features/Button/models';
import { setBtnPoint } from '../../../features/Button/reducer';

const useStyles = makeStyles({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
  },
});

interface TapBtnProps {
  style?: CSSProperties;
  onTap?: Function;
  onHover?: Function;
  className?: string;
  isBack?: boolean;
  type?: string[];
}

const TapBtn: React.FC<TapBtnProps> = ({ style, onTap, onHover, children, className, isBack, type }) => {

  const classes = useStyles();
  const cn = classNames(classes.wrapper, className);
  const dispatch = useDispatch();
  const buttonStatus = useSelector<RootState>( state => state.button.status ) as ButtonStatus;

  const [play] = useSound(beep, { volume: 0.5 });
  const [backPlay] = useSound(back, { volume: 0.5 });

  useEffect(() => {
    onTap && dispatch(setBtnPoint(ButtonPoint.BLUR));
    return () => {
      onHover && dispatch(updateHoverState(false));
      onTap && dispatch(setBtnPoint(ButtonPoint.BLUR));
    }
  }, []);

  const gesture = useGesture({
    onDrag: ({ tap, event }) => {
      if(isBack){
        backPlay();
      }else{
        play();
      }
      if (tap) {
        onTap && onTap(event);
        onTap && dispatch(setBtnPoint(ButtonPoint.BLUR));
      }
    },
    onPointerEnter: (state) => {
      console.log('onPointerEnter');
      onHover && onHover(true);
      onHover && dispatch(updateHoverState(true));
    },
    onPointerLeave: (state) => {
      console.log('onPointerLeave');
      onHover && onHover(false);
      onHover && dispatch(updateHoverState(false));
    },
  },
  {
    drag: {
      filterTaps: true,
      lockDirection: true,
    }
  });

  useEffect(() => {
    console.log(`${Date.now()} buttonStatus changed: ${buttonStatus}`);
    switch(buttonStatus) {
      case ButtonStatus.BLUR:
        onHover && onHover(false);
      break;
      case ButtonStatus.FORCUS_L1:
      case ButtonStatus.FORCUS_L2:
      case ButtonStatus.FORCUS_R1:
      case ButtonStatus.FORCUS_R2:
        {
          const target = buttonStatus.slice(-2);
          if (type?.includes(target)) {
            onHover && onHover(true);
          } else {
            onHover && onHover(false);
          }
        }
        break;
      case ButtonStatus.SELECTED_L1:
      case ButtonStatus.SELECTED_L2:
      case ButtonStatus.SELECTED_R1:
      case ButtonStatus.SELECTED_R2:
        {
          const target = buttonStatus.slice(-2);
          if (type?.includes(target)) {
            if(isBack) {
              backPlay();
            } else {
              play();
            }
            onTap && onTap();
            onTap && dispatch(setBtnPoint(ButtonPoint.BLUR));
          }
        }
        break;
      default:
        break;
    }
  }, [buttonStatus]);

  return (
    <Box className={cn} style={style} {...gesture()} data-sticky={!!onTap}>
      {children}
    </Box>
  );
}

export default TapBtn;

export {
  TapBtn
}
