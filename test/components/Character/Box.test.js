import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Box from '../../../src/components/Character/Box';

describe('<Box />', () => {
  it('renders a label and children', () => {
    const wrapper = shallow(<Box label='boxed'><span>testing</span></Box>);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').prop('className')).to.equal('floating');
    expect(wrapper.find('label').text()).to.equal('boxed');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('testing');
  });
});
