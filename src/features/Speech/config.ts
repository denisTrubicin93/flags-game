/* eslint-disable import/prefer-default-export */
import { Options, NormalizedOptions } from 'ky';

export const DEFAULT_API_OPTIONS: Options = {
  prefixUrl: process.env.API_BASE_URL,
  timeout: 7000,
  retry: 2,
};
