/* eslint react/jsx-props-no-spreading: off */
import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { Subscription } from 'rxjs';

import InsuranceChoose from './containers/Insurance/InsuranceChoose';
import InsuranceDetect from './containers/Insurance/InsuranceDetect';
import InsuranceDetectResult from './containers/Insurance/InsuranceDetectResult';
import InsuranceChangeAge from './containers/Insurance/InsuranceChangeAge';
import InsuranceChangeSpecAge from './containers/Insurance/InsuranceChangeSpecAge';
import InsuranceChangeNumber from './containers/Insurance/InsuranceChangeNumber';
import InsuranceChangeGender from './containers/Insurance/InsuranceChangeGender';
import Insurance from './containers/Insurance/Insurance';
import InsuranceForm from './containers/Insurance/InsuranceForm';
import InsuranceFormAge from './containers/Insurance/InsuranceFormAge';
import Scenes from './containers/Scenes';
import Menu from './containers/Menu/Menu';
import Sleep from './containers/Sleep/Sleep';
import Faraway from './containers/Faraway/Faraway';
import Horoscope from './containers/Horoscope/Horoscope';
import Members from './containers/Sample/Members';
import Sample from './containers/Sample/Sample';
import {
  ChooseExercise,
  ExerciseInstructions,
  GamePlay,
  GamePlaySquat,
  GamePlayFlags,
  Success,
  Failure,
  ScanCard,
  ExperienceSave,
  GameProgress,
  ScanCardError,
  CaloriesBurnt,
  IssuanceCard,
  GamePlayRunning,
} from './containers/Exercise';
import {
  Compatibility,
  CompatibilityCapturePhoto,
  CompatibilityResult,
  CompatibilityQRCodeScan,
  OmikujiResult,
  OmikujiQRCodeScan,
  Quiz,
  QuizAgeChoose,
  QuizQuestions,
  QuizReadyNG,
  QuizReadyOK,
  QuizReadyExplanation,
  QuizReadyScore,
  QuizTransferHint,
  QuizQRCodeScan,
  QuizTransferResult,
  Omikuji,
  OmikujiBloodTypeQuestions,
  OmnikujiHoroscopeQuestions,
} from './containers/Entertainment';
import {
  FaceReading,
  FaceCapturePhoto,
  FaceResult,
  FaceTransferHint,
  FaceQRCodeScan,
  FaceTransferResult,
  ScoreRanking,
} from './containers/Entertainment/Face';
import {
  SkinCapturePhoto,
  SkinTransferHint,
  SkinAnalysis,
  SkinVideo,
  SkinFood,
  SkinBeautify,
  SkinQRCodeScan,
  SkinTransferResult,
  SkinAge,
} from './containers/Entertainment/Skin';
import { Temp, TempLoading, TempErr } from './containers/Temperature';
import InsuranceFormGender from './containers/Insurance/InsuranceFormGender';
import InsuranceFormMarriage from './containers/Insurance/InsuranceFormMarriage';
import InsuranceFormHaveChildren from './containers/Insurance/InsuranceFormHaveChildren';

import { DeviceService, Person } from './service/DeviceService';
import { ThermalService } from './service/ThermalService';

import { useDispatch } from 'react-redux';
// import { enableCursor } from './features/Handtracking/reducer';
import AflacLogo from './components/common/AflacLogo';
import TempResult from './containers/Temperature/TempResult';

