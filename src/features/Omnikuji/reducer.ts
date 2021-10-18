import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BloodType,
  HoroscopePartialResult,
  HoroscopeType,
  initialState,
  OmnikujiState,
  HoroscopeResult,
} from './models';

const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setBloodType: (state, action: PayloadAction<BloodType>) => {
      state.bloodType = action.payload;
    },
    setHoroscopeType: (state, action: PayloadAction<HoroscopeType>) => {
      state.horoscope = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    submitHoroscope: (
      state,
      action: PayloadAction<{ blood: BloodType; birth: HoroscopeType }>
    ) => {
      state.loading = true;
    },
    submitHoroscopeSuccess: (
      state,
      action: PayloadAction<HoroscopePartialResult[]>
    ) => {
      state.horoscopePartialResults = action.payload;
    },
    submitHoroscopeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    submitDigitalAvatar: (state, action: PayloadAction<HoroscopeResult[]>) => {
      state.loading = true;
    },
    submitDigitalAvatarSuccess: (state, action: PayloadAction<string>) => {
      state.recordId = action.payload;
    },
    submitDigitalAvatarError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  setBloodType,
  setHoroscopeType,
  submitHoroscope,
  submitHoroscopeSuccess,
  submitHoroscopeError,
  submitDigitalAvatar,
  submitDigitalAvatarSuccess,
  submitDigitalAvatarError,
  setLoading,
} = slice.actions;

const mergeHoroscopeResult = (
  horoscopePartialResults: HoroscopePartialResult[],
  horoscopeResults: HoroscopeResult[]
): HoroscopeResult[] => {
  return horoscopeResults.map((v) => ({
    icon: v.icon,
    data: (
      horoscopePartialResults.find((pr) => pr.subContentType == v.value)
        ?.data ?? ''
    )
      .toString()
      .replaceAll('。', '。\n')
      .replaceAll('？', '？\n'),
    title: v.title,
    value: v.value,
  }));
};

export const selector = {
  getLoading: createSelector(
    (state: OmnikujiState) => state.loading,
    (loading) => loading
  ),
  getError: createSelector(
    (state: OmnikujiState) => state.error,
    (error) => error
  ),
  getBloodType: createSelector(
    (state: OmnikujiState) => state.bloodType,
    (bloodType) => bloodType
  ),
  getHoroscopeType: createSelector(
    (state: OmnikujiState) => state.horoscope,
    (horoscope) => horoscope
  ),
  getHoroscopeResults: createSelector(
    (state: OmnikujiState, horoscopeResults: HoroscopeResult[]) =>
      mergeHoroscopeResult(state.horoscopePartialResults, horoscopeResults),
    (results) => results
  ),
  getRecordId: createSelector(
    (state: OmnikujiState) => state.recordId,
    (recordId) => recordId
  ),
};
