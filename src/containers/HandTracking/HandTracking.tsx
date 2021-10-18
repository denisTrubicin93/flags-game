import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import leftHandFive from './assets/left-hand-five.png';
import rightHandFive from './assets/right-hand-five.png';
import leftHandFist from './assets/left-hand-fist.png';
import rightHandFist from './assets/right-hand-fist.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../features';
import { HandIndex, HandCursor, leftHandCursor as LeftCursor, rightHandCursor as RightCursor } from '../../features/Handtracking/models';
import { Progress } from 'react-sweet-progress';

import {
  HANDSIGN_HEIGHT,
  HANDSIGN_WIDTH,
  ENABLE_HOVER_CLICK,
} from './config';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  leftHand: {
    width: `${HANDSIGN_WIDTH}px`,
    height: `${HANDSIGN_HEIGHT}px`,
    position: 'fixed',
    background: `url(${leftHandFive}) no-repeat center`,
    backgroundColor: `rgba(255,255,255,0.6)`,
    zIndex: 9000,
    borderRadius: '100%',
  },
  leftHandFist: {
    width: `${HANDSIGN_WIDTH}px`,
    height: `${HANDSIGN_HEIGHT}px`,
    position: 'fixed',
    background: `url(${leftHandFist}) no-repeat center`,
    backgroundColor: `rgba(255,255,255,0.6)`,
    zIndex: 9000,
    borderRadius: '100%',
  },
  rightHand: {
    width: `${HANDSIGN_WIDTH}px`,
    height: `${HANDSIGN_HEIGHT}px`,
    position: 'fixed',
    background: `url(${rightHandFive}) no-repeat center`,
    backgroundColor: `rgba(255,255,255,0.6)`,
    zIndex: 9000,
    borderRadius: '100%',
  },
  rightHandFist: {
    width: `${HANDSIGN_WIDTH}px`,
    height: `${HANDSIGN_HEIGHT}px`,
    position: 'fixed',
    background: `url(${rightHandFist}) no-repeat center`,
    backgroundColor: `rgba(255,255,255,0.6)`,
    zIndex: 9000,
    borderRadius: '100%',
  },
  progress: {
    display: 'inline-block',
    position: 'fixed',
    zIndex: 9001,
    width: '120px',
    height: '120px',
    pointerEvents: 'none',
    '& .react-sweet-progress': `
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
          align-items: center;
      -ms-flex-pack: center;
          justify-content: center;
      width: 100%;
    `,
    '& .react-sweet-progress-symbol': `
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
          align-items: center;
      -ms-flex-pack: start;
          justify-content: flex-start;
      width: 35px;
      height: 20px;
      padding-left: 10px;
      color: rgba(0, 0, 0, 0.7);
      font-weight: 200; `,
    '& .react-sweet-progress-symbol-absolute': `
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      -ms-flex-align: center;
          align-items: center;
      -ms-flex-pack: center;
          justify-content: center;
      transform: translate3d(-50%, -50%, 0); `,
    '& .react-sweet-progress-symbol-absolute .react-sweet-progress-symbol': `
        padding: 0;
        width: 100%; `,
    '& .react-sweet-progress-circle-outer': `
      position: relative;
      display: block;
      vertical-align: middle;
    `,
    '& .react-sweet-progress-line': `
      width: 100%;
      border-radius: 100px;
      background-color: #efefef;
      vertical-align: middle; `,
    '& .react-sweet-progress-line-inner': `
        position: relative;
        min-height: 10px;
        border-radius: 100px;
        transition: width 0.3s ease; `,
    '& .react-sweet-progress-line-inner-status-active:before': `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 10px;
      background: #fff;
      animation: active-anim 2s cubic-bezier(0.25, 1, 0.6, 1) infinite;
      content: "";
      opacity: 0; `,

    '& @keyframes active-anim': `
      0% {
        width: 0;
        opacity: .1; }
      20% {
        width: 0;
        opacity: .5; }
      to {
        width: 100%;
        opacity: 0; }
    `,
    '& .react-sweet-progress-circle path': `
      stroke-linecap: round;
    `,
  },
  progressSymbol: {
    visibility: 'hidden',
  }
});

