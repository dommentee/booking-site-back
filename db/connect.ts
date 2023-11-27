// @ts-nocheck
import mongoose from "mongoose";

const connectDB = () => {
  mongoose.set("strictQuery", false);
  const db = mongoose.connection;
  db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
  db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
  db.on("disconnected", () => console.log("mongo disconnected"));

  //docker
  //const MONGODB_URI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_LOCAL_PORT}/${process.env.MONGODB_DATABASE}`;

  //atlas
  // connectDB(process.env.MONGODB_URI);

  //local DB testing
  const MONGODB_URI = process.env.LOCALDB;

  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected with mongod"); //to connect to local database
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
  return mongoose.connect(MONGODB_URI);
};

export default connectDB;
