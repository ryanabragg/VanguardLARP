const { setNow } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { associateCurrentUser, restrictToRoles } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['rules', 'admin'],
    fieldName: 'permissions',
    idField: '_id'
  })
];

const createInfo = [
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
    all: [],
    find: [],
    get: [],
    create: [ ...restrict, ...createInfo ],
    update: [ ...restrict, ...updateInfo ],
    patch: [ ...restrict, ...updateInfo ],
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
