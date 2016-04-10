var mongoose = require('mongoose');

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

var Leader = mongoose.model('Leader', leaderSchema);

module.exports = Leader;
