import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Scanner from './assets/12_Scan_Card_New_User/Scanner.png';
import { useTimeout } from '../../components/common/hook/useTimeout';
import { useModeExercise } from './useModeExercise';
import { BACKGROUND } from '../common/styles';
import ChildCardInsuranceTitle from './assets/child_card_insurance_title.png';
import AdultCardInsuranceTitle from './assets/adult_card_insurance_title.png';
import useFootControl from '../../components/common/hook/useFootControl';
import { useSelector } from 'react-redux';
import { DeviceService } from '../../service/DeviceService';
import { addContent } from '../../service/DigitalAvatarService';
import Loading from '../../components/common/Loading';

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
        background: '#FED777',
        '& .title': {
          width: 650,
          height: 286,
          position: 'absolute',
          top: 160,
        },
        '& .scanner': {
          position: 'absolute',
          top: 555,
          width: 1000,
          height: 1000,
          left: -25,
        },
      },
    },
    error_msg: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 45,
      textAlign: 'center',
    },
  })
);

const IssuanceCard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { config, scenesType } = useModeExercise();

  const exercise = useSelector((state) => state.exercise);
  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'exercise',
    coins: 20,
    content: JSON.stringify({
      fitnessItem: exercise.mode,
      challengeResult: exercise.data.result,
      counts: exercise.data.counts,
      total: config.target.value,
    }),
  };

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = (onNext: any) => {
    setError(true);
    setTimeout(() => {
      setError(false);
      onNext();
    }, 3000);
  };

  const handleSaveClick = () => {
    setLoading(true);
    addContent(content)
      .then(function (response: any) {
        console.log('response.data: ', response.data);
        history.push({
          pathname: '/scanCard',
          state: { recordId: response.data.recordId },
        });
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        showErrorAwhile(() =>
          history.push({
            pathname: '/scanCard',
          })
        );
        setErrorMsg('Save content error:(');
      });
  };

  useTimeout(handleSaveClick, 5000);

  useFootControl({
    goBack: () => history.push('menu'),
  });

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <img
            className="title"
            src={
              scenesType === 'child'
                ? ChildCardInsuranceTitle
                : AdultCardInsuranceTitle
            }
          />
          <img className="scanner" src={Scanner} />
        </Box>
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
      <Dialog fullScreen open={error}>
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
          <Typography className={classes.error_msg}>{errorMsg}</Typography>
        </Grid>
      </Dialog>
    </>
  );
};

export default IssuanceCard;

export { IssuanceCard };
