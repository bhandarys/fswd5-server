var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('../models/dishes');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

describe('Dishes', function () {

  beforeEach(function (done) {
    Dishes.remove({}, done);
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  describe('#create', function () {
    it('should create a new document', function (done) {
      var dish = {
        'name': 'Uthapizza',
        'image': 'images/uthapizza.png',
        'category': 'mains',
        'label': 'Hot',
        'price': '$4.99',
        'description': 'A unique . . .',
        'comments': [{
          'rating': 5,
          'comment': 'Imagine all the eatables, living in conFusion!',
          'author': 'John Lemon'
        }, {
          'rating': 4,
          'comment': 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
          'author': 'Paul McVites'
        }]
      };

      Dishes.create(dish, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, dish.name);
        assert.equal(res.image, dish.image);
        assert.equal(res.category, dish.category);
        assert.equal(res.price, dish.price.replace(/[^0-9]/g, ''));
        assert.equal(res.label, dish.label);
        assert.equal(res.description, dish.description);

        for (var i = 0; i < dish.comments.length; ++i) {
          assert.equal(res.comments[i].rating, dish.comments[i].rating);
          assert.equal(res.comments[i].comment, dish.comments[i].comment);
          assert.equal(res.comments[i].author, dish.comments[i].author);
        }

        done();
      });
    });

    it('should allow a label to be undefined', function (done) {
      var dish = {
        'name': 'Uthapizza',
        'image': 'images/uthapizza.png',
        'category': 'mains',
        'price': '$4.99',
        'description': 'A unique . . .'
      };

      Dishes.create(dish, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, dish.name);
        assert.equal(res.image, dish.image);
        assert.equal(res.category, dish.category);
        assert.equal(res.price, dish.price.replace(/[^0-9]/g, ''));
        assert.equal(res.label, '');
        assert.equal(res.description, dish.description);

        done();
      });
    });

    it('should allow currency symbols and commas in the price', function (done) {
      var dish = {
        'name': 'Uthapizza',
        'image': 'images/uthapizza.png',
        'category': 'mains',
        'price': '$4,999.99',
        'description': 'A unique . . .'
      };

      Dishes.create(dish, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, dish.name);
        assert.equal(res.image, dish.image);
        assert.equal(res.category, dish.category);
        assert.equal(res.price, dish.price.replace(/[^0-9]/g, ''));
        assert.equal(res.description, dish.description);

        done();
      });
    });

    it('should fail if any required fields are missing', function (done) {
      Dishes.create({}, function (err) {

        assert.equal(err.errors.name.name, 'ValidatorError');
        assert.equal(err.errors.image.name, 'ValidatorError');
        assert.equal(err.errors.category.name, 'ValidatorError');
        assert.equal(err.errors.price.name, 'ValidatorError');
        assert.equal(err.errors.description.name, 'ValidatorError');

        done();
      });
    });

  });
});
