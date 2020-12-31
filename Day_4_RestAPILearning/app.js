const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
/*
//Middlewares: fx that exectues when routes are being hit
app.use('/posts', () => {
  console.log('This is a middleware running');
}); //logic that runs when we hit the endpoint


//can use middleware to import routes that are exported on a diff file
*/


//Routes: once we reach this endpoint, we should execute this function
//with two parameters, one representing request the other representing response
app.get('/', (req,res) => {
  res.send('This is our home');
});

app.get('/posts', (req,res) => {
  res.send('This is our posts');
});
// connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true }, () => console.log('connected to DB'));
//Port we listen to
app.listen(3000);
