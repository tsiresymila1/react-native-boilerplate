import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {baseApi} from '../baseApi';
import {API_URL} from '../url';
import {MessageDataType} from '@/@types/chat';
import {ContentType, setDataFormat} from '../service';

const chat = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      loadConversation: build.mutation<any, {keys: (string | number)[]}>({
        query: ({keys}) => ({
          url: `${API_URL.chat.list}`,
          method: 'POST',
          data: {
            ids: keys
          },
          withProgress: true,
        }),
        invalidatesTags: ['Chat'],
      }),
      sendMessage: build.mutation<any, MessageDataType>({
        query: data => ({
          url: `${API_URL.chat.list}/message/send`,
          method: 'POST',
          data: setDataFormat(data, ContentType.FORM_DATA),
          headers: {
            'Content-Type': ContentType.FORM_DATA,
          },
        }),
        invalidatesTags: (result, error, arg) =>  [{type: 'Chat', id: arg.conversationId}],
      }),
    };
  },
});

export const {useLoadConversationMutation, useSendMessageMutation} = chat;
