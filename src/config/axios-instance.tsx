import axios from 'axios';
import {baseURL} from './environment';

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const instance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default instance;