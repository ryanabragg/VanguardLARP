import { expect } from 'chai';
import Color from 'color';

import { colorOnBackground } from '../../src/util/css-helpers';

describe('colorOnBackground function', () => {
  it('returns an string of css with a hex for the text color', () => {
    const lightBackground = colorOnBackground('white', 0.1, 0.5);
    const darkBackground = colorOnBackground('black', 0.1, 0.5);
    expect(lightBackground).to.equal(Color('black').mix(Color('white'), 0.5).hex());
    expect(darkBackground).to.equal(Color('white').mix(Color('black'), 0.1).hex());
  });
});
