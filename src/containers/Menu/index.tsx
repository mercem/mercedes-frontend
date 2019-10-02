import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter} from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import {connect} from 'react-redux';

interface ChildComponentProps extends RouteComponentProps<any> {
  className: string;
  code: string;
}

class TopMenu extends Component<ChildComponentProps> {
  state = {
    loading: false,
    vehicleID: ''
  }

  redirectHandler = (redirectTo: string) => {
    this.props.history.push(redirectTo)
  }

  handleFormSubmit = () => {
    if(this.state.vehicleID) {
      this.redirectHandler('/vehicles/'+ this.state.vehicleID);
      this.setState({vehicleID: ''})
    } 
  }

  handleInputChange = (e: any) => {
    this.setState({
      vehicleID: e.target.value
    })
  }

  handleItemClick = (e: any, { name }: any) => {
    switch(name){
      case 'home':
        this.redirectHandler('/');
        break;
      case 'vehicles':
        this.redirectHandler('/vehicles')
        break;
      default:
    }
  }

  render() {
    const activeItem = this.props.history.location.pathname;

    return (
      <Menu inverted pointing vertical stackable>
        <Menu.Item 
          name='home'
          active={activeItem === '/'}
          onClick={this.handleItemClick}/>
        {this.props.code && <Menu.Item
          name='vehicles'
          active={activeItem === '/vehicles'}
          onClick={this.handleItemClick}
        />}
      </Menu>
    )
  }
}

const mapStateToProps = (state: any) => ({
  code: state.login.code
})

export default connect(mapStateToProps, )(withRouter(TopMenu));