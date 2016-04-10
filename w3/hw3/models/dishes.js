var mongoose = require('mongoose');

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '',
    required: false
  },
  price: {
    type: Currency,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
