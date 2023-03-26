import mongoose from 'mongoose';

const connectDB = (MONGODB_URI: any) => {
    const db = mongoose.connection;
    db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
    db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
    db.on('disconnected', () => console.log('mongo disconnected'));
    mongoose.connect(MONGODB_URI, () => {
        console.log(('connected with mongod'));//to connect to local database
    })
    return mongoose.connect(MONGODB_URI);
}

export default connectDB;