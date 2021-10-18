import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';
import useFootControl from '../../../components/common/hook/useFootControl';
import { useDispatch, useSelector } from 'react-redux';
import { BloodType, HoroscopeType } from '../../../features/Omnikuji/models';
import AriesWhiteIcon from '../assets/Omikuji/white-horoscope/aries.png';
import TaurusWhiteIcon from '../assets/Omikuji/white-horoscope/taurus.png';
import GeminiWhiteIcon from '../assets/Omikuji/white-horoscope/gemini.png';
import CancerWhiteIcon from '../assets/Omikuji/white-horoscope/cancer.png';
import LeoWhiteIcon from '../assets/Omikuji/white-horoscope/leo.png';
import VirgoWhiteIcon from '../assets/Omikuji/white-horoscope/virgo.png';
import LibraWhiteIcon from '../assets/Omikuji/white-horoscope/libra.png';
import ScorpioWhiteIcon from '../assets/Omikuji/white-horoscope/scorpio.png';
import SangitariusWhiteIcon from '../assets/Omikuji/white-horoscope/sangitarius.png';
import CapricornWhiteIcon from '../assets/Omikuji/white-horoscope/capricorn.png';
import AquariusWhiteIcon from '../assets/Omikuji/white-horoscope/aquarius.png';
import PiscesWhiteIcon from '../assets/Omikuji/white-horoscope/pisces.png';

import AriesBlackIcon from '../assets/Omikuji/black-horoscope/aries.png';
import TaurusBlackIcon from '../assets/Omikuji/black-horoscope/taurus.png';
import GeminiBlackIcon from '../assets/Omikuji/black-horoscope/gemini.png';
import CancerBlackIcon from '../assets/Omikuji/black-horoscope/cancer.png';
import LeoBlackIcon from '../assets/Omikuji/black-horoscope/leo.png';
import VirgoBlackIcon from '../assets/Omikuji/black-horoscope/virgo.png';
import LibraBlackIcon from '../assets/Omikuji/black-horoscope/libra.png';
import ScorpioBlackIcon from '../assets/Omikuji/black-horoscope/scorpio.png';
import SangitariusBlackIcon from '../assets/Omikuji/black-horoscope/sangitarius.png';
import CapricornBlackIcon from '../assets/Omikuji/black-horoscope/capricorn.png';
import AquariusBlackIcon from '../assets/Omikuji/black-horoscope/aquarius.png';
import PiscesBlackIcon from '../assets/Omikuji/black-horoscope/pisces.png';
import {
  selector,
  setHoroscopeType,
  submitHoroscope,
} from '../../../features/Omnikuji/reducer';
import { RootState } from '../../../features';

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
          fontSize: 48,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000000',
        },
        '& .horoscope_btn': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 280,
          height: 311.11,
          background: '#ffffff',
          borderRadius: 12.64,
          overflow: 'hidden',
          border: '16px solid #FFFFFF',
        },
        '& .icon': {
          width: 200,
          display: 'block',
          height: 200,
        },
        '& .horoscope_btn_active': {
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          '& .center_title': {
            color: '#ffffff',
          },
        },
      },
    },
  })
);

const OmnikujiHoroscopeQuestions = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const blood = useSelector((rootState: RootState) =>
    selector.getBloodType(rootState.omnikuj)
  );

  const handleHoroscopeTypeChosen = (horoscopeType: HoroscopeType) => {
    dispatch(setHoroscopeType(horoscopeType));

    dispatch(submitHoroscope({ blood: blood, birth: horoscopeType }));
    history.push('/omikujiResult');
  };

  const buttons: any[] = [
    {
      centerTitle: 'おひつじ座',
      name: 'Aries',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Aries),
    },
    {
      centerTitle: 'おうし座',
      name: 'Taurus',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Taurus),
    },
    {
      centerTitle: 'ふたご座',
      name: 'Gemini',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Gemini),
    },
    {
      centerTitle: 'かに座',
      name: 'Cancer',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Cancer),
    },
    {
      centerTitle: 'しし座',
      name: 'Leo',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Leo),
    },
    {
      centerTitle: 'おとめ座',
      name: 'Virgo',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Virgo),
    },
    {
      centerTitle: 'てんびん座',
      name: 'Libra',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Libra),
    },
    {
      centerTitle: 'さそり座',
      name: 'Scorpio',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Scorpio),
    },
    {
      centerTitle: 'いて座',
      name: 'Sangitarius',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Sangitarius),
    },
    {
      centerTitle: 'やぎ座',
      name: 'Capricorn',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Capricorn),
    },
    {
      centerTitle: 'みずがめ座',
      name: 'Aquarius',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Aquarius),
    },
    {
      centerTitle: 'うお座',
      name: 'Pisces',
      onTap: () => handleHoroscopeTypeChosen(HoroscopeType.Pisces),
    },
  ];

  const { currentIndex, onTap, onHover } = useFootControl({
    intitialIndex: 0,
    actions: buttons.map((x: any) => x.onTap as Function),
    goBack: () => history.push('menu'),
  });

  const buttonClasses = (index: number) => {
    return currentIndex === index
      ? 'horoscope_btn horoscope_btn_active'
      : 'horoscope_btn';
  };

  const getIcon = (index: number, name: string) => {
    switch (name) {
      case 'Aries':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${AriesWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${AriesBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Taurus':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${TaurusWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${TaurusBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Gemini':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${GeminiWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${GeminiBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Cancer':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${CancerWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${CancerBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Leo':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${LeoWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${LeoBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Virgo':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${VirgoWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${VirgoBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Libra':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${LibraWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${LibraBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Scorpio':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${ScorpioWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${ScorpioBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Sangitarius':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${SangitariusWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${SangitariusBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Capricorn':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${CapricornWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${CapricornBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Aquarius':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${AquariusWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${AquariusBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      case 'Pisces':
        return currentIndex === index ? (
          <Box
            className="icon"
            style={{
              background: `url(${PiscesWhiteIcon}) center no-repeat`,
            }}
          ></Box>
        ) : (
          <Box
            className="icon"
            style={{
              background: `url(${PiscesBlackIcon}) center no-repeat`,
            }}
          ></Box>
        );
      default:
        return <></>;
    }
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
              星座は？
            </Typography>
          </Grid>
          <Grid style={{ padding: '55px' }} container alignContent="center">
            {buttons.map((x, index) => (
              <Grid
                style={{ margin: '20px' }}
                item
                className={buttonClasses(index)}
                key={index}
                onClick={() => onTap(index)}
                onMouseOver={() => onHover(index)}
              >
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid>
                    <Typography className="center_title">
                      {x.centerTitle}
                    </Typography>
                  </Grid>
                  <Grid>{getIcon(index, x.name)}</Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default OmnikujiHoroscopeQuestions;

export { OmnikujiHoroscopeQuestions };
