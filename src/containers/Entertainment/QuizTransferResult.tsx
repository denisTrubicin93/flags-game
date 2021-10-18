import React from 'react';
import { useHistory } from 'react-router-dom';
import { TransferResult } from '../common/TransferResult';
import item from './assets/Common/item.svg';
import point from './assets/Common/point.png';

export default function QuizTransferResult() {
  const history = useHistory();

  return (
    <>
      <TransferResult
        itemIcon={item}
        itemTitle="クイズ"
        pointIcon={point}
        pointTitle="＋30経験値"
        onClose={() => history.push('menu')}
        onNext={() => history.push('menu')}
      />
    </>
  );
}

export { QuizTransferResult };
