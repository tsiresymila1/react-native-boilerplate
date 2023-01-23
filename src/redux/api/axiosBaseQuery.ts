import {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {AuthState} from '../../@types';
import {showError} from '../slice/errorSlice';
import {toggleLoader} from '../slice/loaderSlice';

type ParamsAxios = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  token?: string | undefined;
};

type ResultType<D = any> = {
  data?: D;
  error?: {
    status?: number;
    data: string;
  };
};
export const axiosBaseQuery =
  ({baseUrl} = {baseUrl: ''}): BaseQueryFn<ParamsAxios, ResultType, any> =>
  async ({url, method, data, params}: ParamsAxios, api: BaseQueryApi) => {
    const authState = (api.getState() as any).auth as AuthState;
    api.dispatch(toggleLoader(true));
    const tokenType = {Authorization: `Bearer ${authState.token ?? ''}`};
    const currentUrl = baseUrl + url;
    let contentType = {};
    try {
      const result = await axios({
        url: currentUrl,
        method,
        data,
        params,
        headers: {
          Accept: 'application/json',
          ...contentType,
          ...tokenType,
        },
      });
      api.dispatch(toggleLoader(false));
      return {data: result.data};
    } catch (axiosError: any) {
      const err = axiosError as AxiosError;
      const errorMessage = (
        (err.response?.data || err.message) as string
      ).trim();
      console.info(errorMessage)
      api.dispatch(toggleLoader(false));
      setTimeout(() => {
        api.dispatch(
          showError({
            message: errorMessage,
            date: new Date(),
          }),
        );
      }, 100);
      return {
        error: {
          status: err.response?.status,
          data: errorMessage,
        },
      };
    }
  };
