import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Field from '../../../src/components/Admin/Field';

describe('<Field />', () => {
  it('renders a div with props and text', () => {
    const onClick = spy();
    const wrapper = shallow(<Field name='test' />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').prop('name')).to.equal('test');
    expect(wrapper.find('div').prop('className')).to.equal('placeholder');
    expect(wrapper.find('div').text()).to.equal('test');
    wrapper.setProps({name: 'testing', id: 42, text: 'meaning', onClick: onClick});
    expect(wrapper.find('div').prop('name')).to.equal('testing');
    expect(wrapper.find('div').prop('className')).to.equal(undefined);
    expect(wrapper.find('div').prop('id')).to.equal(42);
    expect(wrapper.find('div').text()).to.equal('meaning');
    expect(wrapper.find('div').prop('onClick')).to.equal(onClick);
  });
});
