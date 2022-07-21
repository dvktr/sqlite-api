import express from 'express';
import cors from 'cors'
const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

import router from './routes.js'

app.use(cors())

app.use(express.json())
app.use(router);


app.listen(3002, ()=>{console.log("API LIGADA")})