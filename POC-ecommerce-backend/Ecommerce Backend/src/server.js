'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();
let port = process.env.PORT || 3000;

const routes = require('./routes/api.route');



mongoose.connect(process.env.DB_URL).then((data)=>{
    console.log("DB Connected Successfully !");
}).catch((error)=>{
    console.log("Something Wrong in DB Connection!",error);
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/v1", routes)

app.use('/images/', express.static(path.join(__dirname, '../') +'/uploads'));



app.listen(port,()=>{
    console.log(`Server Listining On port : ${port}`)
});