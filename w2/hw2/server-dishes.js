var mongoose = require('mongoose');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

// #on and #once are inherited from the nodejs EventEmitter class.
// See: https://nodejs.org/api/events.html#events_emitter_on_eventname_listener

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

  test('Creating dish');

  Dishes.create({
      'name': 'Uthapizza',
      'image': 'images/uthapizza.png',
      'category': 'mains',
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
    })
    .then(function (dish) {
      console.log(dish);

      test('Updating dish description');
      var id = dish._id;

      return Dishes.findByIdAndUpdate(id, {
        $set: {
          description: '********* NEW DESCRIPTION **********'
        }
      }, {
        new: true
      });
    })
    .then(function (dish) {
      console.log(dish);

      test('Updating label');
      var id = dish._id;

      return Dishes.findByIdAndUpdate(id, {
        $set: {
          label: '********* NEW LABEL **********'
        }
      }, {
        new: true
      });
    })
    .then(function (dish) {
      console.log(dish);

      test('Saving document');

      return dish.save();
    })
    .then(function (dish) {
      console.log(dish);

      test('All OK!');

      db.collection('dishes').drop(function () {
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
