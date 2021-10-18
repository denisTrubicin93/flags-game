import React from 'react';
import { useHistory } from 'react-router-dom';
import { TransferResult } from '../../common/TransferResult';
import squat from './assets/Transfer_Result/squat.svg';
import coin from './assets/Transfer_Result/coin.png';

export default function SkinTransferResult() {
  const history = useHistory();

  return (
    <>
      <TransferResult
        itemIcon={squat}
        itemTitle="肌年齢：22"
        pointIcon={coin}
        pointTitle="＋20コイン"
        onClose={() => history.push('menu')}
        onNext={() => history.push('menu')}
      />
    </>
  );
};

export { SkinTransferResult };
