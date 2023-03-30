import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';//show routes being hit
import 'express-async-errors';//does async await-for you
//import mongoose from 'mongoose';
import cors, {CorsOptions} from 'cors';
import cookieParser from 'cookie-parser';
//db
import connectDB from './db/connect';

//middleware
import notFound from './middleware/notFound';
import errorHandlerMiddleware from './middleware/error-handler';

//controllers
import authRouter from './routes/authRoute'
import service from './routes/service'
// import { authMiddleWare } from './middleware/isAuth';

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())//call express.json for data
app.use(cookieParser(process.env.JWT_SECRET));

// app.use(authMiddleWare)

let whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: whitelist
};

//database
// connectDB(process.env.MONGODB_URI);atlas
connectDB(process.env.LOCALDB);

app.get('/', (req, res) => {
  res.send('This is the book app')
})
//service
app.use('/api/v1/service',service);
app.use('/api/v1/auth', authRouter);
//middleware
app.use(notFound);//404
app.use(errorHandlerMiddleware);//error handler


const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
