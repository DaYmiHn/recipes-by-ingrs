const { Service } = require('feathers-mongodb');

exports.Recipe = class Recipe extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('recipe');
    });
  }
};
