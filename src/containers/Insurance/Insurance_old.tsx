import React, { useCallback, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useGesture } from 'react-use-gesture';
import { useSelector } from 'react-redux';
import AppPage from '../../components/common/AppPage';
import Carousel from '../../components/common/Carousel';
import InsuranceCard from './InsuranceCard';
import QrCode from './assets/QrCode.png';
import ScanMe from './assets/ScanMe.png';

import InsuranceAllIn from './assets/InsuranceAllIn.png';
import InsuranceEver from './assets/InsuranceEver.png';
import InsuranceFemaleEver from './assets/InsuranceFemaleEver.png';
import InsuranceKaigoEver from './assets/InsuranceKaigoEver.png';
import InsuranceKenko from './assets/InsuranceKenko.png';

import datas from './assets/data.json';

import { ProfilePanel } from './ProfilePanel';
import { RootState } from '../../features';
import { NextBtn, PrevBtn, RequestHelpBtn } from '../../components/common/button';

const useStyles = makeStyles({
  title: {
    paddingLeft: 48,
    height: 96,
    marginTop: 24,
    marginBottom: 64,
    fontFamily: 'Noto Sans JP',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '96px',
    lineHeight: '110%',
    verticalAlign: 'middle',
  },
  banner: {
    position: 'absolute',
    left: 0,
    bottom: -60,
    width: '100%',
    textAlign: 'center',
    fontSize: 48,
    color: 'black',
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingBottom: 48,
  },
  arrowRight: {
    position: 'absolute',
    display: 'table',
    zIndex: 2,
    top: '0px',
    right: '0px',
    width: '120px',
    height: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    background: 'linear-gradient(to right, rgba(255,255,255, 0.1), rgba(255,255,255, 0.25))',
  },
  arrowLeft: {
    position: 'absolute',
    display: 'table',
    zIndex: 2,
    top: '0px',
    left: '0px',
    width: '120px',
    height: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    background: 'linear-gradient(to left, rgba(255,255,255, 0.1), rgba(255,255,255, 0.25))',
  },
  appHeader: {
    display: 'inline-block',
    top: 0,
    left: 0,
    height: '160px',
    '& .vector': `
      /* Vector */


      position: absolute;
      left: 90px;
      top: 66px;
      display: 'inline-block';
      `,
    '& .request_help': `
      /* Request_Help */


      display: 'inline-block';
      position: absolute;
      width: 400px;
      height: 114px;
      left: 647px;
      top: 44px;

      border-radius: 100px;
    `,
  }
});

function Insurance(this: any) {
  const history = useHistory();
  const classes = useStyles();
  const [insuranceIndex, setInsuranceIndex] = useState(0);

  const profile = useSelector((state: RootState) => state.person.profile);

  const [banner, setBanner] = useState(false);
  const menuClickGuide = useRef(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (window.location.href.slice(-2) != '#/') {
  //       SpeechController.default().textToSpeech(
  //         'ご自宅でもスキンコンディションチェック、占い、シンガポールMATHを利用した知育教材をお持ち帰りできます。スタッフからお受け取りください。スタッフを呼びますか？'
  //       );
  //     }
  //     setBanner(true);
  //   }, 5000);

  //   setTimeout(() => {
  //     if (window.location.href.slice(-2) != '#/') {
  //       history.push('menu');
  //     }
  //   }, 12000);
  // }, []);

  const data = datas.filter((item) => {
    return item.age === profile.age && item.gender === profile.gender;
  })[0];

  const planImage = (plan) => {
    switch (plan.product) {
      case 'EVER':
        return InsuranceEver;
      case '健康応援':
        return InsuranceKenko;
      case 'ALLIN':
        return InsuranceAllIn;
      case '介護':
        return InsuranceKaigoEver;
      case '女性Ever':
        return InsuranceFemaleEver;
      default:
    }
  };

  return (
    <AppPage>
      <Box className={classes.appHeader}>
        <Box className="vector">
          <PrevBtn
            onTap={(e: any) => {
              history.push('scenes');
            }}
          />
        </Box>
        <Box className="request_help">
          <RequestHelpBtn />
        </Box>
      </Box>
      <div className={classes.title}>保険シミュレーション</div>
      <ProfilePanel profile={profile} />
      <Carousel
        index={insuranceIndex}
        onChange={(index: number) => {
          setInsuranceIndex(index);
        }}
        centerSlidePercentage={90}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <Box className={classes.arrowLeft}>
              <PrevBtn onTap={onClickHandler} style={{ display: 'table-cell', verticalAlign: 'middle' }} />
            </Box>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <Box className={classes.arrowRight}>
              <NextBtn onTap={onClickHandler} style={{ display: 'table-cell', verticalAlign: 'middle' }}/>
            </Box>
          )
        }
      >
        {data.plans.map((plan: any, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <InsuranceCard
            key={`plan_${index.toString()}`}
            headerPic={planImage(plan)}
            plan={plan.title}
            monthlyPremium={plan.price}
            service={plan.service}
            description={plan.note}
            qrCode={QrCode}
            scanMe={ScanMe}
            onClick={() => {}}
          />
        ))}
      </Carousel>
      {banner && (
        <div className={classes.banner}>スタッフをお呼び致しますか？</div>
      )}
    </AppPage>
  );
}

export default Insurance;
