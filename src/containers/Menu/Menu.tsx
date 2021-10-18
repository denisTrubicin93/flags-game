import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Dialog, Grid } from '@material-ui/core';
import Carousel from '../../components/common/Carousel';
import ChildQuizMenuItem from './assets/child_quiz.png';
import ChildFitnessMenuItem from './assets/child_fitness.png';

import AdultQuizMenuItem from './assets/adult_quiz.png';
import AdultFitnessMenuItem from './assets/adult_fitness.png';

import AdultCompatibilityMenuItem from './assets/adult_compatibility.png';
import AdultFaceMenuItem from './assets/adult_face.png';
import AdultInsuranceMenuItem from './assets/adult_insurance.png';
import AdultOmikujiMenuItem from './assets/adult_omikuji.png';
import AdultSkinMenuItem from './assets/adult_skin.png';
import AdultTemperatureMenuItem from './assets/adult_temperature.png';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../features';
import { getQuizLibrary } from '../../service/QuizService';
import { setLibrary } from '../../features/Quiz/reducer';
import Loading from '../../components/common/Loading';
import useFootControl, { MENU_NAME } from '../../components/common/hook/useFootControl';
import { messageAction2 } from '../../features/Websocket/reducer';
import { ButtonPoint } from '../../features/Button/models';
import { BACKGROUND } from '../common/styles';
import MiddleBar from '../../components/common/MiddleBar';

const useStyles = makeStyles(() =>
  createStyles({
    app_content: {
      width: 1080,
      height: 1920,
      top: 0,
      left: 0,
      position: 'fixed',
      '& .background': {
        ...BACKGROUND,
        '& .menu_title': {
          width: 400,
          height: 80,
          borderRadius: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '4px solid #EEEEEE',
          fontSize: 48,
          fontWeight: 900,
          color: '#333333',
          opacity: 0.4,
          letterSpacing: '0.05em',
          top: 80,
          position: 'relative',
        },
        '& .carousel_box': {
          position: 'relative',
          top: 240,
        },
        '& .carousel_item': {
          display: 'flex',
          justifyContent: 'center',
          background: '#ffffff',
          height: 920,
        },
        '& .item_image': {
          width: 780,
          height: 880,
        },
        '& .play_box': {
          width: 780,
          height: 200,
          borderRadius: 100,
          background: '#ffffff',
          border: '8px solid #613BFF',
          position: 'relative',
          top: 270,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          '& .play_title': {
            fontSize: 64,
            color: '#613BFF',
            fontWeight: 'bold',
          },
          '& .play_arrow': {
            width: 120,
            height: 120,
            position: 'absolute',
            right: 40,
            top: 40,
          },
        },
        '& .gesture_bar': {
          position: 'absolute',
          left: 'unset',
          top: 1680,
          width: 920,
          height: 160,
          borderRadius: 24,
          background: 'linear-gradient(90deg, #613BFF 0%, #3B76FF 100%)',
          justifyContent: 'space-between',
          padding: '0 20px',
        },
      },
    },
  })
);

