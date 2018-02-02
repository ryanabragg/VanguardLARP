const { setNow, validateSchema } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { associateCurrentUser, restrictToRoles } = require('feathers-authentication-hooks');
const Ajv = require('ajv');

const schema = require('./characters.schema.json');
const patchSchema = Object.assign({}, schema, {required: []});

const restrict = [
  restrictToRoles({
    roles: ['character-edit', 'logistics', 'admin'],
    fieldName: 'permissions',
    idField: '_id',
    ownerField: '_player',
    owner: true
  })
];

const createInfo = [
  associateCurrentUser({idField: '_id', as: '_player'}),
  associateCurrentUser({idField: '_id', as: '_createdBy'}),
  associateCurrentUser({idField: '_id', as: '_modifiedBy'}),
  setNow('_createdAt', '_modifiedAt')
];

const updateInfo = [
  associateCurrentUser({idField: '_id', as: '_modifiedBy'}),
  setNow('_modifiedAt')
];

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [ ...restrict ],
    create: [ ...createInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
    update: [ ...restrict, ...updateInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
    patch: [ ...restrict, ...updateInfo, validateSchema(patchSchema, Ajv, { coerceTypes: true }) ],
    remove: [ ...restrict ]
  },

  after: {
    all: [],
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
