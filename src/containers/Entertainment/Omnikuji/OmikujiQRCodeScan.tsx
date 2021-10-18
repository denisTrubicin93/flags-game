import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../features';
import { selector } from '../../../features/Omnikuji/reducer';
import { QRCodeScan } from '../../common/QRCodeScan';

export default function OmikujiQRCodeScan() {
  const history = useHistory();
  const recordId = useSelector((rootState: RootState) =>
    selector.getRecordId(rootState.omnikuj)
  );
  return (
    <>
      <QRCodeScan
        qrcodeParams={recordId && `recordId=${recordId}`}
        onClose={() => history.push('menu')}
        background="linear-gradient(90deg, #ffcd6f 0%, #FFC14B 100%);"
      />
    </>
  );
}

export { OmikujiQRCodeScan };
