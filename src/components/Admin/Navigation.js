import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import IconHome from '../svg/icon/Home';
import IconEvent from '../svg/icon/Event';
import IconRule from '../svg/icon/Extension';
import IconCharacter from '../svg/icon/Persons';

import IconAccount from '../svg/icon/Gear';
import IconProfile from '../svg/icon/PersonBox';
import IconLogin from '../svg/icon/Arrive';
import IconLogout from '../svg/icon/Leave';

class Navigation extends React.Component {
  constructor (props) {
    super(props);

    this.events = ['scroll', 'resize', 'touchmove'];

    this.state = {
      delta: 5,
      show: true
    };

    this.threshold = -55;
    this.scrollPrev = 0;
    this.scrollNext = 0;

    this.account = this.account.bind(this);
    this.logout = this.logout.bind(this);

    this.handlePosition = this.handlePosition.bind(this);
    this.updateNav = this.updateNav.bind(this);
  }

  componentDidMount() {
    this.scrollPrev = this.nav.getBoundingClientRect().top;
    if(this.props.hideOnScroll)
      this.events.forEach((e) => {
        window.addEventListener(e, this.handlePosition, true);
      });
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if(!prevProps.hideOnScroll && nextProps.hideOnScroll)
      this.events.forEach((e) => {
        window.addEventListener(e, this.handlePosition, true);
      });
    else if(prevProps.hideOnScroll && !nextProps.hideOnScroll)
      this.events.forEach((e) => {
        window.removeEventListener(e, this.handlePosition, false);
      });
  }

  componentWillUnmount() {
    if(this.timeout)
      clearTimeout(this.timeout);
    this.timeout = undefined;
    if(this.props.hideOnScroll)
      this.events.forEach((e) => {
        window.removeEventListener(e, this.handlePosition, false);
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

  handlePosition(e) {
    this.scrollNext = this.nav.getBoundingClientRect().top;
    if(Math.abs(this.scrollNext - this.scrollPrev) > this.state.delta) {
      if(this.timeout)
        clearTimeout(this.timeout);
      this.timeout = setTimeout(this.updateNav, 250);
    }
  }

  updateNav() {
    if(this.timeout)
      clearTimeout(this.timeout);
    if(!this.state.show && this.scrollNext > this.threshold)
      this.setState({show: true});
    else if(!this.state.show && this.scrollNext > this.scrollPrev)
      this.setState({show: true});
    else if(this.state.show && this.scrollNext < this.scrollPrev)
      this.setState({show: false});
    this.scrollPrev = this.scrollNext;
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.staticContext;
    delete rest.match;
    delete rest.location;
    delete rest.history;
    delete rest.api;
    delete rest.user;
    delete rest.setUser;
    delete rest.hideOnScroll;

    let account = null;
    if(this.props.user._id)
      account = (
        <div className='has-dropdown'>
          <IconAccount title='View Account Settings' />
          <div className='dropdown'>
            <NavLink to={'/account'}>
              <IconProfile title='View Account Settings' />
            </NavLink>
            <a role='button' onClick={this.logout}>
              <IconLogout title='Sign Out' />
            </a>
          </div>
        </div>
      );
    else
      account = (
        <NavLink to={'/login'}>
          <IconLogin title='Sign In' />
        </NavLink>
      );

    return (
      <div {...rest} ref={ref => this.nav = ref}>
        <nav className={this.state.show ? null : 'hide'}>
          <NavLink to={'/admin'} exact activeClassName='nav-active'>
            <IconHome title='View Dashboard' />
          </NavLink>
          <NavLink to={'/admin/events'} activeClassName='nav-active'>
            <IconEvent title='Manage Events' />
          </NavLink>
          <NavLink to={'/admin/rules'} activeClassName='nav-active'>
            <IconRule title='Manage Rules' />
          </NavLink>
          <NavLink to={'/admin/characters'} activeClassName='nav-active'>
            <IconCharacter title='Manage Characters' />
          </NavLink>
          {account}
        </nav>
      </div>
    );
  }
}

Navigation.defaultProps = {
  user: {},
  hideOnScroll: false
};

/* location and history props added by Route
 */
Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  hideOnScroll: PropTypes.bool
};

export default Navigation;
