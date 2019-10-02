import {
  LOGIN,
  LOGOUT
} from '../actionTypes';
import {
  IVehicleActionTypes,
} from '../types';

export const login = (code: string): IVehicleActionTypes => {
  return {
    type: LOGIN,
    payload: code
  }
}

export const logout = (): IVehicleActionTypes => {
  return {
    type: LOGOUT
  }
}