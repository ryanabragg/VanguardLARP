import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import EventList from '../../../src/components/Admin/EventList';
import EventForm from '../../../src/components/Admin/EventForm';
import Event from '../../../src/components/Admin/Event';

describe('<EventList />', () => {
  it('renders an article with an array of rule objects as Event components', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <EventList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(0);
    expect(wrapper.find(Event)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy'
      }, {
        _id: 'flux',
        date: 'October 26, 1985',
        location: 'Back',
        area: 'Future'
      }]
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(0);
    expect(wrapper.find(Event)).to.have.length(2);
  });

  it('handles a blank selected prop', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <EventList
        list={[]}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(0);
    expect(wrapper.find(Event)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy'
      }, {
        _id: 'flux',
        date: 'October 26, 1985',
        location: 'Back',
        area: 'Future'
      }]
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(0);
    expect(wrapper.find(Event)).to.have.length(2);
  });

  it('renders a EventForm instead of a Event for the array object matching the selected object id', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <EventList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(0);
    expect(wrapper.find(Event)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy'
      }, {
        _id: 'flux',
        date: 'October 26, 1985',
        location: 'Back',
        area: 'Future'
      }],
      selected: {
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy'
      }
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(EventForm)).to.have.length(1);
    expect(wrapper.find(Event)).to.have.length(1);
  });

  it('passes the correct props to each Event', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <EventList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    wrapper.setProps({
      list: [{
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy',
        area: 'Hitchhiking'
      }],
    });
    expect(wrapper.find(Event).prop('id')).to.equal('42');
    expect(wrapper.find(Event).prop('date')).to.equal('1979-10-12');
    expect(wrapper.find(Event).prop('location')).to.equal('Galaxy');
    expect(wrapper.find(Event).prop('area')).to.equal('Hitchhiking');
    expect(wrapper.find(Event).prop('onClick')).to.equal(onClick);
  });

  it('passes the correct props to the EventForm', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <EventList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    wrapper.setProps({
      list: [{
        _id: '42',
        date: 'these are not used',
        location: 'these are not used',
        area: 'these are not used'
      }],
      selected: {
        _id: '42',
        date: '1979-10-12',
        location: 'Galaxy',
        area: 'Hitchhiking'
      },
      scrollToForm: true
    });
    expect(wrapper.find(EventForm).prop('id')).to.equal('42');
    expect(wrapper.find(EventForm).prop('date')).to.equal('1979-10-12');
    expect(wrapper.find(EventForm).prop('location')).to.equal('Galaxy');
    expect(wrapper.find(EventForm).prop('area')).to.equal('Hitchhiking');
    expect(wrapper.find(EventForm).prop('onChange')).to.equal(onChange);
    expect(wrapper.find(EventForm).prop('onSubmit')).to.equal(onSubmit);
    expect(wrapper.find(EventForm).prop('onCancel')).to.equal(onCancel);
    expect(wrapper.find(EventForm).prop('onDelete')).to.equal(onDelete);
    expect(wrapper.find(EventForm).prop('scrollToForm')).to.equal(true);
  });
});
