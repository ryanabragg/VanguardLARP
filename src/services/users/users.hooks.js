const { when, discard, validateSchema } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const Ajv = require('ajv');

const schema = require('./users.schema.json');

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['admin'],
    fieldName: 'permissions',
    idField: '_id',
    ownerField: '_id',
    owner: true
  })
];

const initRoles = () => context => {
  context.data.permissions = [];
  return context;
};

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword(), initRoles(), validateSchema(schema, Ajv, { coerceTypes: true }) ],
    update: [ ...restrict, hashPassword(), validateSchema(schema, Ajv, { coerceTypes: true }) ],
    patch: [ ...restrict, hashPassword(), validateSchema(schema, Ajv, { coerceTypes: true }) ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('password'),
        discard('permissions')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
