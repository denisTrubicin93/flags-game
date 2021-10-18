import React from 'react';
import { useHistory } from 'react-router-dom';
import { CapturePhoto } from '../../common/CapturePhoto';

export default function FaceCapturePhoto() {
  const history = useHistory();

  return (
    <>
      <CapturePhoto
        onNext={(photo: string) =>
          history.push({
            pathname: '/faceResult',
            state: { photo: photo },
          })
        }
      />
    </>
  );
}

export { FaceCapturePhoto };
