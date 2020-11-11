const { authenticate } = require('@feathersjs/authentication').hooks;


const createdAt = require('../../hooks/created-at');


const updatedAt = require('../../hooks/updated-at');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createdAt()],
    update: [updatedAt()],
    patch: [],
    remove: []
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


