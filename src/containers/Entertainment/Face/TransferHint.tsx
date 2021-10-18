import React from 'react';
import { useHistory } from 'react-router-dom';
import { TransferHint } from '../../common/TransferHint';
import Yes from './assets/Transfer_Hint/yes.png';
import No from './assets/Transfer_Hint/no.png';

export default function FaceTransferHint() {
  const history = useHistory();

  return (
    <>
      <TransferHint
        title="占い結果を携帯へ転送しますか？"
        yesIcon={Yes}
        yesTitle="はい"
        onYesTap={() => history.push('faceQRCodeScan')}
        noIcon={No}
        noTitle="いいえ"
        onNoTap={() => history.push('menu')}
      />
    </>
  );
}
export { FaceTransferHint };
