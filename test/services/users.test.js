import { expect } from 'chai';
import Ajv from 'ajv';

import app from '../../src/server';

import metaschema from '../metaschema.json';
import schema from '../../src/services/users/users.schema.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(metaschema);

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    expect(service).to.exist;
  });

  it('has a schema that passes the meta-schema test', () => {
    var valid = validate(schema);
    expect(valid).to.be.true;
  });
});
