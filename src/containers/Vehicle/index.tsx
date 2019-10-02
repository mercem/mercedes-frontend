import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import {IVehicle} from '../../store/types';
import {getVehicleByID} from '../../store/actions';
import { Loader} from 'semantic-ui-react'
import Vehicle from '../../components/Vehicle';

interface IProps {
  vehicles: IVehicle[];
  isLoading: boolean;
  getVehicleByID: (id: string) => any;
  match: any;
}

class VehicleContainer extends Component<IProps> {
  state = {
    id: this.props.match.params.id
  }

  componentDidUpdate(prevProps: IProps) {
    const {id} = this.props.match.params;
    if (id !== prevProps.match.params.id) {
      this.props.getVehicleByID(id);
      this.setState({id});
    }
  }

  componentDidMount() {
    this.props.getVehicleByID(this.props.match.params.id);
  }

  render(){
    const { vehicles, isLoading } = this.props;
    const {id} = this.state
    const vehicle = vehicles[id];

    if(isLoading)
      return (<Loader inverted active inline='centered' />)
      
    if(!vehicle) return `Vehicle with ID: ${id} is not found.`

    return(
      <div>
       <Vehicle vehicle={vehicle}/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
    vehicles: state.vehicles.data,
    isLoading: state.loading.GET_VEHICLE_BY_ID
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getVehicleByID: (id: string) => dispatch(getVehicleByID(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VehicleContainer);
