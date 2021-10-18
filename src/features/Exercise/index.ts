import { KabeanaPose } from './models';

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const randomSlice = (array:any[], num: number) => {
  const shuffled = shuffle(array);
  const length = array.length > num ? num : array.length;
  return shuffled.slice(0, length);
}

export const getCandidates = (num: number = 20): number[] => {
  const slice = randomSlice(
    [
      KabeanaPose.POSE0001,
      KabeanaPose.POSE0002,
      KabeanaPose.POSE0003,
      KabeanaPose.POSE0004,
      KabeanaPose.POSE0005,
      KabeanaPose.POSE0006,
      KabeanaPose.POSE0007,
      KabeanaPose.POSE0008,
      KabeanaPose.POSE0009,
      KabeanaPose.POSE0010,
      KabeanaPose.POSE0011,
      KabeanaPose.POSE0012,
      KabeanaPose.POSE0013,
      KabeanaPose.POSE0014,
      KabeanaPose.POSE0015,
      KabeanaPose.POSE0016,
      KabeanaPose.POSE0017,
      KabeanaPose.POSE0018,
      KabeanaPose.POSE0019,
      KabeanaPose.POSE0020,
    ],
    num
  );
  return slice;
}
