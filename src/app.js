import express from 'express';
const app = express();
app.use(express.json());

import router from './routes.js'

app.use(router);

app.listen(3001, ()=>{console.log("API LIGADA")})