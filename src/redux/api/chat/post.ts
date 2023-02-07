import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';
import {MessageDataType} from '@/@types/chat';

const chat = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      loadConversation: build.mutation<any, {keys: string[]}>({
        query: ({keys}) => ({
          url: ` ${API_URL.chat.list}`,
          method: 'POST',
          data: {
            keys,
          },
        }),
      }),
      sendMessage: build.mutation<any, {key: string; data: MessageDataType}>({
        query: ({key, data}) => ({
          url: ` ${API_URL.chat.list}/${key}/send`,
          method: 'POST',
          data,
        }),
      }),
    };
  },
});

export const {useLoadConversationMutation, useSendMessageMutation} = chat;