const HandTracking: React.FC = ({ children }) => {
  const classes = useStyles();
  const leftCursor = useSelector<RootState, HandCursor>(state => state.cursor.hands[HandIndex.LEFT]);
  const rightCursor = useSelector<RootState, HandCursor>(state => state.cursor.hands[HandIndex.RIGHT]);
  const progressPercent = useSelector<RootState, number>(state => state.cursor.hoverClickPercent);
  const progressStatus = useSelector<RootState, 'default' | 'success' | 'active' | 'error' >(state => state.cursor.hoverClickStatus);
  const cursorIsHovering = useSelector<RootState, boolean>(state => state.cursor.isHovering);
  const cursorIsSuspending = useSelector<RootState, boolean>(state => state.cursor.isSuspending);
  const leftProgressRef = useRef(null);
  const rightProgressRef = useRef(null);

  useEffect(() => {
    document.body.appendChild(LeftCursor);
    document.body.appendChild(RightCursor);
  }, []);

  useEffect(() => {
    LeftCursor.className = leftCursor.isDown ? classes.leftHandFist : classes.leftHand;
    LeftCursor.style.display = leftCursor.isExist ? 'block' : 'none';
    LeftCursor.style.left = `${leftCursor.x - (HANDSIGN_WIDTH/2)}px`;
    LeftCursor.style.top = `${leftCursor.y - (HANDSIGN_HEIGHT/2)}px`;

    if (leftProgressRef.current) {
      leftProgressRef.current.style.display = LeftCursor.style.display;
      leftProgressRef.current.style.left = LeftCursor.style.left;
      leftProgressRef.current.style.top = LeftCursor.style.top;
    }
    if (cursorIsSuspending) {
      LeftCursor.style.display = 'none';
      leftProgressRef.current.style.display = 'none';
    }
  }, [leftCursor, cursorIsSuspending]);

  useEffect(() => {
    RightCursor.className = rightCursor.isDown ? classes.rightHandFist : classes.rightHand;
    RightCursor.style.display = rightCursor.isExist ? 'block' : 'none';
    RightCursor.style.left = `${rightCursor.x - (HANDSIGN_WIDTH/2)}px`;
    RightCursor.style.top = `${rightCursor.y - (HANDSIGN_HEIGHT/2)}px`;

    if (rightProgressRef.current) {
      rightProgressRef.current.style.display = RightCursor.style.display;
      rightProgressRef.current.style.left = RightCursor.style.left;
      rightProgressRef.current.style.top = RightCursor.style.top;
    }

    if (cursorIsSuspending) {
      RightCursor.style.display = 'none';
      rightProgressRef.current.style.display = 'none';
    }

  }, [rightCursor, cursorIsSuspending]);
  return (
    <>
      <Box
        ref={leftProgressRef}
        className={classes.progress}
        visibility={cursorIsHovering ? 'visible' : 'hidden' }
      >
        { ENABLE_HOVER_CLICK === 'true' && <Progress
          type="circle"
          percent={progressPercent}
          status={progressStatus}
          strokeWidth="8"
          width="120"
          theme={
            {
              default: {
                trailColor: `rgba(172,216,230,0.4)`,
                color: `rgba(0,0,255,0.8)`
              },
              success: {
                trailColor: `rgba(0,255,0,0.4)`,
                color: `rgba(0,128,0,0.8)`
              },
              active: {
                trailColor: `rgba(255,255,0,0.4)`,
                color: `rgba(155,165,0,0.8)`
              },
              error: {
                trailColor: `rgba(255,192,203,0.4)`,
                color: `rgba(255,0,0,0.8)`
              },
            }
          }
          symbolClassName={classes.progressSymbol}
        />}
      </Box>
      <Box
        ref={rightProgressRef}
        className={classes.progress}
        visibility={cursorIsHovering ? 'visible' : 'hidden' }
      >
        { ENABLE_HOVER_CLICK === 'true' && <Progress
          type="circle"
          percent={progressPercent}
          status={progressStatus}
          strokeWidth="8"
          width="120"
          theme={
            {
              default: {
                trailColor: `rgba(172,216,230,0.4)`,
                color: `rgba(0,0,255,0.8)`
              },
              success: {
                trailColor: `rgba(0,255,0,0.4)`,
                color: `rgba(0,128,0,0.8)`
              },
              active: {
                trailColor: `rgba(255,255,0,0.4)`,
                color: `rgba(155,165,0,0.8)`
              },
              error: {
                trailColor: `rgba(255,192,203,0.4)`,
                color: `rgba(255,0,0,0.8)`
              },
            }
          }
          symbolClassName={classes.progressSymbol}
        />}
      </Box>
    </>
  );
};

export { HandTracking };
