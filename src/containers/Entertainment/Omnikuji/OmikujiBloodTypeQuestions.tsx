import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';

import useFootControl from '../../../components/common/hook/useFootControl';
import { useDispatch } from 'react-redux';
import { setBloodType } from '../../../features/Omnikuji/reducer';
import { BloodType } from '../../../features/Omnikuji/models';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        position: 'absolute',
        width: 1080,
        height: 1920,
        backgroundColor: '#FED17C',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .center_title_header': {
          fontFamily: 'Noto Sans JP',
          fontSize: 150,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000',
        },
        '& .center_title': {
          fontFamily: 'Noto Sans JP',
          fontSize: 80,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000',
        },
        '& .blood_btn': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 360,
          height: 400,
          background: '#ffffff',
          borderRadius: 16,
          overflow: 'hidden',
          border: '16px solid #FFFFFF',
        },
        '& .blood_btn_active': {
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          '& .center_title': {
            color: '#ffffff',
          },
        },
      },
    },
  })
);

const OmikujiBloodTypeQuestions = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBloodTypeChosen = (bloodType: BloodType) => {
    dispatch(setBloodType(bloodType));
    history.push('omikujiHoroscopeQuestions');
  };

  const buttons: any[] = [
    {
      centerTitle: 'A型',
      onTap: () => handleBloodTypeChosen(BloodType.A),
    },
    {
      centerTitle: 'B型',
      onTap: () => handleBloodTypeChosen(BloodType.B),
    },
    {
      centerTitle: 'O型',
      onTap: () => handleBloodTypeChosen(BloodType.O),
    },
    {
      centerTitle: 'AB型',
      onTap: () => handleBloodTypeChosen(BloodType.AB),
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index ? 'blood_btn blood_btn_active' : 'blood_btn';
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Grid>
            <Typography className="center_title_header" variant="h1">
              あなたの
            </Typography>
            <Typography className="center_title_header" variant="h1">
              血液型は？
            </Typography>
          </Grid>
          <Grid
            style={{ position: 'absolute', top: 440, width: 920, height: 1040 }}
            container
            justify="space-between"
            alignContent="space-between"
          >
            {buttons.map((x, index) => (
              <Box
                className={buttonClasses(index)}
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <Typography className="center_title">
                  {x.centerTitle}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default OmikujiBloodTypeQuestions;

export { OmikujiBloodTypeQuestions };
