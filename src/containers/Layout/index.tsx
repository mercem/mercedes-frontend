import React, { Component } from 'react';
import Menu from '../Menu';
import './style.css';

interface IProps {
  children: any
}

class Layout extends Component<IProps> {
  render() {
    return (
      <div className='Layout'>
        <Menu className='Menu'/>
        <div className='Content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;