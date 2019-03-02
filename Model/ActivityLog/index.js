import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    action: String,
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    timestamp: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema)
export default ActivityLog