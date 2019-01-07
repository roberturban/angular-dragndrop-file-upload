const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var file = new Schema({
  file_name: {
    type: String
  },
  file_path: {
    type: String
  },
  file_size: {
    type: Number
  }
},{
    collection: 'files'
});

module.exports = mongoose.model('file', file);
