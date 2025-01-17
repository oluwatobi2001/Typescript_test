import express, {Application, Request, Response, NextFunction} from 'express';
import {json} from 'body-parser'
import  mongoose from 'mongoose';
import cors from "cors";
import {AllRouters} from '../src/routes'
import dotenv from 'dotenv';
const app : Application = express();


const port : Number = 5000;

app.use(json())
app.use(cors());

dotenv.config();
const MongoURL : any = process.env.MONGO_URL;
(async () => {
    try {
        await mongoose.connect( MongoURL, { retryWrites: true, w: 'majority' });
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error initializing application:', error);
    }
})();

app.use("/api", AllRouters)
app.listen(port, ()=> console.log("welcome to portal"));