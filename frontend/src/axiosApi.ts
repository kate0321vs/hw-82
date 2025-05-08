import axios, { AxiosHeaders } from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './app/store.ts';
import {baseURL} from "./globalConstants.ts";

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set ("Authorization", token);

    return config;
  });
};

const axiosApi = axios.create({
  baseURL: baseURL,
});

export default axiosApi;