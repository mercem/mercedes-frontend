export interface IVehicle {
  id: string,
  licenseplate: string,
  finorvin: string
}

export interface IVehiclesState {
  data: (IVehicle | null)[],
  detailedData: any,
  doors: any
}

export interface ILoginState {
  code: string
}

interface IDefaultAction {
  type: string
}

interface IGetAllVehicleAction {
  type: string,
  payload: IVehicle[] | string
}

interface IGetVehicleByIDAction {
  type: string,
  vehicle: IVehicle,
  id: string
}

interface IDoorStatus {
  value: string,
  retrievalstatus: string,
  timestamp: number
}

export interface IDoors {
  doorstatusfrontleft: IDoorStatus,
  doorlockstatusfrontleft: IDoorStatus,
  doorstatusfrontright: IDoorStatus,
  doorlockstatusfrontright: IDoorStatus,
  doorstatusrearleft: IDoorStatus,
  doorlockstatusrearleft: IDoorStatus,
  doorstatusrearright: IDoorStatus,
  doorlockstatusrearright: IDoorStatus,
  doorlockstatusdecklid: IDoorStatus,
  doorlockstatusgas: IDoorStatus,
  doorlockstatusvehicle: IDoorStatus
}

export interface IGetVehicleDoorsAction {
  type: string,
  id: string,
  doors: IDoors
}

export interface IDoorsLockAction {
  type: string,
  id: string,
  command: string
}


export type IVehicleActionTypes = IGetAllVehicleAction | IGetVehicleByIDAction | IGetVehicleDoorsAction | IDoorsLockAction | IDefaultAction ;
