import React from 'react';
import { useHistory } from 'react-router-dom';
import { QRCodeScan } from '../common/QRCodeScan';
import ChildBg from './assets/Child_Quiz/main_bg.png';

export default function QuizQRCodeScan(props: any) {
  const history = useHistory();
  const recordId = props.location?.state?.recordId;
  return (
    <>
      <QRCodeScan
        qrcodeParams={recordId && `recordId=${recordId}`}
        onClose={() => history.push('menu')}
        background={`url(${ChildBg}) center no-repeat`}
      />
    </>
  );
}

export { QuizQRCodeScan };
