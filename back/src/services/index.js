const users = require('./users/users.service.js');
const ingredient = require('./ingredient/ingredient.service.js');
const recipe = require('./recipe/recipe.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(ingredient);
  app.configure(recipe);
};
