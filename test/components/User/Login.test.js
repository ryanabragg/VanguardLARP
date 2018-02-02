import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { mount } from 'enzyme';

import api from '../../../src/util/api';

import Login from '../../../src/components/User/Login';
import Logo from '../../../src/components/svg/Logo';

/*
 * provide match object with path string to mimic prop from react-router
 */

describe('<Login />', () => {
  it('renders a form for login', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('name')).to.equal('login');
    expect(wrapper.find(Logo)).to.have.length(1);
    expect(wrapper.find('span')).to.have.length(3);
    expect(wrapper.find('.logo').type()).to.equal('span');
    expect(wrapper.find('.option-left').type()).to.equal('span');
    expect(wrapper.find('.option-left').text()).to.equal('Forgot your password?');
    expect(wrapper.find('.option-right').type()).to.equal('span');
    expect(wrapper.find('.option-right').text()).to.equal('Sign Up');
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find({value: 'submit'}).type()).to.equal('button');
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find('label').at(0).text()).to.equal('Email');
    expect(wrapper.find('label').at(1).text()).to.equal('Password');
    expect(wrapper.find('input')).to.have.length(2);
    expect(wrapper.find('input').at(0).prop('type')).to.equal('text');
    expect(wrapper.find('input').at(0).prop('name')).to.equal('email');
    expect(wrapper.find('input').at(1).prop('type')).to.equal('password');
    expect(wrapper.find('input').at(1).prop('name')).to.equal('password');
  });

  it('renders a form for registration', () => {
    const match = {
      params: {},
      path: '/register'
    };
    const wrapper = mount(<Login match={match} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('name')).to.equal('register');
    expect(wrapper.find(Logo)).to.have.length(1);
    expect(wrapper.find('span')).to.have.length(2);
    expect(wrapper.find('.logo').type()).to.equal('span');
    expect(wrapper.find('.option-right').type()).to.equal('span');
    expect(wrapper.find('.option-right').text()).to.equal('Sign In');
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find({value: 'submit'}).type()).to.equal('button');
    expect(wrapper.find('label')).to.have.length(3);
    expect(wrapper.find('label').at(0).text()).to.equal('Name');
    expect(wrapper.find('label').at(1).text()).to.equal('Email');
    expect(wrapper.find('label').at(2).text()).to.equal('Password');
    expect(wrapper.find('input')).to.have.length(4);
    expect(wrapper.find('input').at(0).prop('type')).to.equal('text');
    expect(wrapper.find('input').at(0).prop('name')).to.equal('name');
    expect(wrapper.find('input').at(1).prop('type')).to.equal('text');
    expect(wrapper.find('input').at(1).prop('name')).to.equal('email');
    expect(wrapper.find('input').at(2).prop('type')).to.equal('password');
    expect(wrapper.find('input').at(2).prop('name')).to.equal('password');
    expect(wrapper.find('input').at(3).prop('type')).to.equal('password');
    expect(wrapper.find('input').at(3).prop('name')).to.equal('passwordAgain');
  });

  it('switches between login and registration based on user input', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('form').prop('name')).to.equal('login');
    wrapper.find('.option-right').simulate('click');
    expect(wrapper.find('form').prop('name')).to.equal('register');
    wrapper.find('.option-right').simulate('click');
    expect(wrapper.find('form').prop('name')).to.equal('login');
  });

  it('shows a password reset form when "Forgot your password?" is clicked', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('form').prop('name')).to.equal('login');
    wrapper.find('.option-left').simulate('click');
    expect(wrapper.find('form').prop('name')).to.equal('password-recovery');
    expect(wrapper.find(Logo)).to.have.length(1);
    expect(wrapper.find('span')).to.have.length(2);
    expect(wrapper.find('.logo').type()).to.equal('span');
    expect(wrapper.find('.option-left').type()).to.equal('span');
    expect(wrapper.find('.option-left').text()).to.equal('Sign In');
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find({value: 'submit'}).type()).to.equal('button');
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').at(0).text()).to.equal('Email');
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('input').at(0).prop('type')).to.equal('text');
    expect(wrapper.find('input').at(0).prop('name')).to.equal('email');
    wrapper.find('.option-left').simulate('click');
    expect(wrapper.find('form').prop('name')).to.equal('login');
  });

  it('updates the state email and password from the inputs', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.state().email).to.equal('');
    wrapper.find({name:'email'}).simulate('change', {target: {name: 'email', value: 'test'}, stopPropagation: () => {}});
    expect(wrapper.state().email).to.equal('test');
    expect(wrapper.state().password).to.equal('');
    wrapper.find({name:'password'}).simulate('change', {target: {name: 'password', value: 'testing'}, stopPropagation: () => {}});
    expect(wrapper.state().password).to.equal('testing');
  });

  it('clears the password state and input after each attempt'/*, () => {
    const setUser = spy();
    const history = {push: (location) => {}, goBack: () => {}};
    spy(history, 'push');
    const wrapper = shallow(<Login login={login} register={register} setUser={setUser} history={history} match={{path:'/login'}} history={history} />);
    expect(wrapper.state().password).to.equal('');
    wrapper.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'testing'}, stopPropagation: () => {}});
    expect(wrapper.state().password).to.equal('testing');
    wrapper.find({value: 'submit'}).simulate('click', {stopPropagation: () => {}});
    expect(wrapper.state().password).to.equal('');
  }*/);

  it('creates an account and logs in using Facebook oauth (register)');

  it('logs in using Facebook oauth (login)');

  it('creates an account and logs in using local auth (register)'/*, async () => {
    spy(api, 'register');
    spy(api, 'login');
    const setUser = spy();
    const history = {push: (location) => {}, goBack: () => {}};
    spy(history, 'push');
    const wrapper = shallow(<Login login={login} register={register} setUser={setUser} history={history} match={{path:'/login'}} history={history} />);
    wrapper.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'test'}, stopPropagation: () => {}});
    wrapper.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'test'}, stopPropagation: () => {}});
    wrapper.find({value: 'submit'}).simulate('click', {stopPropagation: () => {}});
    expect(api.register.callCount).to.equal(1);
    expect(api.login.callCount).to.equal(1);
    expect(history.push.callCount).to.equal(1);
    expect(history.push.getCall(0).args[0]).to.equal('/account');
    api.register.restore();
    api.login.restore();
    history.push.restore();
  }*/);

  it('logs in using local auth (login)'/*, () => {
    spy(api, 'login');
    const setUser = spy();
    const history = {push: (location) => {}, goBack: () => {}};
    spy(history, 'push');
    const wrapper = shallow(<Login login={login} register={register} setUser={setUser} history={history} match={{path:'/login'}} history={history} />);
    wrapper.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'test'}, stopPropagation: () => {}});
    wrapper.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'test'}, stopPropagation: () => {}});
    wrapper.find({value: 'submit'}).simulate('click', {stopPropagation: () => {}});
    api.login.restore();
    history.push.restore();
  }*/);

  it('sends the user to the previous page after logging in');

  it('sends the user to the account page after registering');
  
  it('sends a confirmation email after creating a local account');

  it('has a disabled Reset Password button if no email is entered');

  it('sends a password reset email');

  it('renders a new password entry form if a reset token is used', () => {
    const match = {
      params: {
        token: 'test'
      },
      path: '/login/verify/:token'
    };
    const wrapper = mount(<Login match={match} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('name')).to.equal('password-reset');
    expect(wrapper.find('label').text()).to.equal('Password');
    expect(wrapper.find('input')).to.have.length(2);
    expect(wrapper.find('input').at(0).prop('type')).to.equal('password');
    expect(wrapper.find('input').at(0).prop('name')).to.equal('password');
    expect(wrapper.find('input').at(1).prop('type')).to.equal('password');
    expect(wrapper.find('input').at(1).prop('name')).to.equal('passwordAgain');
    // todo: confirm api call on button click
  });
});
