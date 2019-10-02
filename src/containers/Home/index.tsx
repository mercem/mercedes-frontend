import React, {Component} from 'react';
import { Button, Header } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { ThunkDispatch} from 'redux-thunk'
import {login, logout} from '../../store/actions';
import './style.css';

interface IProps {
  location: any;
  history: any;
  login: (code: string) => any;
  logout: () => any;
  code: string;
}

class Home extends Component<IProps> {
  
  login = () => {
    window.location.assign('https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=57778c5b-2b57-45c5-9260-c830058e5d53&redirect_uri=http://localhost:3001&scope=mb:user:pool:reader mb:vehicle:status:general')
  }

  logout = () => {
    this.props.logout();
  }

  componentDidMount() {
    let code = this.props.location.search.split('?code=')[1];
    if(code) {
      this.props.login(code);
      this.props.history.push('/')
    } 
  }

  render() {
    if(this.props.code) return(
      <div className='Home'>
        <div style={{display: 'flex', justifyContent:'center'}}>
          <Header style={{textAlign:'center', color:'white', marginTop:'50px', marginBottom: '30px', maxWidth: '800px'}}>
            You can now access to important telematics data, status info and vehicle functions from virtual Mercedes–Benz cars. 
          </Header>  
        </div>
        <div style={{display: 'flex', justifyContent:'center'}}>
            <Button size='large' color='red' style={{minWidth: '150px'}} onClick={this.logout}>Logout</Button>
        </div>
      </div>
    )
    return(
      <div className='Home'>
        <div style={{display: 'flex', justifyContent:'center'}}>
          <Header style={{textAlign:'center', color:'white', marginTop:'50px', marginBottom: '30px', maxWidth: '800px'}}>
            You need to connect with your Mercedes-Benz ID and give your consent to allow the application to retrieve and use personal vehicle data.
          </Header>  
        </div>
        <div style={{display: 'flex', justifyContent:'center'}}>
            <Button size='large' color='blue' style={{minWidth: '150px'}} onClick={this.login}>Connect</Button>
        </div>
    </div>
    )
  }
  
};

const mapStateToProps = (state: any) => ({
    code: state.login.code
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  login: (code: string) => dispatch(login(code)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);