const Menu = () => {
  const classes = useStyles();
  const history = useHistory();
  const scenesType = useSelector((state: RootState) => state.scenes.type);

  const handleAdultQuizClick = () => {
    setLoading(true);
    getQuizLibrary()
      .then(function (response: any) {
        response.data && dispatch(setLibrary(response.data));
        history.push('quiz');
        setLoading(false);
      })
      .catch(function (error: any) {
        console.log(error);
        history.push('quiz');
        setLoading(false);
      });
  };

  const menus: any[] = [
    {
      name: MENU_NAME.FINTESS_MENU,
      image: ChildFitnessMenuItem,
      onTap: () => history.push('fitness'),
      scene: 'child',
    },
    {
      name: MENU_NAME.QUIZ_MENU,
      image: ChildQuizMenuItem,
      onTap: () => history.push('quiz'),
      scene: 'child',
    },
    {
      name: MENU_NAME.OMIKUJI_MENU,
      image: AdultOmikujiMenuItem,
      onTap: () => history.push('omikuji'),
      scene: 'adult',
    },
    {
      name: MENU_NAME.SKIN_CAPTURE_MENU,
      image: AdultSkinMenuItem,
      onTap: () => history.push('skin'),
      scene: 'adult',
    },
    {
      name: MENU_NAME.INSURANCE_DETECT_MENU,
      image: AdultInsuranceMenuItem,
      onTap: () => history.push('insuranceDetect'),
      scene: 'adult',
    },
    {
      name: MENU_NAME.TEMPERATE_MENU,
      image: AdultTemperatureMenuItem,
      onTap: () => history.push('temperature'),
      scene: 'adult',
    },
    {
      name: MENU_NAME.FINTESS_MENU,
      image: AdultFitnessMenuItem,
      onTap: () => history.push('fitness'),
      scene: 'adult',
    },
    // {
    //   name: MENU_NAME.FLAG_MENU,
    //   image: AdultFlagMenuItem,
    //   onTap: () => history.push('flag'),
    //   scene: 'adult',
    // },
    {
      name: MENU_NAME.QUIZ_MENU,
      image: AdultQuizMenuItem,
      onTap: handleAdultQuizClick,
      scene: 'adult',
    },
    {
      name: MENU_NAME.FACE_CAPTURE_MENU,
      image: AdultFaceMenuItem,
      onTap: () => history.push('face'),
      scene: 'adult',
    },
    {
      name: MENU_NAME.COMPATIBILITY_MENU,
      image: AdultCompatibilityMenuItem,
      onTap: () => history.push('compatibility'),
      scene: 'adult',
    },
  ];

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const { currentIndex, onHover } = useFootControl({
    intitialIndex: 0,
    actions: menus
      .filter((x) => x.scene === scenesType)
      .map((x) => x.onTap as Function),
    goBack: () => history.push('scenes'),
    menuNames: menus
    .filter((x) => x.scene === scenesType)
    .map(x => x.name)
  });

  const indicatorStyles: CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: '#F2F2F2',
    display: 'inline-block',
    margin: '0 8px',
  };

  const carouselProps = {
    onClickItem: (index: number) => onHover(index),
    onChange: (index: number) => onHover(index),
    centerSlidePercentage: 75,
    showThumbs: false,
    showIndicators: true,
    autoPlay: false,
    centerMode: true,
    showArrows: false,
    infiniteLoop: false,
    selectedItem: currentIndex,
    useKeyboardArrows: true,
    renderIndicator: (
      onClickIndicator: (e: React.MouseEvent | React.KeyboardEvent) => void,
      isSelected: boolean,
      index: number
    ) => {
      if (isSelected) {
        return <li style={{ ...indicatorStyles, background: '#2E8DFF' }} />;
      }

      return (
        <li
          style={indicatorStyles}
          onClick={onClickIndicator}
          value={index}
          key={index}
          role="button"
          tabIndex={0}
        />
      );
    },
  };

  return (
    <>
      <Box className={classes.app_content}>
        <Box className="background">
          <Typography className="menu_title">メニュー</Typography>
          <Carousel className="carousel_box" props={carouselProps}>
            {menus
              .filter((x: any) => x.scene === scenesType)
              .map((x: any, index) => (
                <Box className="carousel_item" key={index}>
                  <img src={x.image} className="item_image" />
                </Box>
              ))}
          </Carousel>
          <Box className="play_box" onClick={() => dispatch(messageAction2(ButtonPoint.R2))}>
            <Typography className="play_title">
              OK
            </Typography>
          </Box>
          <MiddleBar
            title={scenesType === 'child' ? 'そうさぱっどの右・左を' : '操作パッドの右・左を'}
            subTitle={scenesType === 'child' ? 'あしでふんでえらんでね' : '足で踏んで選んでね'}
            className="gesture_bar"
          />
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
    </>
  );
};

export default Menu;

export { Menu };
