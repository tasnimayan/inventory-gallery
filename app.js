
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const router = require('./src/routes/api')


// Create Express App Instance
const app = express();

//    ==========    MIDDLEWARE     ==========

// ==========  Base Static File Provider Path  ========== 
app.use(express.static(path.join(__dirname, './public')));

// ========== Cross Origin Resource Sharing Enable  ==========
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));


// ==========  CORS POLICY  ==========
app.use((req, res, next) => {
	res.setHeader('Content-Security-Policy', 'script-src * ');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// ==========   Database Connection   ==========
mongoose
  .connect(process.env.DATABASE, {autoIndex:false})
  .then(() => console.log('MONGODB connection successful '+"Status:200"))
  .catch(err => console.log(err));

mongoose.connection.on('disconnected', () => {
	console.log("======= Database Disconnected ======");
});

// Front-end Connection to the backend

// app.use(express.static('./client/build'));
// app.get("*", function(req, res){
// 	req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// });


// ==========  ROUTE HANDLERS  ==========
app.use('/api', router);


//  ==========  Invalid Route Handler  ==========
app.all('*', (req, res, next) => {
	const err = new Error(`No route found at ${req.originalUrl}`);
	if (!err.statusCode) err.statusCode = 404;
	next(err);
});

//  ==========  GLOBAL ERROR MIDDLEWARE  ==========
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).send({ message: err.message });
});

module.exports = app;