import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Event from '../../../src/components/Admin/Event';
import Field from '../../../src/components/Admin/Field';

describe('<Event />', () => {
  it('renders a div with a span and six Field components', () => {
    const onClick = spy();
    const wrapper = shallow(<Event id={'1'} date='1985-10-26' location='Back' onClick={onClick} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').children()).to.have.length(3);
    wrapper.find('div').children().forEach(node => {
      expect(node.type()).to.equal(Field);
    });
    expect(wrapper.find('div').prop('id')).to.equal('1');
    expect(wrapper.find('div').prop('onClick')).to.equal(onClick);
  });

  it('renders the Field components with the propper props', () => {
    const onClick = spy();
    const wrapper = shallow(<Event id={'1'} date='1985-10-26' location='Back' area='Future' onClick={onClick} />);
    expect(wrapper.find(Field).at(0).prop('id')).to.equal('1');
    expect(wrapper.find(Field).at(0).prop('name')).to.equal('date');
    expect(wrapper.find(Field).at(0).prop('text')).to.equal('1985-10-26');
    expect(wrapper.find(Field).at(0).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(1).prop('id')).to.equal('1');
    expect(wrapper.find(Field).at(1).prop('name')).to.equal('location');
    expect(wrapper.find(Field).at(1).prop('text')).to.equal('Back');
    expect(wrapper.find(Field).at(1).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(2).prop('id')).to.equal('1');
    expect(wrapper.find(Field).at(2).prop('name')).to.equal('area');
    expect(wrapper.find(Field).at(2).prop('text')).to.equal('Future');
    expect(wrapper.find(Field).at(2).prop('onClick')).to.equal(onClick);
  });
});
