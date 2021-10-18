import React from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularProgressWithLabel from '../../../components/common/CircularProgressWithLabel';
import { RootState } from '../../../features';
import { SkinState } from '../../../features/Skin/models';
import SmileIcon from './assets/smile_icon.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BACKGROUND, ICON_TEXT_BUTTON } from '../../common/styles';
import useFootControl from '../../../components/common/hook/useFootControl';
import NextIcon from '../assets/Common/blue_right_arrow.png';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 48,
      borderRadius: 30,
    },
    colorPrimary: {
      backgroundColor: '#F2F2F2',
    },
    bar: {
      borderRadius: 30,
      backgroundColor: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%);',
    },
  })
)(LinearProgress);

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        ...BACKGROUND,
        '& .portrait': {
          position: 'absolute',
          width: 500,
          height: 680,
          top: 40,
          borderRadius: 50,
          background: (props) =>
            `url(${props.imageBase64}) center/cover no-repeat `,
          zIndex: 1,
        },
        '& .smile_box': {
          width: 920,
          height: 151,
          position: 'absolute',
          top: 778,
          '& .smile_icon': {
            width: 120,
            height: 120,
          },
          '& .smile_progress_box': {
            width: 760,
            height: 150,
            '& .smile_title': {
              fontSize: 64,
              fontWeight: 800,
              color: '#333333',
              lineHeight: 1,
            },
            '& .smile_score': {
              fontSize: 80,
              fontWeight: 800,
              color: '#613BFF',
              lineHeight: 1,
            },
          },
        },
        '& .skin_age_box': {
          width: 920,
          height: 120,
          position: 'absolute',
          top: 1003,
          '& .hashtag': {
            color: '#333333',
            fontSize: 80,
            lineHeight: 1,
            fontWeight: 800,
          },
          '& .skin_age_title': {
            fontSize: 64,
            color: '#333333',
            lineHeight: 1,
            fontWeight: 800,
          },
          '& .skin_age': {
            fontSize: 80,
            fontWeight: 800,
            color: '#613BFF',
            lineHeight: 1,
          },
        },
        '& .circular_progress_box': {
          width: 920,
          height: 213,
          position: 'absolute',
          top: 1200,
        },
        '& .divider': {
          position: 'absolute',
          width: 920,
          height: 2,
          background: '#EEEEEE',
        },
        '& .btn': {
          ...ICON_TEXT_BUTTON,
          position: 'absolute',
          top: 1480,
          left: 560,
          '& .center_title': {
            fontSize: 48,
            color: '#333333',
            fontWeight: 800,
            position: 'relative',
            top: 30
          },
          '& .icon': {
            maxHeight: '45%',
            maxWidth: '45%',
          },
        },
        '& .btn_active': {
          border: '16px solid #613BFF',
        },
      },
    },
    mask: {
      position: 'absolute',
      border: '10px solid rgba(230, 230, 244, 0.8)',
      boxSizing: 'border-box',
      top: (props: any) => props.faceRectangle?.top,
      left: (props: any) => props.faceRectangle?.left,
      width: (props: any) => props.faceRectangle?.width,
      height: (props: any) => props.faceRectangle?.height,
    },
  })
);

const SkinAnalysis = () => {
  const history = useHistory();
  const skinState: SkinState = useSelector((state: RootState) => state.skin);
  const classes = useStyles(skinState);

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: [() => history.push('skinFood')],
    goBack: () => history.push('skinTransferHint'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'btn btn_active' : 'btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Box className="portrait"></Box>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="smile_box"
          >
            <img className="smile_icon" src={SmileIcon} />
            <Grid
              item
              container
              direction="column"
              className="smile_progress_box"
              justify="space-evenly"
            >
              <Grid item container direction="row" justify="space-between">
                <Typography className="smile_title">笑顔スコア</Typography>
                <Typography className="smile_score">
                  {skinState?.attributes?.smile &&
                    Math.round(skinState?.attributes?.smile)}
                </Typography>
              </Grid>
              {skinState?.attributes?.smile && (
                <BorderLinearProgress
                  variant="determinate"
                  value={Math.round(skinState?.attributes?.smile)}
                />
              )}
            </Grid>
          </Grid>
          <Divider className="divider" style={{ top: 965 }} />
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="skin_age_box"
          >
            <Typography className="hashtag">#</Typography>
            <Typography className="skin_age_title">あなたの肌年齢</Typography>
            <Typography className="skin_age">
              {skinState?.attributes?.age}歳
            </Typography>
          </Grid>
          <Divider className="divider" style={{ top: 1160 }} />
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="circular_progress_box"
          >
            {skinState?.attributes?.health && (
              <CircularProgressWithLabel
                value={Math.round(skinState?.attributes?.health)}
                centerLabel={Math.round(skinState?.attributes?.health)}
                downLabel="健康度"
                centerLabelStyle={{ color: '#333333', fontWeight: 800 }}
                downLabelStyle={{ color: '#333333' }}
              />
            )}
            {skinState?.attributes?.stain && (
              <CircularProgressWithLabel
                value={Math.round(skinState?.attributes?.stain)}
                centerLabel={Math.round(skinState?.attributes?.stain)}
                downLabel="シミ"
                colorReverse={true}
                centerLabelStyle={{ color: '#333333', fontWeight: 800 }}
                downLabelStyle={{ color: '#333333' }}
              />
            )}
            {skinState?.attributes?.acne && (
              <CircularProgressWithLabel
                value={Math.round(skinState?.attributes?.acne)}
                centerLabel={Math.round(skinState?.attributes?.acne)}
                downLabel="ニキビ"
                colorReverse={true}
                centerLabelStyle={{ color: '#333333', fontWeight: 800 }}
                downLabelStyle={{ color: '#333333' }}
              />
            )}
            {skinState?.attributes?.darkCircle && (
              <CircularProgressWithLabel
                value={Math.round(skinState?.attributes?.darkCircle)}
                centerLabel={Math.round(skinState?.attributes?.darkCircle)}
                downLabel="目のクマ"
                colorReverse={true}
                centerLabelStyle={{ color: '#333333', fontWeight: 800 }}
                downLabelStyle={{ color: '#333333' }}
              />
            )}
            {skinState?.attributes?.facequality && (
              <CircularProgressWithLabel
                value={Math.round(skinState?.attributes?.facequality)}
                centerLabel={Math.round(skinState?.attributes?.facequality)}
                downLabel="美しさ"
                centerLabelStyle={{ color: '#333333', fontWeight: 800 }}
                downLabelStyle={{ color: '#333333' }}
              />
            )}
          </Grid>

          <Box
            className={buttonClasses(0)}
            onClick={() => onTap(0)}
            onMouseOver={() => onHover(0)}
          >
            <img src={NextIcon} className="icon" />
            <Typography className="center_title">次へ</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SkinAnalysis;

export { SkinAnalysis };
