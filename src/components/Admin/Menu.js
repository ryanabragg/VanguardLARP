import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navigation from './styled/Navigation';

import routes from '../../routes';

class Menu extends React.Component {
  constructor (props) {
    super(props);

    this.links = routes.filter(route => route.slice(0, 6) === '/admin' && route.slice(route.length - 4, route.length) != '/:id');

    this.state = {
      user: {},
      isMenuHidden: true
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.api.user().then(user => this.setState({user: user}));
  }

  toggleMenu(){
    this.setState({
      isMenuHidden: !this.state.isMenuHidden
    });
  }

  login(name, pass) {
    this.props.api.login(name, pass).then(user => this.setState({user: user}));
  }

  logout() {
    this.props.api.logout();
    this.setState({user: {}});
  }

  render() {
    return (
      <Navigation>
        <div className='menu-toggle' onClick={this.toggleMenu}></div>
        <div className='menu-logo'><img src='../logo.svg'/></div>
        {this.state.isMenuHidden
        ? (<div className='menu-current'>
            {(this.props.location.pathname.charAt(7).toUpperCase() + this.props.location.pathname.slice(8)) || 'Dashboard'}
          </div>)
        : null}
        {this.links.map((link, index) => {
          let dashboard = link === '/admin';
          let name = dashboard ? 'dashboard' : link.slice(7);
          return (
            <div className={'menu-item' + (this.state.isMenuHidden ? '' : ' show')} key={index}>
              <NavLink
                exact={dashboard}
                to={link}
                activeClassName='nav-active'
              >
                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
              </NavLink>
            </div>
          );
        })}
        <div className='menu-user'>
          {this.state.user
          ? <div onClick={this.login}>Login</div>
          : <div onClick={this.logout}>Logout</div>
          }
        </div>
      </Navigation>
    );
  }
}

Menu.propTypes = {
  api: PropTypes.object.isRequired
}

export default Menu;
