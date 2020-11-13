const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const connection = process.env.MONGO_LINK || "mongodb://localhost:27017/domchanski";
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => client.db(database));

  app.set('mongoClient', mongoClient);
};
