var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!")
});

var intervalSchema = new mongoose.Schema({
    name: String
})


var taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    points: Number,
    interval: { type: mongoose.Schema.Types.ObjectId, ref: 'Interval' }

});

taskSchema.methods.log = function () {
    var log = `My task is ${this.name} which requires
    ${this.description}, is worth ${this.points} points and must be completed every
    ${this.interval}`
}


var userSchema = new mongoose.Schema({
    name: String,
    points: Number
})

var activityLogSchema = new mongoose.Schema({
    action: String,
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    timestamp: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})


var Interval = mongoose.model('Interval', intervalSchema);
var Task = mongoose.model('Task', taskSchema);
var User = mongoose.model('User', userSchema);
var ActivityLog = mongoose.model("ActivityLog", activityLogSchema)





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

module.exports = { User,Task,Interval,ActivityLog };