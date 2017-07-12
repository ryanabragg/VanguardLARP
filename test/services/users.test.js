import { expect } from 'chai';

import app from '../../src/server';

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    expect(service).to.exist;
  });
});
