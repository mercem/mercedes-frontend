import { applyMiddleware, combineReducers, createStore, Store, compose } from 'redux';
import thunk from 'redux-thunk';
import { vehiclesReducer } from './reducers/vehicles';
import { loadingReducer } from './reducers/loading';
import { loginReducer } from './reducers/login';
import {IVehiclesState, ILoginState} from './types';

export interface IAppState {
  vehicles: IVehiclesState,
  login: ILoginState,
  loading: any
}

const rootReducer = combineReducers<IAppState>({
  vehicles: vehiclesReducer,
  login: loginReducer,
  loading: loadingReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): Store<IAppState, any> => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

