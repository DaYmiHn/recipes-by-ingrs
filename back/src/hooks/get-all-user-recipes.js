// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
      if(context.params.query.func == 'getAllRecipe'){
        const { result } = context;
        const { Model } = context.app.service('recipe')

        result = await Model.aggregate([
          { $match: { 'ingredients': { $in: ["мука", "молоко", "яйца куриные","малина", "яблоки", "сахар"] } } },
          { $unwind: '$ingredients' },
          { $group: {
            _id: '$_id',
            title: { $first: '$title' },
            ingredients: { $push: '$ingredients' },
            url: { $first: '$url' },
            order: {
            $sum:
              { $cond: [
                { $or:  [ '$ingredients', ["мука", "молоко" , "яйца куриные", "малина", "яблоки", "сахар"] ] },
                1,
                0
              ]}
            }
          }},
          { $sort: { order: 1 } }
        ]);

        context.result = result;
        
        return context;


      }
      // console.log(context.result)
      
      
  };
};
