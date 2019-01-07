const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let file = new Schema({
  file_name: {
    type: String
  },
  file_path: {
    type: String
  }
},{
    collection: 'files'
});

module.exports = mongoose.model('file', file);
