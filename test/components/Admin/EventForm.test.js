import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import EventForm from '../../../src/components/Admin/EventForm';
import Field from '../../../src/components/util/Field';

describe('<EventForm />', () => {
  it('renders a form with one fieldset holding three Field components and three buttons', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<EventForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('id')).to.equal('42');
    expect(wrapper.find('form').prop('name')).to.equal('event');
    expect(wrapper.find('form').children()).to.have.length(4);
    expect(wrapper.find('fieldset')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find('label')).to.have.length(3);
    expect(wrapper.find(Field)).to.have.length(3);
  });

  it('has a button for submit, cancel, and delete', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<EventForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find('button').at(0).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(0).prop('value')).to.equal('submit');
    expect(wrapper.find('button').at(0).prop('onClick')).to.equal(onSubmit);
    expect(wrapper.find('button').at(0).text()).to.equal('Submit');
    expect(wrapper.find('button').at(1).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(1).prop('value')).to.equal('cancel');
    expect(wrapper.find('button').at(1).prop('onClick')).to.equal(onCancel);
    expect(wrapper.find('button').at(1).text()).to.equal('Cancel');
    expect(wrapper.find('button').at(2).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(2).prop('value')).to.equal('delete');
    expect(wrapper.find('button').at(2).prop('onClick')).to.equal(onDelete);
    expect(wrapper.find('button').at(2).text()).to.equal('Delete');
  });

  it('does not include the delete button if id="new"', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<EventForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('button')).to.have.length(3);
    wrapper.setProps({
      id: 'new'
    });
    expect(wrapper.find('button')).to.have.length(2);
    expect(wrapper.find('button').at(0).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(0).prop('value')).to.equal('submit');
    expect(wrapper.find('button').at(0).prop('onClick')).to.equal(onSubmit);
    expect(wrapper.find('button').at(0).text()).to.equal('Submit');
    expect(wrapper.find('button').at(1).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(1).prop('value')).to.equal('cancel');
    expect(wrapper.find('button').at(1).prop('onClick')).to.equal(onCancel);
    expect(wrapper.find('button').at(1).text()).to.equal('Cancel');
  });

  it('renders the Field components with the propper props', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<EventForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);

    wrapper.setProps({
      date: '1985-10-26',
      location: 'Back',
      area: 'Future'
    });

    expect(wrapper.find('label').at(0).text()).to.equal('Date');
    expect(wrapper.find(Field).at(0).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(0).prop('name')).to.equal('date');
    expect(wrapper.find(Field).at(0).prop('value')).to.equal('1985-10-26');
    expect(wrapper.find(Field).at(0).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(1).text()).to.equal('Location');
    expect(wrapper.find(Field).at(1).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(1).prop('name')).to.equal('location');
    expect(wrapper.find(Field).at(1).prop('value')).to.equal('Back');
    expect(wrapper.find(Field).at(1).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(2).text()).to.equal('Area');
    expect(wrapper.find(Field).at(2).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(2).prop('name')).to.equal('area');
    expect(wrapper.find(Field).at(2).prop('value')).to.equal('Future');
    expect(wrapper.find(Field).at(2).prop('onChange')).to.equal(onChange);
  });

  it('grabs the ref to the DOM form after mounting');
  it('scrolls the window to have the form\'s top at the top of the viewable area if scrollToForm is true');
});
