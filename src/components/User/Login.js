import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import wait from '../../util/wait';

import Logo from '../svg/Logo';

import NotificationList from '../util/NotificationList';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.match.path.substring(1) || 'login',
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      attempts: 0,
      next: Date.now(),
      max: 5,
      lockout: 1000 * 60 * 5 // 5 minutes
    }

    this.loginFacebook = this.loginFacebook.bind(this);
    this.login = this.login.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormKeyPress = this.handleFormKeyPress.bind(this);

    this.handleFormLoginFacebook = this.handleFormLoginFacebook.bind(this);
    this.handleFormLoginLocal = this.handleFormLoginLocal.bind(this);
    this.handleFormPasswordRecovery = this.handleFormPasswordRecovery.bind(this);
    this.handleFormRegisterFacebook = this.handleFormRegisterFacebook.bind(this);
    this.handleFormRegisterLocal = this.handleFormRegisterLocal.bind(this);
    this.handleFormPasswordReset = this.handleFormPasswordReset.bind(this);

    this.handleViewLogin = this.handleViewLogin.bind(this);
    this.handleViewRegister = this.handleViewRegister.bind(this);
    this.handleViewPasswordRecovery = this.handleViewPasswordRecovery.bind(this);

    this.renderLogin = this.renderLogin.bind(this);
    this.renderRegister = this.renderRegister.bind(this);
    this.renderRequestPassword = this.renderRequestPassword.bind(this);
    this.renderResetPassword = this.renderResetPassword.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.hasOwnProperty('token'))
      this.setState({view: 'password-reset'});
    if(this.props.user._id)
      this.props.history.push('/account');
  }

  async loginFacebook(credentials, register = false) {
    if(register)
      return;
  }

  async login(credentials, register = false) {
    await wait(500);
    if(this.props.next > Date.now()) {
      let time = (this.props.next - Date.now()) / 1000;
      let units = 'seconds';
      if(time > 60){
        time = time / 60;
        units = 'minutes';
      }
      NotificationList.alert(`Please wait ${time} ${units} before trying again.`);
      return Promise.reject();
    }
    if(register) {
      try {
        await this.props.api.register(credentials);
      } catch (error) {
        NotificationList.alert(error.message, error.name);
        return Promise.reject(error);
      }
    }
    let user = {};
    let fail = false;
    try {
      user = await this.props.api.login(credentials);
      fail = Object.keys(user).length === 0 && user.constructor === Object;
      this.props.setUser(user);
    } catch (error) {
      NotificationList.alert(error.message, error.name);
    }
    this.setState((prevState, props) => {
      let attempts = prevState.attempts + 1;
      return {
        password: '',
        passwordAgain: '',
        attempts: attempts,
        next: Date.now() + (attempts > this.state.max ? this.state.lockout : 0)
      };
    });
    if(register && !fail)
      return Promise.resolve().then(result => {
        NotificationList.info('Please check your email for verification.');
        this.props.history.push('/account');
      });
    else if(!fail)
      return Promise.resolve().then(result => {
        this.props.history.goBack();
        if(this.props.match.path.substring(1, 6) == 'login')
          this.props.history.push('/account');
      });
    return Promise.reject();
  }

  handleFormInputChange(e) {
    e.stopPropagation();
    let target = e.target; // e not available during callback
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState[target.name] = target.type === 'checkbox' ? target.checked : target.value;
      return nextState;
    });
  }

  handleFormKeyPress(e) {
    if(e.key != 'Enter')
      return;
    if(this.state.view == 'login')
      this.handleFormLoginLocal(e);
    else if(this.state.view == 'register')
      this.handleFormRegisterLocal(e);
    else if(this.state.view == 'password-recovery')
      this.handleFormPasswordRecovery(e);
  }

  handleFormLoginFacebook(e) {
    e.stopPropagation();
    loginFacebook();
  }

  handleFormLoginLocal(e) {
    e.stopPropagation();
    const credentials = !this.state.email || !this.state.password ? null :
      { email: this.state.email,
        password: this.state.password
      };
    this.login(credentials);
  }

  handleFormPasswordRecovery(e) {
    e.stopPropagation();
    if(!this.state.email)
      return;
    this.props.api.accountRequestPassword(this.state.email).then(r => {
      NotificationList.info('Password recovery email sent');
    }).catch(e => {
      NotificationList.alert('Error sending password recovery email');
    });
  }

  handleFormRegisterFacebook(e) {
    e.stopPropagation();
  }

  handleFormRegisterLocal(e) {
    e.stopPropagation();
    // @todo email and pwd check
    if(this.state.password != this.state.passwordAgain) {
      NotificationList.alert('Password entries do not match');
      return;
    }
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    this.login(credentials, true);
  }

  handleFormPasswordReset() {
    if(this.state.password != this.state.passwordAgain) {
      NotificationList.alert('Password entries do not match');
      return;
    }
    this.props.api.accountResetPassword(this.props.match.params.token, this.state.password).then(r => {
      NotificationList.info('Password updated');
      this.props.history.replace('/login');
      this.setState({
        view: 'login',
        name: '',
        email: '',
        password: '',
        passwordAgain: ''
      });
    }).catch(e => {
      NotificationList.alert('Error during password update');
      this.props.history.replace('/login');
      this.setState({
        view: 'password-recovery',
        name: '',
        email: '',
        password: '',
        passwordAgain: ''
      });
    });
  }

  handleViewLogin() {
    this.setState({view: 'login'});
  }

  handleViewRegister() {
    this.setState({view: 'register'});
  }

  handleViewPasswordRecovery() {
    this.setState({view: 'password-recovery'});
  }

