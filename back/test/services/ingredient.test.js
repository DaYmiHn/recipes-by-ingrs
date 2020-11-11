const assert = require('assert');
const app = require('../../src/app');

describe('\'ingredient\' service', () => {
  it('registered the service', () => {
    const service = app.service('ingredient');

    assert.ok(service, 'Registered the service');
  });
});
