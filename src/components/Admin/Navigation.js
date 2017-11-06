import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import IconExpandMore from '../svg/IconExpandMore';
import IconExpandLess from '../svg/IconExpandLess';

import Nav from './styled/Nav';

import routes from '../../routes';

class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.links = routes.filter(route => route.slice(0, 6) === '/admin' && route.slice(route.length - 4, route.length) != '/:id');

    this.resetState = {
      isNavigationHidden: true
    };

    this.state = Object.assign({}, this.resetState);

    this.toggleCollapsedNavigation = this.toggleCollapsedNavigation.bind(this);
    this.account = this.account.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    /*this.props.api.on('reauthentication-error', error => {
      if(!this.props.user)
        return;
      this.props.api.authenticate({
        strategy: 'local',
        email: this.props.user.email,
        password: this.props.user.password
      })
      .then(response => {
        // You are now authenticated again
      })
    });
    this.props.api.user().then(user => this.props.setUser(user));*/
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname != nextProps.location.pathname)
      this.setState(this.resetState);
  }

  componentWillUnmount() {
    //this.props.api.removeListener('reauthentication-error');
  }

  toggleCollapsedNavigation(){
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.isNavigationHidden = !prevState.isNavigationHidden;
      return nextState;
    });
  }

  account() {
    if(this.props.user != {})
      this.props.history.push('/account');
    else
      this.props.history.push('/login');
  }

  logout() {
    this.props.api.logout();
    this.props.setUser({});
  }

  render() {
    const iconCollapsing = this.state.isNavigationHidden
      ? <IconExpandMore color='inherit' />
      : <IconExpandLess color='inherit' />;

    const menuUser = (
      <div className='menu-item menu-right'>
        Account
        <div className='menu-dropdown dropdown-right'>
          <div className='menu-item'
            onClick={this.account}
          >
            {this.props.user.name || 'Profile'}
          </div>
          <div className='menu-item'
            onClick={this.logout}
          >
            Sign Out
          </div>
        </div>
      </div>
    );

    const menuLogin = (
      <div className='menu-item menu-right'>
        <Link to='/login'>Sign In</Link>
      </div>
    );

    return (
      <Nav>
        <img src='../../logo.svg'/>
        <div className='menu-item menu-collapsing menu-right' onClick={this.toggleCollapsedNavigation}>
          {iconCollapsing}
        </div>
        {!this.state.isNavigationHidden ? null :
          (<div className='menu-item menu-collapsing' onClick={this.toggleCollapsedNavigation}>
            {(this.props.location.pathname.charAt(7).toUpperCase() + this.props.location.pathname.slice(8)) || 'Dashboard'}
          </div>)
        }
        {this.links.map((link, index) => {
          let dashboard = link === '/admin';
          let name = dashboard ? 'dashboard' : link.slice(7);
          return (
            <div className={'menu-item' + (this.state.isNavigationHidden ? '' : ' menu-display')} key={index}>
              <NavLink to={link}
                exact={dashboard}
                activeClassName='nav-active'
              >
                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
              </NavLink>
            </div>
          );
        })}
        {this.props.user._id ? menuUser : menuLogin}
      </Nav>
    );
  }
}

Navigation.defaultProps = {
  user: {}
};

/* location and history props added by Route
 */
Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
};

export default Navigation;
