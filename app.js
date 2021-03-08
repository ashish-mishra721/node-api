var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(cors())

const port = 3001;
const postRoute = require('./routes/posts');

app.use('/posts', postRoute)

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser())
//Set up default mongoose connection

var mongoDB = process.env.MongoUrl;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//mongoose.connect('');

app.listen(port, () => {
  console.log(`connect:${port}`)
})
module.exports = app;

