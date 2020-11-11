// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const axios = require('axios');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    return axios.get('https://dog.ceo/api/breed/shiba/images/random')
    .then(function (response) {
      console.log(response.data.message);
      context.data.avatar = response.data.message;
      return context;
    })
    
    
  };
};
