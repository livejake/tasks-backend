import mongoose from 'mongoose'
mongoose.connect(`mongodb://${process.env.DB_SERVER}/${process.env.DB_NAME}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!")
});

export default db
