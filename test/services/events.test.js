const assert = require('assert');
const app = require('../../src/server');

describe('\'events\' service', () => {
  it('registered the service', () => {
    const service = app.service('events');

    assert.ok(service, 'Registered the service');
  });
});
