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

type ResultType<D = any, H = any> = {
  data?: D;
  headers?: H;
  status: number;
  error?: {
    status?: number;
    data: string;
  };
};
export const axiosBaseQuery =
  ({baseUrl} = {baseUrl: ''}): BaseQueryFn<ParamsAxios, ResultType, any> =>
  async ({url, method, data, params}: ParamsAxios, api: BaseQueryApi) => {
    console.log("API STATE",  (api.getState() as any).auth)
    const authState = (api.getState() as any).auth as AuthState;
    api.dispatch(toggleLoader(true));
    const tokenType = {Authorization: `${authState.token ?? ''}`};
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
      console.log("Getting result : ", result.data)
      return {
        data: {
          data: result.data,
          headers: result.headers,
          status: result.status,
        },
      };
    } catch (axiosError: any) {
      api.dispatch(toggleLoader(false));
      console.log("Getting error : ", JSON.stringify(axiosError))
      const err = axiosError as AxiosError;
      const errorMessage = (
        (err.response?.data || err.message) as string
      ).trim();
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
