import { expect } from 'chai';
import Ajv from 'ajv';

import app from '../../src/server';

import metaschema from '../metaschema.json';
import schema from '../../src/services/rules/rules.schema.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(metaschema);

describe('\'rules\' service', () => {
  it('registered the service', () => {
    const service = app.service('rules');

    expect(service).to.exist;
  });

  it('has a schema that passes the meta-schema test', () => {
    var valid = validate(schema);
    expect(valid).to.be.true;
  });
});
