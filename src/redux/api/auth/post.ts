import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {LoginDataType, RegisterDataType} from '../../../@types/auth';
import {baseApi} from '../baseApi';
import {ContentType, setDataFormat} from '../service';
import {API_URL} from '../url';

const auth = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      login: build.mutation<any, LoginDataType>({
        query: credentials => ({
          url: API_URL.auth.login,
          method: 'POST',
          data: setDataFormat(credentials, ContentType.JSON),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        invalidatesTags: (result, error, data) => ['User', 'Chat'],
      }),
      register: build.mutation<any, RegisterDataType>({
        query: credentials => ({
          url: API_URL.auth.register,
          method: 'POST',
          data: setDataFormat(credentials, ContentType.FORM_DATA),
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        invalidatesTags: (result, error, data) => ['User', 'Chat'],
      }),
    };
  },
});

export const {useLoginMutation, useRegisterMutation} = auth;
