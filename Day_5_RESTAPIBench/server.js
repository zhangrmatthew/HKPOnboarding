const express = require('express');
const server = express();
const mongoose = require('mongoose');
const usersRouter = require('./Routes/users');
const itemsRouter = require('./Routes/items');
require('dotenv/config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//when does this middleware know it should be called, and where is this stuff stored
//ie how does the middleware cycle work?
//middleware are functions that have access to req and res, i guess can directly modify, or use use?
//middleware affect the req and res objects in app res-req cucle:
//Each app.use(middleware) is called every time a request is sent to the server.
//here express.json is the middleware
//we can also custom make our middleware by making a function that interacts with req and res objects
//wonder how the middleware cycle ends, and in what order are they called
//wondering about cycle of an express app
//https://medium.com/@selvaganesh93/how-node-js-middleware-works-d8e02a936113
server.use(express.json());
//the above function populates request object with an object containing parsed data, ie req.body

//set up routes
//guessing the usersRouter passes in the correct callpack function?
//how does this work under the hood? looks for correct function w/in usersRouter?
server.use('/users', usersRouter);
server.use('/items', itemsRouter);


// connect to DB, does it matter what order we do this in?
mongoose.connect(process.env.DB_CONNECTION,
  () => console.log('connected to DB'));
//Port we listen to
server.listen(3000);


/*
middleware stuff:
https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use#:~:text=use(bodyParser)%20.&text=use%20is%20a%20method%20to,that%20Express%20is%20based%20upon.&text=The%20middleware%20functions%20that%20were,the%20list%20of%20middleware%20functions.
https://expressjs.com/en/guide/using-middleware.html

*/
