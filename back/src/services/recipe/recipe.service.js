// Initializes the `recipe` service on path `/recipe`
const { Recipe } = require('./recipe.class');
const hooks = require('./recipe.hooks');
const db = require('../../mongodb');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recipe', new Recipe(options, app));

  app.get('/getAllRecipes/:user', async (req, res) => {
    // console.log(req.params)
    let ingrs = await app.service('users').find({query: {
      email: req.params.user
    }
    });
    ingrs = ingrs.data[0].ingredients;
    // console.log(ingrs)
    let cond_or_query = [];
    ingrs.forEach(element => {
      // console.log(element)
      cond_or_query.push({ "$eq": [ "$ingredients", element ] })
    });
    // console.log(ingrs)
    // console.log(cond_or_query)
    const query= [
      { "$match": { "ingredients": { "$in": ingrs } } },
      { "$unwind": "$ingredients" },
      { "$group": {
        "_id": "$_id",
        "title": { "$first": "$title" },
        "url": { "$first": "$url" },
        "ingredients": { "$push": "$ingredients" },
        "order": {
          "$sum": { 
            "$cond": [{
              "$or": cond_or_query
            },
            1,
            0
          ]}
        },
        "size": {"$sum":1}
      }},
      // { "$match": { "size" :  {"$gt" : 4, "$lt": 8}} },
      { "$match": { "size" :  {"$gt" : 4 }} },
      { "$addFields": { "match": {  "$subtract": ["$size", "$order"] } } },

      { "$sort": { "size":1, "match":1} }
    ];
    // console.log(JSON.stringify(query))
    await app.service('recipe').Model.aggregate(query).limit(100).toArray().then((recipes)=> {
      // console.log(recipes)
      // res.send( recipes.sort(() => Math.random() - 0.5) ) 
      res.send( recipes ) 
    }).catch((err)=>console.log(err))
      
    
  	// res.send('Hello from custom route');
  });
  // Get our initialized service so that we can register hooks
  const service = app.service('recipe');

  service.hooks(hooks);
};
