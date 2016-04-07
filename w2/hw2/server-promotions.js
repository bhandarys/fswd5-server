var mongoose = require('mongoose');

var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

// #on and #once are inherited from the nodejs EventEmitter class.
// See: https://nodejs.org/api/events.html#events_emitter_on_eventname_listener

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

  test('Creating promotion');

  Promotions.create({
      'name': 'Weekend Grand Buffet',
      'image': 'images/buffet.png',
      'price': '19.99',
      'description': 'Featuring . . .'
    })
    .then(function (promotion) {
      console.log(promotion);

      test('Updating label');
      var id = promotion._id;

      return Promotions.findByIdAndUpdate(id, {
        $set: {
          label: '********* NEW LABEL **********'
        }
      }, {
        new: true
      });
    })
    .then(function (promotion) {
      console.log(promotion);

      test('Saving document');

      return promotion.save();
    })
    .then(function (promotion) {
      console.log(promotion);

      test('All OK!');

      db.collection('promotions').drop(function () {
        db.close();
      });
    })
    .catch(function (err) {
      db.close();
      console.log('\n************** Something went horribly wrong!');
      console.log(err.errmsg);
    });
});

function test(description) {
  console.log('\n-------------------- ' + description);
}
