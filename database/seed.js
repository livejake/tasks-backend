import { Interval, Task, User, ActivityLog } from "./model"
import mongoose from 'mongoose'
mongoose.connect(`mongodb://${process.env.MONGO_SERVER}/test`);

var daily = new Interval({ name: 'daily' });

var litter = new Task({
    name: 'litter',
    description: "clean litter",
    points: 5,
    interval: daily
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

daily.save(function (err, task) {
    if (err) return console.error(err);
    console.log("Daily saved")
})

litter.save(function (err, task) {
    if (err) return console.error(err);
    task.log()
});

arturo.save(() => {
    if (err) return console.error(err);
    console.log("arturo saved")
})
anna.save(() => {
    if (err) return console.error(err);
    console.log("anna saved")
})
cleanlitter.save(() => {
    if (err) return console.error(err);
    console.log("clean litter saved")
})

console.log("All seeds saved")

// Task.find({ name: litter }, function (err, task) {
//     if (err) return console.error(err);
// });
