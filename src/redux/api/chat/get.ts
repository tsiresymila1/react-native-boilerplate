import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';

const chat = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      getListConversation: build.query<any, null>({
        query: () => ({
          url: `${API_URL.user.list}/chats`,
          method: 'GET',
          withProgress: true,
        }),
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.data.map((conv: any) => ({
                  type: 'Chat' as const,
                  id: conv.id,
                })),
                'Chat',
              ]
            : ['Chat'],
      }),
      getDetailConversation: build.query<any, {key: string}>({
        query: ({key}) => ({
          url: `${API_URL.chat.list}/${key}`,
          method: 'GET',
          withProgress: false,
        }),
        providesTags: (result, error, arg) => [{type: 'Chat', id: arg.key}],
        invalidatesTags: undefined,
      }),

      getMessageConversation: build.query<
        any,
        {key: string; query: Record<string, any>}
      >({
        query: ({key, query}) => ({
          url: `${API_URL.chat.list}/${key}/message`,
          method: 'GET',
          withProgress: false,
          params: query,
        }),
        providesTags: (result, error, arg) => [{type: 'Chat', id: arg.key}],
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
  useGetMessageConversationQuery,
} = chat;
