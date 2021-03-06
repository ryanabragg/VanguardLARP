import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Crafting from '../../../src/components/Character/Crafting';
import Stone from '../../../src/components/Character/Stone';

describe('<Crafting />', () => {

  it('has a list of craft materials, wrapped in spans', () => {
    const wrapper = shallow(<Crafting />);
    expect(wrapper.find('div').at(1).find('span')).to.have.length(6);
    expect(wrapper.find('div').at(1).find('span').at(0).text()).to.equal('Copper');
    expect(wrapper.find('div').at(1).find('span').at(1).text()).to.equal('Silver');
    expect(wrapper.find('div').at(1).find('span').at(2).text()).to.equal('Iron');
    expect(wrapper.find('div').at(1).find('span').at(3).text()).to.equal('Steel');
    expect(wrapper.find('div').at(1).find('span').at(4).text()).to.equal('Mithril');
    expect(wrapper.find('div').at(1).find('span').at(5).text()).to.equal('Adamite');
  });

  it('has a list of craft tiers for the materials, wrapped in spans', () => {
    const wrapper = shallow(<Crafting />);
    expect(wrapper.find('div').at(2).find('span')).to.have.length(6);
    expect(wrapper.find('div').at(2).find('span').at(0).text()).to.equal('Apprentice');
    expect(wrapper.find('div').at(2).find('span').at(1).text()).to.equal('Journeyman');
    expect(wrapper.find('div').at(2).find('span').at(2).text()).to.equal('Craftsman');
    expect(wrapper.find('div').at(2).find('span').at(3).text()).to.equal('Master');
    expect(wrapper.find('div').at(2).find('span').at(4).text()).to.equal('Master');
    expect(wrapper.find('div').at(2).find('span').at(5).text()).to.equal('Master');
  });

  it('has a list of craft tier bag stones for each tier, wrapped in spans', () => {
    const wrapper = shallow(<Crafting />);
    expect(wrapper.find('div').at(3).find('span')).to.have.length(6);
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone)).to.have.length(5);
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone).at(0).prop('color')).to.equal('black');
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone).at(1).prop('color')).to.equal('red');
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone).at(2).prop('color')).to.equal('red');
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone).at(3).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(0).find(Stone).at(4).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(1).find(Stone)).to.have.length(3);
    expect(wrapper.find('div').at(3).find('span').at(1).find(Stone).at(0).prop('color')).to.equal('plus');
    expect(wrapper.find('div').at(3).find('span').at(1).find(Stone).at(0).prop('colorLetters')).to.deep.equal({ plus: '+' });
    expect(wrapper.find('div').at(3).find('span').at(1).find(Stone).at(1).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(1).find(Stone).at(2).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone)).to.have.length(4);
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone).at(0).prop('color')).to.equal('plus');
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone).at(0).prop('colorLetters')).to.deep.equal({ plus: '+' });
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone).at(1).prop('color')).to.equal('blue');
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone).at(2).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(2).find(Stone).at(3).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone)).to.have.length(8);
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(0).prop('color')).to.equal('plus');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(0).prop('colorLetters')).to.deep.equal({ plus: '+' });
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(1).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(2).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(3).prop('color')).to.equal('white');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(4).prop('color')).to.equal('and');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(4).prop('colorLetters')).to.deep.equal({ and: '&' });
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(5).prop('color')).to.equal('black');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(6).prop('color')).to.equal('equals');
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(6).prop('colorLetters')).to.deep.equal({ equals: '=' });
    expect(wrapper.find('div').at(3).find('span').at(3).find(Stone).at(7).prop('color')).to.equal('blue');
    expect(wrapper.find('div').at(3).find('span').at(4).text()).to.equal('& Heart of Fire');
    expect(wrapper.find('div').at(3).find('span').at(5).text()).to.equal('& Heart of Fire');
  });
});
