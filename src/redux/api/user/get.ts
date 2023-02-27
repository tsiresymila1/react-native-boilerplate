import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';

const user = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      getList: build.query<any, null>({
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.data.map((user: any) => ({
                  type: 'User' as const,
                  id: user.id,
                })),
                'User',
              ]
            : ['User'],
        query: () => ({
          url: API_URL.user.list,
          method: 'GET',
          withProgress: false,
        }),
      }),
      getListConnected: build.query<any, null>({
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.data.map((user: any) => ({
                  type: 'User' as const,
                  id: user.id,
                })),
                'User',
              ]
            : ['User'],
        query: () => ({
          url: `${API_URL.user.list}/connected`,
          method: 'GET',
          withProgress: false,
        }),
      }),
      seachUser: build.query<any, {query: string}>({
        query: ({query}) => ({
          url: `${API_URL.user.list}/search`,
          method: 'GET',
          withProgress: false,
          params: {
            query,
          },
        }),
      }),
      getMe: build.query<any, {withProgress?: boolean} | null>({
        providesTags: (result, error, arg) =>
          result ? [{type: 'User', id: result.data.id}] : ['User'],
        query: props => ({
          url: API_URL.user.me,
          method: 'GET',
          withProgress: props?.withProgress,
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
  useGetListConnectedQuery,
  useLazyGetListConnectedQuery,
  useSeachUserQuery
} = user;
