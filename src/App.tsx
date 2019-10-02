import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Vehicles from './containers/Vehicles';
import Vehicle from './containers/Vehicle';
import Layout from './containers/Layout';
import Home from './containers/Home';
import {connect} from 'react-redux';
import {login} from './store/actions'
import { ThunkDispatch} from 'redux-thunk'

interface IProps {
  login: (code: string) => any;
}

class App extends Component<IProps>{

  componentDidMount() {
    let storedCode = localStorage.getItem('code') || ''
    this.props.login(storedCode);
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route path="/vehicles" exact render={(routeProps) => 
              <Layout>
                <Vehicles {...routeProps}/>
              </Layout>
            }/> 
            <Route render={(routeProps) => 
              <Layout>
                <Home {...routeProps}/>
              </Layout>
            }/>  
          </Switch>
        </Router>    
      </div> 
    );
  }
}

const mapStateToProps = (state: any) => ({
  code: state.login.code
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  login: (code: string) => dispatch(login(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
