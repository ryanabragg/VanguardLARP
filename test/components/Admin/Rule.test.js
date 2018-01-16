import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Rule from '../../../src/components/Admin/Rule';
import Field from '../../../src/components/Admin/Field';

describe('<Rule />', () => {
  it('renders a div with a span and five Field components', () => {
    const onClick = spy();
    const wrapper = shallow(<Rule id={1} name='dog' category='cat' onClick={onClick} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').children()).to.have.length(5);
    wrapper.find('div').children().forEach(node => {
      expect(node.type()).to.equal(Field);
    });
    expect(wrapper.find('div').prop('id')).to.equal(1);
    expect(wrapper.find('div').prop('onClick')).to.equal(onClick);
  });

  it('renders the Field components with the propper props', () => {
    const onClick = spy();
    const wrapper = shallow(<Rule id={1} name='dog' category='pet' group='cat' tier='3' race='feline' culture='hunter' onClick={onClick} />);
    expect(wrapper.find(Field).at(0).prop('id')).to.equal(1);
    expect(wrapper.find(Field).at(0).prop('name')).to.equal('name');
    expect(wrapper.find(Field).at(0).prop('text')).to.equal('dog');
    expect(wrapper.find(Field).at(0).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(1).prop('id')).to.equal(1);
    expect(wrapper.find(Field).at(1).prop('name')).to.equal('category');
    expect(wrapper.find(Field).at(1).prop('text')).to.equal('pet');
    expect(wrapper.find(Field).at(1).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(2).prop('id')).to.equal(1);
    expect(wrapper.find(Field).at(2).prop('name')).to.equal('group');
    expect(wrapper.find(Field).at(2).prop('text')).to.equal('cat');
    expect(wrapper.find(Field).at(2).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(3).prop('id')).to.equal(1);
    expect(wrapper.find(Field).at(3).prop('name')).to.equal('race');
    expect(wrapper.find(Field).at(3).prop('text')).to.equal('feline');
    expect(wrapper.find(Field).at(3).prop('onClick')).to.equal(onClick);

    expect(wrapper.find(Field).at(4).prop('id')).to.equal(1);
    expect(wrapper.find(Field).at(4).prop('name')).to.equal('culture');
    expect(wrapper.find(Field).at(4).prop('text')).to.equal('hunter');
    expect(wrapper.find(Field).at(4).prop('onClick')).to.equal(onClick);
  });
});
