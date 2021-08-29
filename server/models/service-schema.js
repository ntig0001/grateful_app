const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let service_schema = new Schema({
  act: {
    type: String
  },
  location: {
    type: String
  },
  individual: {
    type: String
  }
}, {
  collection: 'services'
})

module.exports = mongoose.model('services', service_schema)