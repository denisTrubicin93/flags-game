import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { RootState } from '../../features';
import { DeviceService } from '../../service/DeviceService';
import Iframe from '../../components/common/Iframe';
import { BACKGROUND } from '../common/styles';
import MiddleBar from '../../components/common/MiddleBar';
import useFootControl from '../../components/common/hook/useFootControl';
import { messageAction2 } from '../../features/Websocket/reducer';
import { ButtonPoint } from '../../features/Button/models';
import { getCurrentPoint } from '../../features/Button/reducer';

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
        '& .iframe': {
          position: 'absolute',
          width: 1080,
          height: 1615,
          top: 0,
          overflow: 'hidden',
          '& iframe': `
            top: 0 !important;
          `,
        },
        '& .gesture_bar': {
          position: 'relative',
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

function Insurance(props: any) {
  const history = useHistory();
  const classes = useStyles();
  const profile = useSelector((state: RootState) => state.person.profile);
  const insurance = useSelector((state: RootState) => state.insurance);
  const iframeRef = useRef(null);

  const url = insurance.urlIndex;
  const type = insurance.type;

  const callStaff = () => {
    DeviceService.default().callStaff();
  };

  useFootControl({
    intitialIndex: 0,
    goBack: () => history.push('insuranceChoose'),
  });

  const footPoint = useSelector(getCurrentPoint) as ButtonPoint;

  useEffect(() => {
    switch (footPoint) {
      case ButtonPoint.L1:
        iframeRef &&  iframeRef.current.scrollUp();
        break;
      case ButtonPoint.L2:
        iframeRef && iframeRef.current.scrollDown();
        break;
      default:
        break;
    }

  }, [footPoint]);

  const dispatch = useDispatch();

  return (
    <>
      <Box className={classes.app_content}>
        <Box
          className="background"
          onClick={() => dispatch(messageAction2(ButtonPoint.L1))}
        >
          <Iframe
            ref={iframeRef}
            age={profile.age}
            gender={profile.gender}
            className="iframe"
            url={url}
            type={type}
          />
          <MiddleBar
            title="足操作の右・左を"
            subTitle="踏んでスクロールしてね"
            className="gesture_bar"
          />
        </Box>
      </Box>
    </>
  );
}

export default Insurance;
