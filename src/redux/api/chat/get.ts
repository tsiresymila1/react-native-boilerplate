import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';

const chat = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      getListConversation: build.query<any, null>({
        query: () => ({
          url: API_URL.chat.list,
          method: 'GET',
        }),
        providesTags: ['CHAT_LIST'],
        invalidatesTags: undefined,
      }),
      getDetailConversation: build.query<any, {key: string}>({
        query: ({key}) => ({
          url: `${API_URL.chat.list}/${key}/detail`,
          method: 'GET',
        }),
        providesTags: ['CHAT_DETAIL'],
        invalidatesTags: undefined,
      }),
    };
  },
});

export const {
  useGetListConversationQuery,
  useLazyGetListConversationQuery,
  useGetDetailConversationQuery,
  useLazyGetDetailConversationQuery,
} = chat;
