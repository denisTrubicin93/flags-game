import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setType } from '../../features/Scenes/reducer';
import child from './assets/child.png';
import adult from './assets/adult.png';
import BorderBg from './assets/border_bg.png';
import BorderBgActive from './assets/border_bg_active.png';
import useFootControl from '../../components/common/hook/useFootControl';
import GestureHelp from './assets/gesture_help.png';
import { ButtonPoint } from '../../features/Button/models';
import { messageAction2 } from '../../features/Websocket/reducer';
import menuSound from './assets/menu_background_sound.mp3';
import useSound from 'use-sound';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      '& .music_header': {
        position: 'absolute',
        height: 155,
        width: '100%',
        background: '#C4C4C4',
        top: 0,
        zIndex: 100,
        color: '#000000',
        fontSize: 64,
        letterSpacing: '0.025em',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
        fontWeight: 900,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 155,
        boxSizing: 'border-box',
      },
      '& .background': {
        width: 1080,
        height: 1920,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .btn_box': {
          position: 'relative',
          width: '70%',
          top: 545,
        },
        '& .border_btn': {
          width: 320,
          height: 320,
          background: `url(${BorderBg}) no-repeat center`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.25)',
          borderRadius: 80,
          marginBottom: 10,
        },
        '& .border_btn_active': {
          background: `url(${BorderBgActive}) no-repeat center`,
        },
        '& .btn_title': {
          color: '#613BFF',
          fontWeight: 800,
          fontSize: 48,
          textAlign: 'center',
        },
        '& .guide_box': {
          width: 920,
          height: 420,
          borderRadius: 24,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          position: 'relative',
          top: 1020,
          paddingLeft: 80,
          paddingRight: 30,
          '& .left_title': {
            width: 280,
            height: 186,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#ffffff',
          },
          '& .right_img': {
            width: 432,
            height: 268,
          }
        },
      },
    },
  })
);

const Scenes = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [playMenuBackgroundSound, { stop }] = useSound(menuSound, { volume: 0.5 })

  useEffect(() => {
    const logo = document.getElementById('aflac-logo');
    if (logo) {
      logo.style.width = '155px';
      logo.style.height = '155px';
    }
  }, []);

  useEffect(() => {
    if (playMenuBackgroundSound) {
      playMenuBackgroundSound()
    }

    return stop
  }, [playMenuBackgroundSound])

  const buttons: any[] = [
    {
      title: 'こども',
      onTap: () => {
        dispatch(setType('child'));
        history.push('menu');
      },
      icon: child,
    },
    {
      title: '大人',
      onTap: () => {
        dispatch(setType('adult'));
        history.push('menu');
      },
      icon: adult,
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => {},
  });

  const buttonClasses = (index: number) => {
    return index === currentIndex
      ? 'border_btn border_btn_active'
      : 'border_btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Typography className="music_header">
          アフラックマジックミラー
        </Typography>
        <Box className="background">
          <Grid
            container
            direction="row"
            justify="space-between"
            className="btn_box"
          >
            {buttons.map((x, index) => (
              <Grid
                item
                direction="column"
                justify="center"
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <Box className={buttonClasses(index)}>
                  <img src={x.icon} />
                </Box>
                <Typography className="btn_title">{x.title}</Typography>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="guide_box"
            onClick={() => dispatch(messageAction2(ButtonPoint.L2))}
          >
            <Typography className="left_title">
              操作パッドに 足を踏んで 操作してね！
            </Typography>
            <img className="right_img" src={GestureHelp} />
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Scenes;

export { Scenes };
