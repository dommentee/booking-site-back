import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; //show routes being hit
import "express-async-errors"; //does async await-for you
//import mongoose from 'mongoose';
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
//db
import connectDB from "./db/connect";

//middleware
import notFound from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/error-handler";

//routers
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoutes";
import serviceRouter from "./routes/serviceRoute";

const app = express();
dotenv.config();
app.use(morgan("tiny")); //gets routes info
app.use(express.json()); //call express.json for data
app.use(cookieParser(process.env.JWT_SECRET));

let whitelist = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: whitelist,
};
app.use(cors(corsOptions));

//call connect to start database
connectDB();

app.get("/", (req, res) => {
  res.send("This is the booking app");
});
//set routes app will use
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRouter);
//middleware
app.use(notFound); //404
app.use(errorHandlerMiddleware); //error handler

// const PORT = process.env.PORT || 3003
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`);
});
