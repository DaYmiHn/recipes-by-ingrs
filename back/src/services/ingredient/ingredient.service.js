// Initializes the `ingredient` service on path `/ingredient`
const { Ingredient } = require('./ingredient.class');
const hooks = require('./ingredient.hooks');
const search = require('feathers-mongodb-fuzzy-search')



module.exports = function (app) {
  const options = {
    events: [ 'getRecipes' ],
    paginate: app.get('paginate'),
    whitelist: ['$regex', '$text', '$search']
  };
  app.hooks({
    before: {
      all: [
        search(), // full text search on text indexes
        search({  // regex search on given fields
          fields: ['title']
        })
      ]
    } 
  })
  // Initialize our service with any options it requires
  app.use('/ingredient', new Ingredient(options, app));
  

  // Get our initialized service so that we can register hooks
  const service = app.service('ingredient');
  
  
  
  service.hooks(hooks);
};
