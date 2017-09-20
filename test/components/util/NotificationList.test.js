import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import NotificationList from '../../../src/components/util/NotificationList';
import Notification from '../../../src/components/util/Notification';

const window = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
copyProps(window, global);

describe('<NotificationList />', () => {

  it('renders an asside', () => {
    const wrapper = shallow(<NotificationList />);
    expect(wrapper.find('asside')).to.have.length(1);
    expect(wrapper.find('asside').text()).to.equal('');
  });

  it('adds a Notification when NotificationList.notify is called', () => {
    const wrapper = mount(<NotificationList />);
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.notify({
      message: 'test',
      timeout: 0
    });
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    NotificationList.notify({
      message: 'testing',
      timeout: 0
    });
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('testing');
  });

  if('Notifications persist in state until dismissed or they timeout', () => {
    const wrapper = mount(<NotificationList />);
    //from prior test
    expect(wrapper.find(Notification)).to.have.length(2);
  });

  if('removes all Notifications from state when NotificationList.clear is called', () => {
    const wrapper = mount(<NotificationList />);
    expect(wrapper.find(Notification)).to.have.length(2);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
  });

  it('adds a Notification when NotificationList.info is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.info('test', 'titular');
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('info');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.info('test');
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('info');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
  });

  it('adds a Notification when NotificationList.success is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.success('test', 'titular');
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('success');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.success('test');
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('success');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
  });

  it('adds a Notification when NotificationList.warning is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.warning('test', 'titular');
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('warning');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.warning('test');
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('warning');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
  });

  it('adds a Notification when NotificationList.alert is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.alert('test', 'titular');
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('alert');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.alert('test');
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('alert');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
  });
});
