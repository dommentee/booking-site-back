//express/cors/mongoose/jwt/dotenv/cookie parser
import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors, {CorsOptions} from 'cors'
import cookieParser from 'cookie-parser'

//controllers
import dataController from './controllers/postDataController'


// const mongoose = require('mongoose')//for database
// const MONGODB_URI = 'mongodb://localhost:27017/learn'//connects to local database
const db = mongoose.connection;
dotenv.config()
// middlewaregit
const app = express();

app.use(cookieParser())

let whitelist = ['http://localhost:3003']
const corsOptions: CorsOptions = {
  credentials: true,
  origin: whitelist
}
app.use(cors());
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI!);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


app.use(express.json())//call express.json for data
//server landing
// controllers
app.use('/postdata', dataController)
app.get('/', (req, res) => {
  res.send('this is the back')
})


// mongoose.connect(MONGODB_URI, () => {
//   console.log(('connect with mongod'));
  
// })
  
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
