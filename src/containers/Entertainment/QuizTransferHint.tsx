import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TransferHint } from '../common/TransferHint';
import Back from './assets/Common/back.png';
import Next from './assets/Common/next.png';
import { DeviceService } from '../../service/DeviceService';

export default function QuizTransferHint() {
  const history = useHistory();
  const scenesType = useSelector((state) => state.scenes.type);
  const quiz = useSelector((state) => state.quiz);
  const content = {
    points: 20,
    mirrorID: DeviceService.default().deviceId(),
    contentID: 'quiz',
    coins: 20,
    content: JSON.stringify({
      ok: quiz.ok,
      ng: quiz.ng,
      questions: quiz.questions,
    }),
  };
  return (
    <>
      <TransferHint
        title={
          scenesType === 'child'
            ? 'ゲームスコアをけいたいへほぞんしますか？'
            : 'ゲーム履歴を携帯へ転送しますか？'
        }
        yesIcon={Next}
        yesTitle={scenesType === 'child' ? 'けいたいへ送る' : '携帯へ送る'}
        onYesTap={(recordId: string) => {
          history.push({
            pathname: '/quizQRCodeScan',
            state: { recordId: recordId },
          });
        }}
        noIcon={Back}
        noTitle={scenesType === 'child' ? 'さいしょにもどる' : '最初に戻る'}
        onNoTap={() => {
          scenesType === 'child'
            ? history.push('scenes')
            : history.push('menu');
        }}
        content={content}
      />
    </>
  );
}
export { QuizTransferHint };
