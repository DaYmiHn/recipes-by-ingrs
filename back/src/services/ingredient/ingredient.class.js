const { Service } = require('feathers-mongodb');

exports.Ingredient = class Ingredient extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('ingredient');
    });
  }
};
