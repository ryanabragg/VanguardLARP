import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Field from '../util/styled/Field';

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

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);

    this.onChange = this.onChange.bind(this);
    this.handleFormKeyPress = this.handleFormKeyPress.bind(this);

    this.handleFormLogin = this.handleFormLogin.bind(this);
    this.handleFormPasswordRecovery = this.handleFormPasswordRecovery.bind(this);
    this.handleFormRegister = this.handleFormRegister.bind(this);
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

  register(credentials) {
    this.props.api.register(credentials)
    .then(() => {
      NotificationList.info('Please check your email for verification.');
      this.props.history.push('/account');
    })
    .then(() => this.props.api.login(credentials))
    .then(user => this.props.setUser(user))
    .catch(error => NotificationList.alert(error.message, error.name));
  }

  login(credentials) {
    this.props.api.login(credentials)
    .then(user => this.props.setUser(user))
    .then(() => this.props.history.push('/account'))
    .catch(error => NotificationList.alert(error.message, error.name));
  }

  onChange(payload) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState[payload.type] = payload.data;
      return nextState;
    });
  }

  handleFormKeyPress(e) {
    if(e.key != 'Enter')
      return;
    if(this.state.view == 'login')
      this.handleFormLogin(e);
    else if(this.state.view == 'register')
      this.handleFormRegister(e);
    else if(this.state.view == 'password-recovery')
      this.handleFormPasswordRecovery(e);
  }

  handleFormLogin(e) {
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

  handleFormRegister(e) {
    e.stopPropagation();
    if(!this.state.password) {
      NotificationList.alert('Please enter a password');
      return;
    }
    if(this.state.password != this.state.passwordAgain) {
      NotificationList.alert('Password entries do not match');
      return;
    }
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    this.register(credentials);
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

  renderLogin() {
    return (
      <form name='login'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <label>Email</label>
        <Field type='text' decorated
          name='email'
          value={this.state.email}
          onChange={this.onChange}
        />
        <label>Password</label>
        <Field type='password' decorated
          name='password'
          value={this.state.password}
          onChange={this.onChange}
          onKeyPress={this.handleFormKeyPress}
        />
        <button type='button' value="submit"
          onClick={this.handleFormLogin}
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
        <Field type='text' decorated
          name='name'
          value={this.state.name}
          onChange={this.onChange}
        />
        <label>Email</label>
        <Field type='text' decorated
          name='email'
          value={this.state.email}
          onChange={this.onChange}
        />
        <label>Password</label>
        <Field type='password' decorated
          name='password'
          value={this.state.password}
          onChange={this.onChange}
        />
        <label>Enter again:</label>
        <Field type='password' decorated
          name='passwordAgain'
          value={this.state.passwordAgain}
          onChange={this.onChange}
          alert={this.state.passwordAgain && this.state.passwordAgain != this.state.password}
        />
        <button type='button' value="submit"
          onClick={this.handleFormRegister}
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
        <Field type='text' decorated
          name='email'
          value={this.state.email}
          onChange={this.onChange}
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
        <Field type='password' decorated
          name='password'
          value={this.state.password}
          onChange={this.onChange}
        />
        <label>Enter again:</label>
        <Field type='password' decorated
          name='passwordAgain'
          value={this.state.passwordAgain}
          onChange={this.onChange}
          onKeyPress={this.handleFormKeyPress}
          alert={this.state.passwordAgain && this.state.passwordAgain != this.state.password}
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
        <Helmet>
            <title>Login | Vanguard LARP</title>
        </Helmet>
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
