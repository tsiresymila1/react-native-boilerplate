import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

// @ts-ignore
import {API_URL} from '@env';

export const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: () => ({}),
});