export default function Routes() {
  const location = useLocation();
  let personDetecter: DeviceService;

  if (process.env.APP_PLATFORM === 'electron') {
    const history = useHistory();
    const dispatch = useDispatch();

    let disposable: Subscription;
    let action = 0;

    useEffect(() => {
      personDetecter = DeviceService.default();

      disposable = personDetecter.onPersonDetectSubject.subscribe(
        (data: any) => {
          console.log(data);
          if (data.state == 'detect') {
            // dispatch(enableCursor());
            personDetecter.clearWait();
            history.push('/scenes');
          }
          if (data.state == 'gone') {
            // dispatch(enableCursor());
            personDetecter.clearWait();
            history.push('/');
          }

          // if (window.location.href.slice(-2) == '#/' ) {
          //   if (data.state == 'away') {
          //     history.push({
          //       pathname: 'faway',
          //       state: { pattern: action % 2 },
          //     });
          //     action += 1;
          //   }
          // }
        }
      );
      personDetecter.start();
      ThermalService.default();

      return () => {
        disposable.unsubscribe();
      };
    }, []);
  }

  useEffect(() => {
    console.log('route has been changed:' + location.pathname);
    personDetecter = DeviceService.default();
    personDetecter.setHandWait();

    // if (location.pathname.startsWith("/manual")) {
    //   personDetecter.faceRecognition()
    // }
  }, [location.pathname]);

  const withAflacLogoComponent = (Component: any) => {
    return () => {
      return (
        <>
          <AflacLogo
            style={{ position: 'absolute', left: 0, top: 0, zIndex: 1000 }}
          />
          <Component />
        </>
      );
    };
  };

  return (
    <>
      <Route exact path="/" component={Sleep} />
      <Route exact path="/faway" component={Faraway} />
      <Route exact path="/standby" component={Menu} />
      <Route
        exact
        path="/insuranceChoose"
        component={withAflacLogoComponent(InsuranceChoose)}
      />
      <Route
        exact
        path="/insuranceDetect"
        component={withAflacLogoComponent(InsuranceDetect)}
      />
      <Route
        exact
        path="/insuranceDetectResult"
        component={withAflacLogoComponent(InsuranceDetectResult)}
      />
      <Route
        exact
        path="/insuranceChangeAge"
        component={withAflacLogoComponent(InsuranceChangeAge)}
      />
      <Route
        exact
        path="/insuranceChangeSpecAge"
        component={InsuranceChangeSpecAge}
      />
      <Route
        exact
        path="/insuranceChangeNumber"
        component={InsuranceChangeNumber}
      />
      <Route
        exact
        path="/insuranceChangeGender"
        component={withAflacLogoComponent(InsuranceChangeGender)}
      />
      <Route exact path="/insurance" component={Insurance} />
      <Route exact path="/insuranceFormAge" component={InsuranceFormAge} />
      <Route
        exact
        path="/insuranceFormGender"
        component={InsuranceFormGender}
      />
      <Route
        exact
        path="/insuranceFormMarriage"
        component={InsuranceFormMarriage}
      />
      <Route
        exact
        path="/insuranceFormHaveChildren"
        component={InsuranceFormHaveChildren}
      />
      <Route exact path="/insuranceForm" component={InsuranceForm} />
      {/* <Route exact path="/manual" component={withAflacLogoComponent(Manual)} /> */}
      <Route exact path="/scenes" component={withAflacLogoComponent(Scenes)} />
      <Route exact path="/menu" component={withAflacLogoComponent(Menu)} />
      <Route
        exact
        path="/fitness"
        component={withAflacLogoComponent(ChooseExercise)}
      />
      <Route exact path="/flag" component={GamePlayFlags} />
      <Route
        exact
        path="/exerciseInstructions"
        component={ExerciseInstructions}
      />
      <Route exact path="/horoscope" component={Horoscope} />
      <Route exact path="/sample" component={Sample} />
      <Route path="/:orgCode/members" component={Members} />
      <Route exact path="/gamePlay" component={GamePlay} />
      <Route exact path="/gamePlaySquat" component={GamePlaySquat} />
      <Route exact path="/gamePlayFlags" component={GamePlayFlags} />
      <Route exact path="/gamePlayRunning" component={GamePlayRunning} />
      <Route exact path="/success" component={Success} />
      <Route exact path="/failure" component={Failure} />
      <Route exact path="/scanCard" component={ScanCard} />
      <Route exact path="/issuanceCard" component={IssuanceCard} />
      <Route exact path="/experienceSave" component={ExperienceSave} />
      <Route exact path="/gameProgress" component={GameProgress} />
      <Route exact path="/scanCardError" component={ScanCardError} />
      <Route exact path="/caloriesBurnt" component={CaloriesBurnt} />
      <Route path="/face" component={FaceReading} />
      <Route path="/faceCapturePhoto" component={FaceCapturePhoto} />
      <Route path="/faceResult" component={FaceResult} />
      <Route path="/faceTransferHint" component={FaceTransferHint} />
      <Route path="/faceQRCodeScan" component={FaceQRCodeScan} />
      <Route path="/faceTransferResult" component={FaceTransferResult} />
      <Route exact path="/scoreRanking" component={ScoreRanking} />
      <Route path="/skin" component={SkinAge} />
      <Route path="/skinCapturePhoto" component={SkinCapturePhoto} />
      <Route path="/skinTransferHint" component={SkinTransferHint} />
      <Route path="/skinAnalysis" component={SkinAnalysis} />
      <Route path="/skinVideo" component={SkinVideo} />
      <Route path="/skinFood" component={SkinFood} />
      <Route path="/skinBeautify" component={SkinBeautify} />
      <Route path="/skinQRCodeScan" component={SkinQRCodeScan} />
      <Route path="/skinTransferResult" component={SkinTransferResult} />
      <Route exact path="/temperature" component={Temp} />
      <Route exact path="/tempLoading" component={TempLoading} />
      <Route exact path="/tempResult" component={TempResult} />
      <Route
        exact
        path="/tempErr"
        component={withAflacLogoComponent(TempErr)}
      />
      <Route exact path="/compatibility" component={Compatibility} />
      <Route
        exact
        path="/compatibilityCapturePhoto"
        component={CompatibilityCapturePhoto}
      />
      <Route
        exact
        path="/compatibilityResult"
        component={CompatibilityResult}
      />
      <Route
        exact
        path="/compatibilityQRCodeScan"
        component={CompatibilityQRCodeScan}
      />
      <Route
        exact
        path="/omikuji"
        component={withAflacLogoComponent(Omikuji)}
      />
      <Route
        exact
        path="/omikujiQuestions"
        component={OmikujiBloodTypeQuestions}
      />
      <Route
        exact
        path="/omikujiHoroscopeQuestions"
        component={OmnikujiHoroscopeQuestions}
      />
      <Route exact path="/omikujiResult" component={OmikujiResult} />
      <Route exact path="/omikujiQRCodeScan" component={OmikujiQRCodeScan} />
      <Route exact path="/quiz" component={withAflacLogoComponent(Quiz)} />
      <Route exact path="/quizAgeChoose" component={QuizAgeChoose} />
      <Route exact path="/quizQuestions" component={QuizQuestions} />
      <Route exact path="/quizReadyNG" component={QuizReadyNG} />
      <Route exact path="/quizReadyOK" component={QuizReadyOK} />
      <Route
        exact
        path="/quizReadyExplanation"
        component={QuizReadyExplanation}
      />
      <Route exact path="/quizReadyScore" component={QuizReadyScore} />
      <Route exact path="/quizTransferHint" component={QuizTransferHint} />
      <Route exact path="/quizQRCodeScan" component={QuizQRCodeScan} />
      <Route exact path="/quizTransferResult" component={QuizTransferResult} />
    </>
  );
}
