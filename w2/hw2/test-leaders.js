var mongoose = require('mongoose');
var assert = require('assert');

var Leaders = require('../models/leadership');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

describe('Leaders', function () {

  beforeEach(function (done) {
    Leaders.remove({}, done);
  });

  after(function (done) {
    mongoose.connection.close();
    done();
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
