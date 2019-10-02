import { Reducer } from 'redux';
import {
  LOGIN,
  LOGOUT
} from '../actionTypes';
import {
  ILoginState,
  IVehicleActionTypes
} from '../types';
import axios from '../../config/axios-instance';
import configureStore from '../configureStore';

const initialState: ILoginState = {
  code: ''
}

export const loginReducer: Reducer<ILoginState, IVehicleActionTypes> = (state = initialState, action: any): ILoginState => {
  switch(action.type){
    case LOGIN: {
      localStorage.setItem('code', action.payload)
      return {
        code: action.payload
      } 
    }
    case LOGOUT: {
      localStorage.removeItem('code');
      return {
        code: ''
      }
    }
    default:
      return state;
  }
}