/*
        <button type='button' value='facebook'
          onClick={this.handleFormLoginFacebook}
        >
          Sign in with Facebook
        </button>
        <span className='divider'>or</span>*/

  renderLogin() {
    return (
      <form name='login'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <label>Email</label>
        <input type='text'
          name='email'
          value={this.state.email}
          onChange={this.handleFormInputChange}
        />
        <label>Password</label>
        <input type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
        />
        <button type='button' value="submit"
          onClick={this.handleFormLoginLocal}
        >
          Sign In
        </button>
        <span className='option-left'
          onClick={this.handleViewPasswordRecovery}
        >
          Forgot your password?
        </span>
        <span className='option-right'
          onClick={this.handleViewRegister}
        >
          Sign Up
        </span>
      </form>
    );
  }

  renderRegister() {
    return (
      <form name='register'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <label>Name</label>
        <input type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleFormInputChange}
        />
        <label>Email</label>
        <input type='text'
          name='email'
          value={this.state.email}
          onChange={this.handleFormInputChange}
        />
        <label>Password</label>
        <input type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
        />
        <input type='password'
          name='passwordAgain'
          value={this.state.passwordAgain}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
          className={this.state.password && this.state.password != this.state.passwordAgain ? 'warn' : ''}
        />
        <button type='button' value="submit"
          onClick={this.handleFormRegisterLocal}
        >
          Sign Up
        </button>
        <span className='option-right'
          onClick={this.handleViewLogin}
        >
          Sign In
        </span>
      </form>
    );
  }

  renderRequestPassword() {
    return (
      <form name='password-recovery'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <label>Email</label>
        <input type='text'
          name='email'
          value={this.state.email}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
        />
        <button type='button' value='submit'
          onClick={this.handleFormPasswordRecovery}
        >
          Reset Password
        </button>
        <span className='option-left'
          onClick={this.handleViewLogin}
        >
          Sign In
        </span>
      </form>
    );
  }

  renderResetPassword() {
    return (
      <form name='password-reset'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <label>Password</label>
        <input type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
        />
        <input type='password'
          name='passwordAgain'
          value={this.state.passwordAgain}
          onChange={this.handleFormInputChange}
          onKeyPress={this.handleFormKeyPress}
          className={this.state.password && this.state.password != this.state.passwordAgain ? 'warn' : ''}
        />
        <button type='button' value="submit"
          onClick={this.handleFormPasswordReset}
        >
          Reset Password
        </button>
      </form>
    );
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.location;
    delete rest.match;
    delete rest.history;
    delete rest.staticContext;
    delete rest.register;
    delete rest.login;
    delete rest.user;
    delete rest.setUser;

    let form = null;
    switch(this.state.view) {
    case 'register':
      form = this.renderRegister();
      break;
    case 'password-recovery':
      form = this.renderRequestPassword();
      break;
    case 'password-reset':
      form = this.renderResetPassword();
      break;
    default:
      form = this.renderLogin();
    }
    return (
      <div {...rest}>
        {form}
      </div>
    );
  }
}

Login.defaultProps = {
  location: {},
  match: {
    path: '/login',
    params: {}
  },
  history: {
    push: () => null,
    goBack: () => null
  },
  staticContext: {},
  api: {},
  user: {},
  setUser: () => null
};

Login.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  staticContext: PropTypes.object,
  api: PropTypes.object,
  user: PropTypes.object,
  setUser: PropTypes.func
};

export default Login;
