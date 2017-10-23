// Initializes the `characters` service on path `/characters`
const createService = require('feathers-nedb');
const createModel = require('../../models/characters.model');
const hooks = require('./characters.hooks');
const filters = require('./characters.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'characters',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/characters', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('characters');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
