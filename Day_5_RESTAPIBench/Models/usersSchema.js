const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  });

const Users = mongoose.model("users", usersSchema);
module.exports = Users;



/*
how can i just directly append to collection
in database?

so mongoose requires a model to do the mapping
between nodejs and mongodb, but why cant we just
prepend to some existing collection by using that model


how does the connection with the database actually work?
*/
