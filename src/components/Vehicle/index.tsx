import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import { IVehicle } from '../../store/types';
import { Card, Icon, Modal, Loader, Radio, Grid, Button } from 'semantic-ui-react';
import {getVehicleByID, getVehicleDoors, setDoorsLock} from '../../store/actions';

interface IProps {
  vehicle: IVehicle;
  getVehicleByID: (id: string) => any;
  getVehicleDoors: (id: string) => any;
  setDoorsLock: (id: string, command: string) => any;
  detailedData: any;
  doors: any;
  loading: boolean;
}

class Vehicle extends Component<IProps> {
  state = {
    open: false
  }

  onClick = () => {
    this.setState({open: true})
    this.props.getVehicleByID(this.props.vehicle.id)
    this.props.getVehicleDoors(this.props.vehicle.id)
  }

  onClose = () => {
    this.setState({open: false})
  }

  render() {
    const {id, licenseplate, finorvin} = this.props.vehicle;
    const { open } = this.state;
    const detailedData = this.props.detailedData[id];
    const doors = this.props.doors[id];
    
    console.log(doors);
    return(
      <div style={{display: 'inline-block', marginRight: '1em', marginBottom:'1em'}}>
        <Card onClick={this.onClick}>
          <Card.Content header={licenseplate} />
          <Card.Content extra style={{color: 'grey'}}>
            <Icon name='drivers license' />
            {id}
          </Card.Content>
          <Card.Content extra>
            <Icon name='car' />
            {finorvin}
          </Card.Content>
        </Card>
        {detailedData ? 
        <Modal size='tiny' open={open} onClose={this.onClose}>
          <Modal.Header>{detailedData.licenseplate}</Modal.Header>
          <Modal.Content>
            <Icon name='car'/> {detailedData.salesdesignation}
          </Modal.Content>
          <Modal.Content>
            <Icon name='calendar alternate outline'/> {detailedData.modelyear}
          </Modal.Content>
          <Modal.Content>
            <Icon name='lab'/> {detailedData.fueltype}
          </Modal.Content>
          <Modal.Content>
            <Icon name='users'/> {detailedData.numberofseats + ' seats'}
          </Modal.Content>
          <Modal.Content>
            <Icon name='columns'/> {detailedData.numberofdoors + ' doors'}
          </Modal.Content>
          <Modal.Content>
            <Icon name='bolt'/> {detailedData.powerhp + ' Power HP'}
          </Modal.Content>
          <Modal.Content>
            <Icon name='bolt'/> {detailedData.powerkw + ' Power KW'}
          </Modal.Content>
          <Modal.Header>Doors</Modal.Header>
          {doors ? <Modal.Content>
            <Grid.Row style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                <Button color='green' disabled={this.props.loading} onClick={() => this.props.setDoorsLock(id, 'LOCK')}>Lock Doors  {this.props.loading && <Loader size='mini' active inline />}</Button>
                <Button color='red' disabled={this.props.loading} onClick={() => this.props.setDoorsLock(id, 'UNLOCK')}>Unlock Doors {this.props.loading && <Loader size='mini' active inline />}</Button>       
            </Grid.Row>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <div>Front Left:</div> <Radio checked={doors.doorlockstatusfrontleft.value === 'LOCKED'} toggle disabled label={doors.doorlockstatusfrontleft.value}/>
                    <div>Front Right:</div> <Radio checked={doors.doorlockstatusfrontright.value === 'LOCKED'} toggle disabled label={doors.doorlockstatusfrontright.value}/>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <div>Rear Left:</div> <Radio checked={doors.doorlockstatusrearleft.value === 'LOCKED'} toggle disabled label={doors.doorlockstatusrearleft.value}/>
                    <div>Rear Right:</div> <Radio checked={doors.doorlockstatusrearright.value === 'LOCKED'} toggle disabled label={doors.doorlockstatusrearright.value}/>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content> : 'Door data is not available.'}
        </Modal> : 
        <Modal size='tiny' open={open} onClose={this.onClose}>        
          <Loader />
        </Modal>
      }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.loading.SET_DOORS_LOCK,
  detailedData: state.vehicles.detailedData,
  doors: state.vehicles.doors
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getVehicleByID: (id: string) => dispatch(getVehicleByID(id)),
  getVehicleDoors: (id: string) =>dispatch(getVehicleDoors(id)),
  setDoorsLock: (id: string, command: string) =>dispatch(setDoorsLock(id, command))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);



      