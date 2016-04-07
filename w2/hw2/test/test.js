// mocha tests

// These tests fail when placed in three separate test files:
//    Error: Trying to open unclosed connection.

var mongoose = require('mongoose');
var assert = require('assert');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

//-----------------------------------------------------------------------------

var Dishes = require('../models/dishes');

describe('Dishes', function () {

  // before(function (done) {
  //   mongoose.connect(url);
  //   done();
  // });

  // after(function (done) {
  //   mongoose.connection.close();
  //   done();
  // });

  beforeEach(function (done) {
    Dishes.remove({}, done);
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

//-----------------------------------------------------------------------------

var Promotions = require('../models/promotions');

describe('Promotions', function () {

  // before(function (done) {
  //   mongoose.connect(url);
  //   done();
  // });

  // after(function (done) {
  //   mongoose.connection.close();
  //   done();
  // });

  beforeEach(function (done) {
    Promotions.remove({}, done);
  });

  describe('#create', function () {
    it('should create a new document', function (done) {
      var promotion = {
        'name': 'Weekend Grand Buffet',
        'image': 'images/buffet.png',
        'label': 'New',
        'price': '19.99',
        'description': 'Featuring . . .'
      };

      Promotions.create(promotion, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, promotion.name);
        assert.equal(res.image, promotion.image);
        assert.equal(res.label, promotion.label);
        assert.equal(res.price, promotion.price.replace(/[^0-9]/g, ''));
        assert.equal(res.description, promotion.description);

        done();
      });
    });

    it('should allow a label to be undefined', function (done) {
      var promotion = {
        'name': 'Weekend Grand Buffet',
        'image': 'images/buffet.png',
        'price': '19.99',
        'description': 'Featuring . . .'
      };

      Promotions.create(promotion, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, promotion.name);
        assert.equal(res.image, promotion.image);
        assert.equal(res.label, '');
        assert.equal(res.price, promotion.price.replace(/[^0-9]/g, ''));
        assert.equal(res.description, promotion.description);

        done();
      });
    });

    it('should allow currency symbols and commas in the price', function (done) {
      var promotion = {
        'name': 'Weekend Grand Buffet',
        'image': 'images/buffet.png',
        'price': '€19,999.99',
        'description': 'Featuring . . .'
      };

      Promotions.create(promotion, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, promotion.name);
        assert.equal(res.image, promotion.image);
        assert.equal(res.price, promotion.price.replace(/[^0-9]/g, ''));
        assert.equal(res.description, promotion.description);

        done();
      });
    });

    it('should fail if any required fields are missing', function (done) {
      Promotions.create({}, function (err) {

        assert.equal(err.errors.name.name, 'ValidatorError');
        assert.equal(err.errors.image.name, 'ValidatorError');
        assert.equal(err.errors.price.name, 'ValidatorError');
        assert.equal(err.errors.description.name, 'ValidatorError');

        done();
      });
    });

  });
});

//-----------------------------------------------------------------------------

var Leaders = require('../models/leadership');

describe('Leaders', function () {

  // before(function (done) {
  //   mongoose.connect(url);
  //   done();
  // });

  // after(function (done) {
  //   mongoose.connection.close();
  //   done();
  // });

  beforeEach(function (done) {
    Leaders.remove({}, done);
  });

  describe('#create', function () {
    it('should create a new document', function (done) {
      var leader = {
        'name': 'Peter Pan',
        'image': 'images/alberto.png',
        'designation': 'Chief Epicurious Officer',
        'abbr': 'CEO',
        'description': 'Our CEO, Peter, . . .'
      };

      Leaders.create(leader, function (err, res) {
        if (err) throw err;

        assert.equal(res.name, leader.name);
        assert.equal(res.image, leader.image);
        assert.equal(res.designation, leader.designation);
        assert.equal(res.abbr, leader.abbr);
        assert.equal(res.description, leader.description);

        done();
      });
    });

    it('should fail if any required fields are missing', function (done) {
      Leaders.create({}, function (err) {

        assert.equal(err.errors.name.name, 'ValidatorError');
        assert.equal(err.errors.image.name, 'ValidatorError');
        assert.equal(err.errors.designation.name, 'ValidatorError');
        assert.equal(err.errors.abbr.name, 'ValidatorError');
        assert.equal(err.errors.description.name, 'ValidatorError');

        done();
      });
    });

  });
});
