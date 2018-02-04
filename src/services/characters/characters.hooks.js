const errors = require('feathers-errors');
const { checkContext, getByDot, setNow, unless, validateSchema } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { associateCurrentUser, queryWithCurrentUser, restrictToRoles } = require('feathers-authentication-hooks');
const Ajv = require('ajv');
const hasPermission = require('../../hooks/has-permission');

const schema = require('./characters.schema.json');
const patchSchema = Object.assign({}, schema, {required: []});

const restrict = [
  restrictToRoles({
    roles: ['logistics', 'admin'],
    fieldName: 'permissions',
    idField: '_id',
    ownerField: '_player',
    owner: true
  })
];

const createInfo = [
  authenticate('jwt'),
  associateCurrentUser({idField: '_id', as: '_player'}),
  associateCurrentUser({idField: '_id', as: '_createdBy'}),
  associateCurrentUser({idField: '_id', as: '_modifiedBy'}),
  setNow('_createdAt', '_modifiedAt')
];

const updateInfo = [
  associateCurrentUser({idField: '_id', as: '_modifiedBy'}),
  setNow('_modifiedAt')
];

const isPlayer = () => hook => {
  checkContext(hook, 'before');
  if(!hook.params.provider)
    return true;
  if(!getByDot(hook, 'params.user._id'))
    throw new errors.Forbidden('Not signed in');
  hook.params.query._player = hook.params.user._id;
  return hook;
}


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      unless(
        hasPermission('logistics', 'admin'),
        isPlayer()
      )
    ],
    get: [ ...restrict ],
    create: [ ...createInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
    update: [ ...updateInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
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
