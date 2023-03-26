//express/cors/mongoose/jwt/dotenv/cookie parser
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';//does async await-for you
//import mongoose from 'mongoose';
import cors, {CorsOptions} from 'cors';
import cookieParser from 'cookie-parser';
//db
import connectDB from './db/connect';

//middleware
import notFound from './middleware/notFound';

//controllers
import userController from './controllers/userController';
import service from './routes/service'
import { authMiddleWare } from './middleware/isAuth';

const app = express();
dotenv.config();
// middlewaregit

app.use(cookieParser());
app.use(cors());
app.use(express.json())//call express.json for data
app.use(authMiddleWare)

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

const PORT = process.env.PORT || 3003
  
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
