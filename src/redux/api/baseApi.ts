import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { API_URL } from './url';

// @ts-ignore
// import {API_URL} from '@env';

export const baseApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL.BASE_URL,
  }),
  tagTypes: ['User', 'Chat'],
  endpoints: () => ({}),
});