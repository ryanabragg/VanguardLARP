const errors = require('feathers-errors');
const { checkContext, getByDot, unless, setNow, validateSchema } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { associateCurrentUser, restrictToOwner } = require('feathers-authentication-hooks');
const Ajv = require('ajv');

const schema = require('./characters.schema.json');
const patchSchema = Object.assign({}, schema, {required: []});

const hasPermission = () => {
  const permissions = Array.from(arguments) || [];
  return hook => {
    checkContext(hook, 'before');
    if(!hook.params.provider)
      return true;
    if(!getByDot(hook, 'params.user.permissions'))
      return false;
    if(!permissions.some(p => hook.params.user.permissions.includes(p)))
      return false;
    return true;
  }
}

const restrict = [
  authenticate('jwt'),
  unless(
    hasPermission('logistics', 'admin'),
    restrictToOwner({
      idField: '_id',
      ownerField: '_player'
    })
  )
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

module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [ ...createInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
    update: [ ...updateInfo, validateSchema(schema, Ajv, { coerceTypes: true }) ],
    patch: [ ...updateInfo, validateSchema(patchSchema, Ajv, { coerceTypes: true }) ],
    remove: []
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
