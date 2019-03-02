import mongoose from 'mongoose';

const intervalSchema = new mongoose.Schema({
    name: String
})

const Interval = mongoose.model('Interval', intervalSchema);

export default Interval