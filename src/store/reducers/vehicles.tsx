import { Reducer } from 'redux';
import {
  GET_ALL_VEHICLES_SUCCESS,
  GET_VEHICLE_BY_ID_SUCCESS,
  GET_VEHICLE_DOORS_SUCCESS,
  LOGOUT,
  SET_DOORS_LOCK_SUCCESS
} from '../actionTypes';
import {
  IVehiclesState,
  IVehicleActionTypes
} from '../types';

const initialState: IVehiclesState = {
  data: [],
  detailedData: {},
  doors: {}
}

export const vehiclesReducer: Reducer<IVehiclesState, IVehicleActionTypes> = (state = initialState, action: any): any => {
  switch(action.type){
    case GET_ALL_VEHICLES_SUCCESS: {
      return {
        ...state,
        data: [...action.payload]
      } 
    }
    case GET_VEHICLE_BY_ID_SUCCESS: {
      let detailedData = {...state.detailedData};
      detailedData[action.id] = action.vehicle;
      return {
        ...state,
        detailedData
      }
    }
    case GET_VEHICLE_DOORS_SUCCESS: {
      let doors = {...state.doors};
      doors[action.id] = action.doors;
      return {
        ...state,
        doors
      }
    }
    case SET_DOORS_LOCK_SUCCESS: {
      let doors = {...state.doors};
      doors[action.id].doorlockstatusfrontleft.value = action.command+'ED';
      doors[action.id].doorlockstatusfrontright.value = action.command+'ED';
      doors[action.id].doorlockstatusrearleft.value = action.command+'ED';
      doors[action.id].doorlockstatusrearright.value = action.command+'ED';
      return {
        ...state,
        doors
      }
    }
    case LOGOUT: {
      return {
        data: [],
        detailedData: {}
      }
    }
    default:
      return state;
  }
}
