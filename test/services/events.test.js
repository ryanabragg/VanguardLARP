import { expect } from 'chai';

import app from '../../src/server';

describe('\'events\' service', () => {
  it('registered the service', () => {
    const service = app.service('events');

    expect(service).to.exist;
  });
});
