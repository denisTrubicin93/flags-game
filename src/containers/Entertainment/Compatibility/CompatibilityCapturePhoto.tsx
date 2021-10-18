import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CapturePhoto } from '../../common/CapturePhoto';
import Loading from '../../../components/common/Loading';
import { bodydetect } from '../../../service/FaceplusplusService';

const useStyles = makeStyles(() =>
  createStyles({
    error_msg: {
      fontFamily: 'Noto Sans JP',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 45,
      textAlign: 'center',
      color: '#FFFFFF',
    },
  })
);

export default function CompatibilityCapturePhoto() {
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const showErrorAwhile = () => {
    setError(true);
    setTimeout(() => setError(false), 3000);
  };

  const convertColor = (color: string) => {
    switch (color) {
      case 'white':
        return 1;
      case 'black':
        return 2;
      case 'gray':
        return 3;
      case 'red':
        return 4;
      case 'cyan':
      case 'blue':
        return 5;
      case 'yellow':
      case 'orange':
        return 6;
      case 'green':
        return 7;
      case 'purple':
        return 8;
      case 'magenta':
        return 9;
      default:
        return 0;
    }
  };

  const handleNext = (imageBase64: string) => {
    setLoading(true);
    bodydetect(imageBase64)
      .then(function (response: any) {
        console.log(response);
        if (response.data.humanbodies?.length > 1) {
          let color1 =
            response.data.humanbodies[0].attributes.upper_body_cloth
              .upper_body_cloth_color;
          let color2 =
            response.data.humanbodies[1].attributes.upper_body_cloth
              .upper_body_cloth_color;
          color1 = convertColor(color1);
          color2 = convertColor(color2);
          if (color1 !== 0 && color2 !== 0) {
            history.push({
              pathname: '/compatibilityResult',
              state: { color1: color1, color2: color2 },
            });
            setLoading(false);
          } else {
            setLoading(false);
            showErrorAwhile();
            setErrorMsg('Detect the unknown color!');
          }
        } else {
          setLoading(false);
          showErrorAwhile();
          setErrorMsg('二人で撮影してください!');
        }
      })
      .catch(function (error: any) {
        console.log(error);
        setLoading(false);
        showErrorAwhile();
        setErrorMsg('Detect error, please try again！');
      });
  };

  return (
    <>
      <CapturePhoto onNext={(imageBase64: string) => handleNext(imageBase64)} background="#FF7E9D" />

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
}

export { CompatibilityCapturePhoto };
