var mongoose = require('mongoose');
import { Interval, Task, User, ActivityLog } from "./Model"
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!")
});

var daily = new Interval({ name: 'daily' });
var litter = new Task({
    name: 'litter',
    description: "clean litter",
    points: 5,
    interval: daily._id
});

var arturo = new User({
    name: 'arturo',
    points: 100
});

var anna = new User({
    name: 'anna',
    points: 2
});

var cleanlitter = new ActivityLog({
    action: 'complete',
    task: litter,
    timestamp: Date.now(),
    user: arturo
});

// arturo.save(() => { })
// anna.save(() => { })


// litter.save(function (err, task) {
//     if (err) return console.error(err);
//     task.log()
// });

// cleanlitter.save()
// daily.save()

Task.find({ name: litter }, function (err, task) {
    if (err) return console.error(err);
});

module.exports = { User, Task, Interval, ActivityLog };