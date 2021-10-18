import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import exerciseIcon from './assets/exercise.svg';
import {
  PrevBtn,
  RequestHelpBtn,
  FancyBorderBtn,
} from '../../components/common/button';
import { setLibrary } from '../../features/Quiz/reducer';
import Loading from '../../components/common/Loading';
import { getQuizLibrary } from '../../service/QuizService';
import backArrow from './assets/Common/back-arrow.png';
import confirmArrow from './assets/Common/confirm-arrow.png';
import leftArrow from './assets/Common/left-arrow.png';
import rightArrow from './assets/Common/right-arrow.png';
import quiz from './assets/Common/quiz.png';
import skin from './assets/Common/skin.png';
import face from './assets/Common/face.png';
import compatibility from './assets/Common/compatibility.png';
import omikuji from './assets/Common/omikuji.png';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: '1080px',
      height: '1920px',
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': `
        position: absolute;
        width: 1080px;
        height: 1920px;
        left: 0px;
        background: radial-gradient(50% 50% at 50% 50%, #2C2F37 0%, #000000 100%);
        opacity: 0.7;
        border-radius: 70px;
      `,
      '& .choose_entertainment_title': `
        position: absolute;
        width: 322.92px;
        height: 69.11px;
        left: 384px;
        top: 1080px;

        font-family: Noto Sans JP;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 58px;
        text-align: center;
        letter-spacing: -0.04em;

        color: #FFFFFF;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      `,
      '& .entertainment0': `
        position: absolute;
        width: 250px;
        height: 250px;
        left: 50px;
        top: 789px;
        z-index: 1;
      `,
      '& .entertainment1': `
        position: absolute;
        width: 250px;
        height: 250px;
        top: 788px;
        left: 195px;
        z-index: 2;
      `,
      '& .entertainment2': `
        position: absolute;
        width: 350px;
        height: 350px;
        top: 730px;
        left: 365px;
        z-index: 3;
      `,
      '& .entertainment3': `
        position: absolute;
        width: 250px;
        height: 250px;
        top: 788px;
        left: 643px;
        z-index: 2;
      `,
      '& .entertainment4': `
        position: absolute;
        width: 250px;
        height: 250px;
        top: 787px;
        left: 781px;
        z-index: 1;
      `,
    },
  })
);

const Entertainment = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleQuizClick = () => {
    setLoading(true);
    getQuizLibrary()
      .then(function (response) {
        response.data && dispatch(setLibrary(response.data));
        history.push('quiz');
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        history.push('quiz');
        setLoading(false);
      });
  };

  const [entertainments, setEntertainments] = React.useState([
    { icon: quiz, title: 'クイズ', onTab: handleQuizClick },
    {
      icon: skin,
      title: '肌診断',
      onTab: () => {
        history.push('skinCapturePhoto');
      },
    },
    {
      icon: face,
      title: '顔占い',
      onTab: () => {
        history.push('faceCapturePhoto');
      },
    },
    {
      icon: compatibility,
      title: '相性診断',
      onTab: () => {
        history.push('compatibility');
      },
    },
    {
      icon: omikuji,
      title: 'おみくじ',
      onTab: () => {
        history.push('omikuji');
      },
    },
  ]);

  const confirm = () => {
    entertainments[2].onTab();
  };
  const prev = () => {
    setEntertainments((state) => {
      const newState = state.slice();
      const last = newState.pop();
      newState.unshift(last);
      return newState;
    });
  };
  const next = () => {
    setEntertainments((state) => {
      const newState = state.slice();
      const first = newState.shift();
      newState.push(first);
      return newState;
    });
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background" />

        <Grid
          style={{
            width: '100%',
            height: '100%',
            paddingTop: 75,
            paddingBottom: 130,
          }}
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item container justify="space-around" alignItems="center">
            <FancyBorderBtn
              size="normal"
              onTap={() => {
                history.push('scenes');
              }}
              icon={backArrow}
              title="最初に戻る"
              type={['L1']}
            />
            <FancyBorderBtn
              size="normal"
              onTap={confirm}
              icon={confirmArrow}
              title="確認"
              type={['R1']}
            />
          </Grid>
          <Grid item container justify="space-around" alignItems="center">
            <FancyBorderBtn
              size="normal"
              onTap={prev}
              icon={leftArrow}
              title="前へ"
              type={['L2']}
            />
            <FancyBorderBtn
              size="normal"
              onTap={next}
              icon={rightArrow}
              title="次へ"
              type={['R2']}
            />
          </Grid>
        </Grid>

        {entertainments.map((entertainment, index) => (
          <img
            src={entertainment.icon}
            alt={entertainment.title}
            className={`entertainment${index}`}
          />
        ))}
        <Typography className="choose_entertainment_title">
          {entertainments[2].title}
        </Typography>
      </Box>
      <Dialog fullScreen open={loading}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Loading color="white" height={200} width={200} />
        </Grid>
      </Dialog>
    </>
  );
};

export default Entertainment;

export { Entertainment };
