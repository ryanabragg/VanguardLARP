import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';

import NotificationList from '../../../src/components/util/NotificationList';
import Notification from '../../../src/components/util/Notification';

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
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    NotificationList.notify({
      message: 'testing',
      timeout: 0
    });
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('testing');
    wrapper.unmount();
  });

  if('Notifications persist in state until dismissed or they timeout', () => {
    const wrapper = mount(<NotificationList />);
    //from prior test
    expect(wrapper.find(Notification)).to.have.length(2);
    wrapper.unmount();
  });

  if('removes all Notifications from state when NotificationList.clear is called', () => {
    const wrapper = mount(<NotificationList />);
    expect(wrapper.find(Notification)).to.have.length(2);
    NotificationList.clear();
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(0);
    wrapper.unmount();
  });

  it('adds a Notification when NotificationList.info is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.info('test', 'titular');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('info');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.info('test');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('info');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
    wrapper.unmount();
  });

  it('adds a Notification when NotificationList.success is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.success('test', 'titular');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('success');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.success('test');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('success');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
    wrapper.unmount();
  });

  it('adds a Notification when NotificationList.warning is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.warning('test', 'titular');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('warning');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.warning('test');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('warning');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
    wrapper.unmount();
  });

  it('adds a Notification when NotificationList.alert is called', () => {
    const wrapper = mount(<NotificationList />);
    NotificationList.clear();
    expect(wrapper.find(Notification)).to.have.length(0);
    NotificationList.alert('test', 'titular');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(1);
    expect(wrapper.find(Notification).at(0).prop('type')).to.equal('alert');
    expect(wrapper.find(Notification).at(0).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(0).prop('title')).to.equal('titular');
    NotificationList.alert('test');
    wrapper.update();
    expect(wrapper.find(Notification)).to.have.length(2);
    expect(wrapper.find(Notification).at(1).prop('type')).to.equal('alert');
    expect(wrapper.find(Notification).at(1).prop('message')).to.equal('test');
    expect(wrapper.find(Notification).at(1).prop('title')).to.equal('');
    wrapper.unmount();
  });
});
