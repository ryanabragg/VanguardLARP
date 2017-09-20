import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Logo from '../svg/Logo';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.match.path.substring(1) || 'login',
      email: '',
      password: '',
      attempts: 0,
      maxAttempts: 3
    }

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormLoginFacebook = this.handleFormLoginFacebook.bind(this);
    this.handleFormLoginLocal = this.handleFormLoginLocal.bind(this);
    this.handleFormPasswordRecovery = this.handleFormPasswordRecovery.bind(this);
    this.handleViewLogin = this.handleViewLogin.bind(this);
    this.handleViewRegister = this.handleViewRegister.bind(this);
    this.handleViewPasswordRecovery = this.handleViewPasswordRecovery.bind(this);
  }

  handleFormInputChange(e) {
    e.preventDefault();
    let target = e.target; // e not available during callback
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState[target.name] = target.type === 'checkbox' ? target.checked : target.value;
      return nextState;
    });
  }

  handleFormLoginFacebook(e) {
    e.preventDefault();
  }

  async handleFormLoginLocal(e) {
    e.preventDefault();
    if(typeof this.props.api.login != 'function')
      return;
    const user = await this.props.api.login(this.state.email, this.state.password);
    console.log(user);
    let acct = await this.props.api.user();
    console.log(acct);
    this.setState({password: ''});
  }

  handleFormPasswordRecovery(e) {
    e.preventDefault();
  }

  handleFormRegister(e) {
    e.preventDefault();
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
        <button type='button' value='facebook' onClick={this.handleFormLoginFacebook}>Sign in with Facebook</button>
        <span className='divider'>
          or
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
        />
        <button type='button' value="submit" onClick={this.handleFormLoginLocal}>Sign In</button>
        <span className='option-left' onClick={this.handleViewPasswordRecovery}>Forgot your password?</span>
        <span className='option-right' onClick={this.handleViewRegister}>Sign Up</span>
      </form>
    );
  }

  renderRegister() {
    return (
      <form name='register'>
        <span className='logo'>
          <Logo alt='logo' />
        </span>
        <button type='button' value='facebook' onClick={this.handleFormLoginFacebook}>Sign up with Facebook</button>
        <span className='divider'>
          or
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
        />
        <button type='button' value="submit" onClick={this.handleFormRegister}>Sign Up</button>
        <span className='option-right' onClick={this.handleViewLogin}>Sign In</span>
      </form>
    );
  }

  renderPasswordRecovery() {
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
        />
        <button type='button' value="submit" onClick={this.handleFormPasswordRecovery}>Reset Password</button>
        <span className='option-left' onClick={this.handleViewLogin}>Sign In</span>
      </form>
    );
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.match;
    delete rest.location;
    delete rest.history;
    delete rest.staticContext;
    delete rest.api;
    delete rest.user;
    delete rest.setUser;
    return (
      <div {...rest}>
        {this.state.view == 'password-recovery'
        ? this.renderPasswordRecovery()
        : this.state.view == 'register'
        ? this.renderRegister()
        : this.renderLogin()
        }
      </div>
    );
  }
}

LoginForm.defaultProps = {
  user: {}
};

LoginForm.propTypes = {
  api: PropTypes.object.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
};

export default LoginForm;
