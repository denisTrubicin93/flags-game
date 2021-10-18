export enum BloodType {
  None = 0,
  A = 1,
  B = 2,
  O = 3,
  AB = 4,
}

export enum HoroscopeType {
  None = 0,
  Aries = 1,
  Taurus = 2,
  Gemini = 3,
  Cancer = 4,
  Leo = 5,
  Virgo = 6,
  Libra = 7,
  Scorpio = 8,
  Sangitarius = 9,
  Capricorn = 10,
  Aquarius = 11,
  Pisces = 12,
}

export enum SubcontentType {
  Work = 1,
  Relationships = 2,
  Money = 4,
  Love = 3,
  Health = 5,
}

export interface HoroscopeResponse {
  psychology: {
    result: [
      {
        $: {
          contentType: string;
          subContentType: number;
        };
        comment: string[];
      }
    ];
  };
}

export interface HoroscopeResult {
  title: string;
  icon: any;
  value: SubcontentType;
  data: string;
}

export interface HoroscopePartialResult {
  subContentType: SubcontentType;
  data: string;
}

export interface OmnikujiState {
  bloodType: BloodType;
  loading: boolean;
  error: string;
  recordId: string;
  horoscope: HoroscopeType;
  horoscopePartialResults: HoroscopePartialResult[];
}

export const initialState: OmnikujiState = {
  bloodType: BloodType.None,
  loading: false,
  error: '',
  recordId: '',
  horoscopePartialResults: [],
  horoscope: HoroscopeType.None,
};
