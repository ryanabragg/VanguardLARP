import { expect } from 'chai';

import app from '../../src/server';

describe('\'rules\' service', () => {
  it('registered the service', () => {
    const service = app.service('rules');

    expect(service).to.exist;
  });
});
