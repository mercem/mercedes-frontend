import { ThunkAction } from 'redux-thunk';
import { ActionCreator, Dispatch } from 'redux';
import {
  GET_ALL_VEHICLES_REQUEST,
  GET_ALL_VEHICLES_SUCCESS,
  GET_ALL_VEHICLES_FAIL,
  GET_VEHICLE_BY_ID_REQUEST,
  GET_VEHICLE_BY_ID_SUCCESS,
  GET_VEHICLE_BY_ID_FAIL,
  GET_VEHICLE_DOORS_FAIL,
  GET_VEHICLE_DOORS_REQUEST,
  GET_VEHICLE_DOORS_SUCCESS,
  SET_DOORS_LOCK_FAIL,
  SET_DOORS_LOCK_SUCCESS,
  SET_DOORS_LOCK_REQUEST
} from '../actionTypes';
import {
  IVehicle,
  IVehicleActionTypes,
  IVehiclesState,
  IDoors
} from '../types';
import axios from '../../config/axios-instance';
import api from '../../config/api';


const getAllVehiclesRequest = (): IVehicleActionTypes => {
  return {
    type: GET_ALL_VEHICLES_REQUEST
  }
}

const getAllVehiclesSuccess = (vehicles: IVehicle[]): IVehicleActionTypes => {
  return {
    type: GET_ALL_VEHICLES_SUCCESS,
    payload: vehicles
  }
}

const getAllVehiclesFail = (): IVehicleActionTypes =>{
  return {
    type: GET_ALL_VEHICLES_FAIL
  }
}

export const getAllVehicles: ActionCreator<ThunkAction<Promise<any>, IVehiclesState, null, IVehicleActionTypes>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getAllVehiclesRequest());
    try {
      const res = await axios.get(api.getVehicles, {headers: {code: localStorage.getItem('code')}});
      dispatch(getAllVehiclesSuccess(res.data));
      return res;
    } catch(error) {
      dispatch(getAllVehiclesFail());
      return error;
    }
  }
}

const getVehicleByIDRequest = (): IVehicleActionTypes => {
  return {
    type: GET_VEHICLE_BY_ID_REQUEST
  }
}

const getVehicleByIDSuccess = (vehicle: IVehicle, id: string): IVehicleActionTypes => {
  return {
    type: GET_VEHICLE_BY_ID_SUCCESS,
    vehicle,
    id
  }
}

const getVehicleByIDFail = (): IVehicleActionTypes =>{
  return {
    type: GET_VEHICLE_BY_ID_FAIL
  }
}

export const getVehicleByID: ActionCreator<ThunkAction<Promise<any>, IVehiclesState, null, IVehicleActionTypes>> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getVehicleByIDRequest());
    try {
      const res = await axios.get(`${api.getVehicles}/${id.toString()}`,{headers: {code: localStorage.getItem('code')}});
      dispatch(getVehicleByIDSuccess(res.data, id));
      return res;
    } catch(error) {
      dispatch(getVehicleByIDFail());
      return error;
    }
  }
}

const getVehicleDoorsRequest = (): IVehicleActionTypes => {
  return {
    type: GET_VEHICLE_DOORS_REQUEST
  }
}

const getVehicleDoorsSuccess = (doors: IDoors, id: string): IVehicleActionTypes => {
  return {
    type: GET_VEHICLE_DOORS_SUCCESS,
    doors,
    id
  }
}

const getVehicleDoorsFail = (): IVehicleActionTypes =>{
  return {
    type: GET_VEHICLE_DOORS_FAIL
  }
}

export const getVehicleDoors: ActionCreator<ThunkAction<Promise<any>, IVehiclesState, null, IVehicleActionTypes>> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getVehicleDoorsRequest());
    try {
      const res = await axios.get(`${api.getVehicles}/${id.toString()}/doors`,{headers: {code: localStorage.getItem('code')}});
      dispatch(getVehicleDoorsSuccess(res.data, id));
      return res;
    } catch(error) {
      dispatch(getVehicleDoorsFail());
      return error;
    }
  }
}


const setDoorsLockRequest = (): IVehicleActionTypes => {
  return {
    type: SET_DOORS_LOCK_REQUEST
  }
}

const setDoorsLockSuccess = (id: string, command: string): IVehicleActionTypes => {
  return {
    type: SET_DOORS_LOCK_SUCCESS,
    command,
    id
  }
}

const setDoorsLockFail = (): IVehicleActionTypes =>{
  return {
    type: SET_DOORS_LOCK_FAIL
  }
}

export const setDoorsLock: ActionCreator<ThunkAction<Promise<any>, IVehiclesState, null, IVehicleActionTypes>> = (id: string, command: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setDoorsLockRequest());
    try {
      const res = await axios.post(`${api.getVehicles}/${id.toString()}/doors`, {command}, {headers: {code: localStorage.getItem('code')}});
      dispatch(setDoorsLockSuccess(id, command));
      return res;
    } catch(error) {
      dispatch(setDoorsLockFail());
      return error;
    }
  }
}

// export const addVehicle: ActionCreator<ThunkAction<Promise<any>, IVehiclesState, null, IVehicleActionTypes>> = (vehicle: IVehicle) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(addVehicleRequest());
//     try {
//       const res = await axios.post(api.addVehicle, vehicle);
//       dispatch(addVehicleSuccess(vehicle));
//       return res;
//     } catch(error) {
//       dispatch(addVehicleFail());
//       return error;
//     }
//   }
// }

