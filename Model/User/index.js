import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    points: Number
})

const User = mongoose.model('User', userSchema);

export default User