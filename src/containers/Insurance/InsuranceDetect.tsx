import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAge, setGender, setEmotion } from '../../features/Person/reducer';
import { FaceClient } from '@azure/cognitiveservices-face';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';
import { dataURItoBlob } from '../../service/Base64Utils';
import InsuranceCapturePhoto from './InsuranceCapturePhoto';

function InsuranceDetect(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetectPhoto = (photo: string) => {
    const blob = dataURItoBlob(photo);
    const faceKey = 'c5cfb579faba4338bd07c2791ec7bdc9';
    const faceEndPoint = 'https://mirror-develop.cognitiveservices.azure.com/';
    const cognitiveServiceCredentials = new CognitiveServicesCredentials(
      faceKey
    );
    const client = new FaceClient(cognitiveServiceCredentials, faceEndPoint);
    const options = {
      returnFaceAttributes: ['age', 'gender', 'emotion'],
    };
    client.face
      .detectWithStream(blob, options)
      .then((result) => {
        console.log('The result is: ');
        console.log(result);
        if (
          result[0]?.faceAttributes?.age &&
          result[0]?.faceAttributes?.gender
        ) {
          dispatch(setAge(result[0].faceAttributes.age));
          dispatch(setGender(result[0].faceAttributes.gender));
          const emotion = result[0].faceAttributes.emotion;
          const maxEmotion = Object.keys(emotion).reduce(function (
            prev,
            current
          ) {
            return emotion[prev] > emotion[current] ? prev : current;
          });
          dispatch(setEmotion(maxEmotion));
          history.push({
            pathname: '/insuranceDetectResult',
            state: { detectResult: 'suc' },
          });
        } else {
          dispatch(setAge(0));
          dispatch(setGender('unknown'));
          history.push({
            pathname: '/insuranceDetectResult',
            state: { detectResult: 'fail' },
          });
        }
      })
      .catch((err) => {
        console.log('An error occurred:');
        console.error(err);
        dispatch(setAge(0));
        dispatch(setGender('unknown'));
        history.push({
          pathname: '/insuranceDetectResult',
          state: { detectResult: 'fail' },
        });
      });
  };

  return (
    <>
      <InsuranceCapturePhoto
        onNext={(imageBase64: string) => handleDetectPhoto(imageBase64)}
      />
    </>
  );
}

export default InsuranceDetect;
