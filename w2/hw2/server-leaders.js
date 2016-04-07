var mongoose = require('mongoose');

var Leaders = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

// #on and #once are inherited from the nodejs EventEmitter class.
// See: https://nodejs.org/api/events.html#events_emitter_on_eventname_listener

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

  test('Creating leader');

  Leaders.create({
      'name': 'Peter Pan',
      'image': 'images/alberto.png',
      'designation': 'Chief Epicurious Officer',
      'abbr': 'CEO',
      'description': 'Our CEO, Peter, . . .'
    })
    .then(function (leader) {
      console.log(leader);

      test('Updating description');
      var id = leader._id;

      return Leaders.findByIdAndUpdate(id, {
        $set: {
          description: '********* NEW DESCRIPTION **********'
        }
      }, {
        new: true
      });
    })
    .then(function (leader) {
      console.log(leader);

      test('Saving document');

      return leader.save();
    })
    .then(function (leader) {
      console.log(leader);

      test('All OK!');

      db.collection('leaders').drop(function () {
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
