//express/cors/mongoose/jwt/dotenv/cookie parser
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors, {CorsOptions} from 'cors';
import cookieParser from 'cookie-parser';

//controllers
import userController from './controllers/userController';
import service from './routes/service'
import { authMiddleWare } from './middleware/isAuth';

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/learn';//connects to local database
const db = mongoose.connection;
dotenv.config();
// middlewaregit

app.use(cookieParser());

let whitelist = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: whitelist
};


app.use(cors());
const PORT = process.env.PORT || 3003
// const MONGODB_URI = process.env.MONGODB_URI//to connect to atlas

// mongoose.connect(MONGODB_URI!);//to connect to atlas

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


app.use(express.json())//call express.json for data
app.use(authMiddleWare)

app.get('/', (req, res) => {
  res.send('this is the back')
})

//service
app.use('/api/v1/service',service);
// app.use('/postdata', dataController)
// app.use('/users',userController)


mongoose.connect(MONGODB_URI, () => {
  console.log(('connected with mongod'));//to connect to local database
  
})
  
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
