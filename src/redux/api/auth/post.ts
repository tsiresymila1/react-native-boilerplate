import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {LoginDataType} from '../../../@types/auth';
import {baseApi} from '../baseApi';
import {ContentType, setDataFormat} from '../service';
import {API_URL} from '../url';

const login = baseApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => {
    return {
      login: build.mutation<any, LoginDataType>({
        query: credentials => ({
          url: API_URL.login,
          method: 'POST',
          data: setDataFormat(credentials, ContentType.FORM_DATA),
        }),
      }),
    };
  },
});

export const {useLoginMutation} = login;
