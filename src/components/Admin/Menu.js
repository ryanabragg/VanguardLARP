import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Navigation from '../styled/Navigation';
import IconCharacter from '../svg/Character';

class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isMenuHidden: true
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({
      isMenuHidden: !this.state.isMenuHidden
    });
  }

  render() {
    return (
      <Navigation isMenuHidden={this.state.isMenuHidden} onClick={this.toggleMenu}>
        <Link to='/'><img src='../logo.svg'/></Link>
        <NavLink exact to='/admin' activeClassName='nav-active'>Dashboard</NavLink>
        <NavLink to='/admin/events' activeClassName='nav-active'>Events</NavLink>
        <NavLink to='/admin/rules' activeClassName='nav-active'>Rules</NavLink>
        <NavLink to='/admin/characters' activeClassName='nav-active'>Characters</NavLink>
        <a className='nav-icon' href='javascript:void(0);'>&#9776;</a>
      </Navigation>
    );
  }
}

export default Menu;
