import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';

const user = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      getList: build.query<any, null>({
        providesTags: ["USER_LIST"],
        query: () => ({
          url: API_URL.user.list,
          method: 'GET',
        }),
      }),
      getMe: build.query<any, null>({
        providesTags: ["USER_CURRENT"],
        query: () => ({
          url: API_URL.user.me,
          method: 'GET',
        }),
      }),
    };
  },
});

export const {
  useLazyGetListQuery,
  useGetListQuery,
  useLazyGetMeQuery,
  useGetMeQuery,
} = user;
