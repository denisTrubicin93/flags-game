import { ipcRenderer } from 'electron';

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from 'react-slick';

import ArrowDownIcon from './svg/ArrowDown';
import ArrowUpIcon from './svg/ArrowUp';
import TemiIcon from './svg/Temi';
import BluetoothIcon from './svg/Bluetooth';
import WifiIcon from './svg/Wifi';

import { Timer } from '../../components/common/clock/Timer';
import Youtube from './youtube';
// import MyFace from './img/myFace.png';

import { useSlickStyles } from './SlickStyles';
import { ClickableSlider } from '../../components/clickableSlider';

import { useDrag, useGesture } from 'react-use-gesture';
import FaceService from '../../service/FaceService';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    height: '100vh',
    width: '100vw',
    zIndex: 100,
    backgroundColor: '#000',
    padding: '24px 48px 32px 48px',
  },
  t1: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '96px',
    lineHeight: '110%',
    color: '#FFF',
  },
  t2: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '60px',
    lineHeight: '100%',
    color: '#FFF',
  },
  t3: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '56px',
    lineHeight: '110%',
    color: '#FFF',
  },
  t4: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'bold',
    fontWeight: 'normal',
    fontSize: '40px',
    lineHeight: '110%',
    color: '#FFF',
  },
  t5: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'bold',
    fontWeight: 'normal',
    fontSize: '40px',
    lineHeight: '110%',
    opacity: 0.25,
    color: '#FFF',
  },
  t6: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '32px',
    lineHeight: '110%',
    color: '#FFF',
  },
  t7: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '100%',
    color: '#FFF',
  },
  slideBox: {
    outline: 'none',
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 32,
    width: '100%',
    textAlign: 'center',
  },
}));

