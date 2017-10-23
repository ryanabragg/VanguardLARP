import { expect } from 'chai';
import Ajv from 'ajv';

import metaschema from './metaschema.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(metaschema);

describe('meta-schema', () => {
  it('passes its own test', () => {
    var valid = validate(metaschema);
    expect(valid).to.be.true;
  });
});
