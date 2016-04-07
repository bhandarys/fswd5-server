var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('../models/promotions');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

describe('Promotions', function () {

  beforeEach(function (done) {
    Promotions.remove({}, done);
  });

  after(function (done) {
    mongoose.connection.close();
    done();
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
