import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TransferHint } from '../common/TransferHint';
import back from '../Entertainment/assets/Common/back.png';
import next from '../Entertainment/assets/Common/next.png';
import { DeviceService } from '../../service/DeviceService';
import { useModeExercise } from './useModeExercise';

export default function ExperienceSave() {
  const history = useHistory();
  const exercise = useSelector((state) => state.exercise);
  const { config, scenesType } = useModeExercise();
  const content = {
    points: 20,
    mirrorID: DeviceService.default().devicфeId(),
    contentID: 'exercise',
    coins: 20,
    content: JSON.stringify({
      fitnessItem: exercise.mode,
      challengeResult: exercise.data.result,
      counts: exercise.data.counts,
      total: config.target.value,
    }),
  };
  return (
    <>
      {scenesType === 'child' &&
        <TransferHint
          title="ゲーム履歴を携帯へ転送しますか？"
          titleList={["ゲームスコアをけいたいへ", "ほぞんしますか？"]}
          yesIcon={next}
          yesTitle='けいたいへ送る'
          onYesTap={(recordId: string) => {
            history.push({
              pathname: '/scanCard',
              state: { recordId: recordId },
            });
          }}
          noIcon={back}
          noTitle='さいしょにもどる'
          onNoTap={() => {
            history.push('scenes');
          }}
          content={content}
        />
      }
      {scenesType !== 'child' &&
        <TransferHint
          title="ゲーム履歴を携帯へ転送しますか？"
          yesIcon={next}
          yesTitle="携帯へ送る"
          onYesTap={(recordId: string) => {
            history.push({
              pathname: '/scanCard',
              state: { recordId: recordId },
            });
          }}
          noIcon={back}
          noTitle="最初に戻る"
          onNoTap={() => {
            history.push('scenes');
          }}
          content={content}
        />
      }
    </>
  );
}
export { ExperienceSave };
