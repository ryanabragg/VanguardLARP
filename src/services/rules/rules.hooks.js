const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['rules', 'admin'],
    fieldName: 'permissions',
    idField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ ...restrict ],
    update: [ ...restrict ],
    patch: [ ...restrict ],
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
