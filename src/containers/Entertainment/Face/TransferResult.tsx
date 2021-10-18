import React from 'react';
import { useHistory } from 'react-router-dom';
import { TransferResult } from '../../common/TransferResult';
import item from './assets/Transfer_Result/item.svg';
import coin from './assets/Transfer_Result/coin.png';

export default function FaceTransferResult() {
  const history = useHistory();

  return (
    <>
      <TransferResult
        itemIcon={item}
        itemTitle="顔占い"
        pointIcon={coin}
        pointTitle="＋10コイン"
        onClose={() => history.push('scoreRanking')}
        onNext={() => history.push('scoreRanking')}
      />
    </>
  );
};

export { FaceTransferResult };