function InsuranceForm() {
  const history = useHistory();
  const classes = useStyles();
  const slickClasses = useSlickStyles();

  const [time, setTime] = useState<string>('');
  const [form, setForm] = useState([
    {
      label: '年齢',
      value: '',
      tip: 'あなたの年齢は？',
      selectItems: ['20代', '30代', '40代', '50代', '60代'],
    },
    {
      label: '性別',
      value: '',
      tip: 'あなたの性別は？',
      selectItems: ['男性', '女性'],
    },
    {
      label: '結婚',
      value: '',
      tip: '結婚されていますか？',
      selectItems: ['独身', '既婚'],
    },
    {
      label: 'お子様',
      value: '',
      tip: 'お子様はいらっしゃいますか？',
      selectItems: ['いない', 'いる'],
    },
  ]);

  const [isChooseForm, setIsChooseForm] = useState(true);
  const [currentForm, setCurrentForm] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const mainSlider = useRef<Slider>(null);
  const subSlider = useRef<Slider>(null);

  const settings = {
    dots: false,
    slidesToShow: 1,
    infinite: false,
    arrows: true,
    centerMode: true,
    centerPadding: '25%',
  };

  const request = function () {
    const disposable = Timer.getInstance().updateTime.subscribe((result) => {
      setTime(result);
    });
    return () => {
      disposable.unsubscribe();
    };
  };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const situation = FaceService.default().get();
    form[0].value = `${situation.age}代`;
    form[1].value = `${situation.genderJa}`;
    form[2].value = `${situation.marriageJa}`;
    form[3].value = `${situation.haveChildrenJa}`;
    setForm(form);
  },[]);

  const slickPrev = () => {
    const slider = isChooseForm ? mainSlider : subSlider;
    slider.current?.slickPrev();
  };

  const slickNext = () => {
    const slider = isChooseForm ? mainSlider : subSlider;
    slider.current?.slickNext();
  };

  const handleBack = useCallback(() => {
    history.push('insurance');
  }, [history]);

  const handleChooseForm = () => {
    const currentItemIndex = form[currentForm].selectItems.findIndex((item) => item == form[currentForm].value)
    setCurrentItem(currentItemIndex);
    subSlider.current?.slickGoTo(currentItemIndex, true);
    setIsChooseForm(false);
  };

  const handleChooseItem = () => {
    const tempForm = form.map((item, index) => {
      if (index == currentForm) {
        return { ...item, value: item.selectItems[currentItem] };
      } else {
        return item;
      }
    });
    setForm(tempForm);

    age(tempForm[0].value);
    gender(tempForm[1].value);
    marriage(tempForm[2].value);
    children(tempForm[3].value);

    setIsChooseForm(true);
  };

  const age = (form) => {
    let value = 30;
    switch (form) {
      case '20代':
        value = 20;
        break;
      case '30代':
        value = 30;
        break;
      case '40代':
        value = 40;
        break;
      case '50代':
        value = 50;
        break;
      case '60代':
        value = 60;
        break;
      default:
        break;
    }
    FaceService.default().setAge(value);
  };
  const gender = (form) => {
    switch (form) {
      case '男性':
        FaceService.default().setGender('male');
        break;
      case '女性':
        FaceService.default().setGender('female');
        break;
      default:
    }
  };
  const marriage = (form) => {
    switch (form) {
      case '独身':
        FaceService.default().setMarriage(false);
        break;
      case '既婚':
        FaceService.default().setMarriage(true);
        break;
      default:
    }
  };
  const children = (form) => {
    switch (form) {
      case 'いない':
        FaceService.default().setHaveChildren(false);
        break;
      case 'いる':
        FaceService.default().setHaveChildren(true);
        break;
      default:
    }
  };

  const gesture = useGesture({
    onDragEnd: ({ direction, event }) => {
      console.log('onDragEnd: ', direction);
      // event.preventDefault();
      (direction[0] < 0) ? slickNext() : slickPrev();
    },
  },
  {
    drag: {
      axis: 'x',
      lockDirection: true,
      delay: 100,
      filterTaps: false,
    }
  });

  const tapGesture = useGesture({
    onDrag: (state) => {
      console.log('onDrag: tapGesture: tap: ', state.tap);
      if (state.tap) {
        console.log('tap elapsedTime: ', state.elapsedTime);
        if (state.elapsedTime > 100) {
          isChooseForm ? handleChooseForm() : handleChooseItem();
        }
      }
    }
  },
  {
    drag: {
      axis: 'x',
      lockDirection: true,
      delay: 300,
      filterTaps: true,
    }
  });

  const gestureBack = useGesture({
    onDrag: (state) => {
      console.log('onDrag: ', state.tap);
      if (state.tap) {
        history.push('insurance')
      }
    }
  },
  {
    drag: {
      axis: 'x',
      lockDirection: true,
      delay: 300,
      filterTaps: true,
    }
  });

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={4} style={{ textAlign: 'left' }}>
          <Typography className={classes.t7} component="span">
            {time}
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'center' }} onClick={handleBack}>
          <Typography className={classes.t7} component="span">
            プランへ戻る
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <TemiIcon />
          <BluetoothIcon style={{ marginLeft: 17 }} />
          <WifiIcon style={{ marginLeft: 17 }} />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <ArrowDownIcon />
      </Grid>
      <Box style={{
        position: 'fixed',
        top: '0px',
        left: '40vw',
        background: 'transparent',
        width: '20vw',
        height: '8rem' }}
      {...gestureBack()} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: 25, marginBottom: 50 }}
      >
        <Typography className={classes.t1}>保険シミュレーション</Typography>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Youtube />
      </Grid>
      <Grid container justify="space-between" style={{ marginTop: 40 }}>
        {form.map((item, index) => {
          return (
            <Grid
              key={`ins_${index}`}
              item
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 32,
                width: 220,
                height: 212,
              }}
            >
              <Typography className={classes.t6} component="span">
                {item.label}
              </Typography>
              {item.value ? (
                <Typography className={classes.t4} component="span">
                  {item.value}
                </Typography>
              ) : (
                <Typography className={classes.t5} component="span">
                  —
                </Typography>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 110, marginBottom: 55 }}
      >
        <Typography className={classes.t3}>
          {isChooseForm
            ? 'どの条件を選びなおしますか？'
            : form[currentForm].tip}
        </Typography>
      </Grid>

      <div className={slickClasses.slickParent}>
        <Box style={{ visibility: isChooseForm ? 'visible' : 'hidden', position: isChooseForm ? 'relative' : 'absolute' }} {...gesture()}>
        <ClickableSlider
          ref={mainSlider}
          {...settings}
          initialSlide={0}
          beforeChange={(oldIndex, newIndex) => { setCurrentForm(newIndex) }}
          movedragThreshold={5}
        >
          {
            form.map((form, index) => {
              return index == currentForm ? (
                <Box
                  className={classes.slideBox}
                  {...tapGesture()}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                      width: '90%',
                      height: 425,
                      border: '2px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 32,
                      outline: 'none',
                    }}
                  >
                    <Typography className={classes.t1}>
                      {form.label}
                    </Typography>
                  </Grid>
                </Box>
              ) : (
                <Box className={classes.slideBox}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                      width: '80%',
                      height: 360,
                      border: '2px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 27,
                      opacity: 0.5,
                      outline: 'none',
                    }}
                  >
                    <Typography className={classes.t2}>
                      {form.label}
                    </Typography>
                  </Grid>
                </Box>
              );
            })
          }
        </ClickableSlider>
        </Box>
        <Box style={{ visibility: !isChooseForm ? 'visible' : 'hidden', position: !isChooseForm ? 'relative' : 'absolute' }} {...gesture()}>
        <ClickableSlider
          ref={subSlider}
          {...settings}
          beforeChange={(oldIndex, newIndex) => { setCurrentItem(newIndex) }}
          movedragThreshold={5}
        >
        { form[currentForm].selectItems.map((item, index) => {
            return index == currentItem ? (
              <Box
                className={classes.slideBox}
                {...tapGesture()}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{
                    width: '90%',
                    height: 425,
                    border: '2px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: 32,
                    outline: 'none',
                  }}
                >
                  <Typography className={classes.t1}>{item}</Typography>
                </Grid>
              </Box>
            ) : (
              <Box className={classes.slideBox}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{
                    width: '80%',
                    height: 360,
                    border: '2px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: 27,
                    opacity: 0.5,
                    outline: 'none',
                  }}
                >
                  <Typography className={classes.t2}>{item}</Typography>
                </Grid>
              </Box>
            );
          })}
        </ClickableSlider></Box>
      </div>

      <div
        className={classes.footer}
        onClick={() => {
          isChooseForm ? handleChooseForm() : handleChooseItem();
        }}
      >
        <ArrowUpIcon />
        <Typography className={classes.t4}>選択</Typography>
      </div>
    </div>
  );
}

export default memo(InsuranceForm);
