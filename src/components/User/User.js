import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import UserMenu from './styled/UserMenu';
import UserCharacters from './styled/UserCharacters';

import Button from '../util/styled/Button';
import Modal from '../util/styled/Modal';
import Field from '../util/styled/Field';

import NotificationList from '../util/NotificationList';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      password: '',
      data: '',
      dataVerify: ''
    };

    this.logout = this.logout.bind(this);
    this.reloadCharacters = this.reloadCharacters.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFormKeyPress = this.handleFormKeyPress.bind(this);

    this.editName = this.editName.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.renderPrompt = this.renderPrompt.bind(this);
    this.closePrompt = this.closePrompt.bind(this);
  }

  componentDidMount() {
    this.props.api.service('users').on('patched', record => {
      console.log(record)
    });
    if(this.props.match.params.hasOwnProperty('token'))
      this.props.api.accountAcceptIdentity(this.props.match.params.token).then(r => {
        NotificationList.info('Account Updated');
        this.props.history.replace('/account');
      }).catch(e => {
        NotificationList.alert('Error during verification');
      });
    if(!this.props.user._id)
      this.props.api.getUser().then(user => {
        this.props.setUser(user);
        this.unsubscribe = this.props.subscribeService('characters');
        this.props.loadService('characters');
      }).catch(error => {
        this.props.history.push('/login');
      });
    else {
      this.unsubscribe = this.props.subscribeService('characters');
      this.props.loadService('characters');
    }
  }

  componentWillUnmount () {
    this.props.api.service('users').removeListener('patched');
    if(typeof this.unsubscribe == 'function')
      this.unsubscribe();
  }

  logout() {
    this.props.logout();
    this.props.history.push('/login');
  }

  reloadCharacters() {
    this.props.loadService('characters', true);
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
    this.submitChanges();
  }

  editName() {
    this.setState({
      editing: 'name',
      password: '',
      data: this.props.user.name,
      dataVerify: ''
    });
  }

  editEmail() {
    this.setState({
      editing: 'email',
      password: '',
      data: '',
      dataVerify: ''
    });
  }

  editPassword() {
    this.setState({
      editing: 'password',
      password: '',
      data: '',
      dataVerify: ''
    });
  }

  submitChanges() {
    switch(this.state.editing) {
    case 'name':
      this.props.api.accountChangeField(
        this.props.user.email,
        {name: this.state.data}
      ).then(result => {
        this.closePrompt();
        this.props.api.getUser().then(user => this.props.setUser(user));
      }).catch(error => {
        this.closePrompt();
        NotificationList.alert(error.message);
      });
      break;
    case 'email':
      if(!this.state.password)
        return;
      if(this.state.data != this.state.dataVerify)
        return;
      this.props.api.accountChangeIdentity(
        this.props.user.email,
        this.state.password,
        {email: this.state.data}
      ).then(done => {
        NotificationList.info('Verification email sent');
        this.closePrompt();
      }).catch(error => {
        this.closePrompt();
        NotificationList.alert(error.message);
      });
      break;
    case 'password':
      if(!this.state.password)
        return;
      if(this.state.data != this.state.dataVerify)
        return;
      this.props.api.accountChangePassword(
        this.props.user.email,
        this.state.password,
        this.state.data
      ).then(done => {
        NotificationList.info('Your password has been updated');
        this.closePrompt();
      }).catch(error => {
        this.closePrompt();
        NotificationList.alert(error.message);
      });
      break;
    }
  }

  closePrompt() {
    this.setState({
      editing: null,
      password: '',
      data: '',
      dataVerify: ''
    });
  }

  renderPrompt() {
    switch(this.state.editing) {
    case 'name':
      return (
        <div className='profile prompt'>
          <div className='header'>
            <h2>Edit Name</h2>
          </div>
          <ul className='main'>
            <li>New Name:</li>
            <li>
              <Field type='text' decorated
                name='data'
                value={this.state.data}
                onChange={this.onChange}
                onKeyPress={this.handleFormKeyPress}
              />
            </li>
          </ul>
          <div className='footer'>
            <Button label='Cancel'
              callback={this.closePrompt}
            >
              Cancel
            </Button>
            <Button label='Save'
              callback={this.submitChanges}
              type='primary'
            >
              Save
            </Button>
          </div>
        </div>
      );
    case 'email':
      return (
        <div className='profile prompt'>
          <div className='header'>
            <h2>Edit Email</h2>
          </div>
          <ul className='main'>
            <li>New Email:</li>
            <li>
              <Field type='text' decorated
                name='data'
                value={this.state.data}
                onChange={this.onChange}
              />
            </li>
            <li>Enter again:</li>
            <li>
              <Field type='text' decorated
                name='dataVerify'
                value={this.state.dataVerify}
                onChange={this.onChange}
                alert={this.state.dataVerify && this.state.dataVerify != this.state.data}
              />
            </li>
            <li>Password:</li>
            <li>
              <Field type='password' decorated
                name='password'
                value={this.state.password}
                onChange={this.onChange}
                onKeyPress={this.handleFormKeyPress}
              />
            </li>
          </ul>
          <div className='footer'>
            <Button label='Cancel'
              callback={this.closePrompt}
            >
              Cancel
            </Button>
            <Button label='Save'
              callback={this.submitChanges}
              type='primary'
            >
              Save
            </Button>
          </div>
        </div>
      );
    case 'password':
      return (
        <div className='profile prompt'>
          <div className='header'>
            <h2>Edit Password</h2>
          </div>
          <ul className='main'>
            <li>New Password:</li>
            <li>
              <Field type='password' decorated
                name='data'
                value={this.state.data}
                onChange={this.onChange}
              />
            </li>
            <li>Enter again:</li>
            <li>
              <Field type='password' decorated
                name='dataVerify'
                value={this.state.dataVerify}
                onChange={this.onChange}
                alert={this.state.dataVerify && this.state.dataVerify != this.state.data}
              />
            </li>
            <li>Current password:</li>
            <li>
              <Field type='password' decorated
                name='password'
                value={this.state.password}
                onChange={this.onChange}
                onKeyPress={this.handleFormKeyPress}
              />
            </li>
          </ul>
          <div className='footer'>
            <Button label='Cancel'
              callback={this.closePrompt}
            >
              Cancel
            </Button>
            <Button label='Save'
              callback={this.submitChanges}
              type='primary'
            >
              Save
            </Button>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.location;
    delete rest.match;
    delete rest.history;
    delete rest.staticContext;
    delete rest.api;
    delete rest.user;
    delete rest.setUser;
    delete rest.logout;
    delete rest.characters;
    delete rest.subscribeService;
    delete rest.loadService;

    return (
      <div {...rest}>
        <UserMenu logout={this.logout}
          reloadCharacters={this.reloadCharacters}
        />
        <div className='profile'>
          <h1>You</h1>
          <ul>
            <li>
              <label>Name</label>
              <p>{this.props.user.name}</p>
              <Button label='Change Name'
                callback={this.editName}
              >
                Edit
              </Button>
            </li>
            <li>
              <label>Email</label>
              <p>{this.props.user.email}</p>
              <Button label='Change Email'
                callback={this.editEmail}
              >
                Edit
              </Button>
            </li>
            <li>
              <p></p>
              <Button label='Change Password'
                callback={this.editPassword}
              >
                Change Password
              </Button>
            </li>
          </ul>
        </div>
        <Modal visible={this.state.editing != null}
          close={this.closePrompt}
        >
          {this.renderPrompt()}
        </Modal>
        <UserCharacters characters={this.props.characters} />
      </div>
    );
  }
}

User.defaultProps = {
  location: {},
  match: {},
  history: {},
  staticContext: {},
  api: {},
  user: {},
  setUser: () => null,
  logout: () => null,
  characters: [],
  subscribeService: () => null,
  loadService: () => null
};

User.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  staticContext: PropTypes.object,
  api: PropTypes.object,
  user: PropTypes.object,
  setUser: PropTypes.func,
  logout: PropTypes.func,
  characters: PropTypes.array,
  subscribeService: PropTypes.func,
  loadService: PropTypes.func
};

export default User;
