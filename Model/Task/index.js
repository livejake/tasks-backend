import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
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
const Task = mongoose.model('Task', taskSchema);


export default Task