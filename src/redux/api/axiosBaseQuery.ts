import {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {AuthState} from '../../@types';
import {showError} from '../slice/errorSlice';
import {toggleLoader} from '../slice/loaderSlice';
import {logout} from '../slice/authSlice';

type ParamsAxios = {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  withProgress?: boolean;
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
  async (
    {url, method, data, params, headers, withProgress}: ParamsAxios,
    api: BaseQueryApi,
  ) => {
    const authState = (api.getState() as any).auth as AuthState;
    if (withProgress) api.dispatch(toggleLoader({isLoading: true, loaded: 0}));
    const tokenType = {Authorization: `${authState.token ?? ''}`};
    const currentUrl = baseUrl + url;

    const options = {
      url: currentUrl.trim(),
      method,
      data,
      params,
      headers: {
        accept: '*/*',
        ...(headers as object),
        ...(authState.token ? tokenType : {}),
      },
    };
    console.log('Sendind request >>>', options);

    try {
      const result = await axios({
        ...options,
        onDownloadProgress(progressEvent) {
          const totalLength = progressEvent.total ?? progressEvent.estimated;
          if (totalLength && withProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / totalLength,
            );
            api.dispatch(toggleLoader({isLoading: true, loaded: progress}));
          }
        },
        onUploadProgress(progressEvent) {
          const totalLength = progressEvent.total ?? progressEvent.estimated;
          if (totalLength && withProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / totalLength,
            );
            api.dispatch(toggleLoader({isLoading: true, loaded: progress}));
          }
        },
      });
      if (withProgress === true) {
        api.dispatch(toggleLoader({isLoading: true, loaded: 100}));
        setTimeout(() => {
          api.dispatch(toggleLoader({isLoading: false, loaded: 100}));
        }, 1500);
      }

      console.log("Response data >>>",JSON.stringify(result.data))

      return {
        data: {
          data: result.data,
          headers: result.headers,
          status: result.status,
        },
      };
    } catch (axiosError: any) {
      // console.error(JSON.stringify(axiosError));
      console.log("ERROR >>>",JSON.stringify(axiosError))
      if (withProgress === true) {
        api.dispatch(toggleLoader({isLoading: false, loaded: 100}));
      }

      const err = axiosError as AxiosError;
      if (err.response?.status === 401) {
        // api.dispatch(logout());
      }
      // const errorMessage = (
      //   (err.response?.data || err.message) as string
      // ).trim();
      let message =
        err?.response?.data ?? err.message ?? 'Error on fetching data ';
      if (typeof message === 'object') {
        message =
          (message as any).detail ?? ('Error on fetching data ' as string);
      }
      if(err.status === 401){
        // api.dispatch(
        //   showError({
        //     message: message as string,
        //     date: new Date(),
        //   }),
        // );
      }
      
      return {
        error: {
          status: err.response?.status,
          error: message,
        },
      };
    }
  };
