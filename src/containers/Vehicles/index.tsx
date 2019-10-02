import React, {Component, SyntheticEvent} from 'react'; 
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import {IVehicle} from '../../store/types';
import {getAllVehicles} from '../../store/actions';
import Vehicle from '../../components/Vehicle';
import { Loader} from 'semantic-ui-react';

interface IProps {
  vehicles: IVehicle[];
  getAllVehicles: () => any;
  isLoading: boolean;
  code: string;
  history: any;
}

class VehiclesContainer extends Component<IProps> {
  state={
    open: false,
  }

  componentDidMount() {
    this.props.getAllVehicles();
  }


  onInputChange = (event: SyntheticEvent, data: any) => {
    this.setState({
      [data.id]: data.value
    })
  }

  render(){
    const { vehicles, isLoading } = this.props;

    if(isLoading) return (<Loader inverted active inline='centered' />)
    if(vehicles.every(vehicle => !vehicle)) return `You have no vehicle`
    return(
      <div>
        {vehicles.map((vehicle, id) => {
            if(vehicle) return <Vehicle key={id} vehicle={vehicle}/>
            return null;
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
    vehicles: state.vehicles.data,
    code: state.login.code,
    isLoading: state.loading.GET_ALL_VEHICLES
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getAllVehicles: () => dispatch(getAllVehicles()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesContainer);
