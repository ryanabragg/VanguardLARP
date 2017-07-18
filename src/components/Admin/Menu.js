import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Navigation from '../styled/Navigation';

import routes from '../../routes';

class Menu extends React.Component {
  constructor (props) {
    super(props);

    this.linkTo = routes.filter(route => route.slice(0, 6) === '/admin' && route.slice(route.length - 4, route.length) != '/:id');

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
      <Navigation isMenuHidden={this.state.isMenuHidden}>
        <span className='menu-logo'><img src='../logo.svg'/></span>
        {this.linkTo.map((link, index) => {
          let dashboard = link === '/admin';
          let name = dashboard ? 'dashboard' : link.slice(7, link.length);
          name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
          return (
            <NavLink
              key={index}
              exact={dashboard}
              to={link}
              activeClassName='nav-active'
            >
              {name}
            </NavLink>
          );
        })}
        <span className='menu-toggle' onClick={this.toggleMenu}>&#9776;</span>
      </Navigation>
    );
  }
}

export default Menu;
