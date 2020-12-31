const mongoose = require('mongoose');


const itemsSchema = new mongoose.Schema({
  username: String,
  name: String,
  quantity: Number
  });



const Items = mongoose.model("items", itemsSchema);
module.exports = Items;



/*
how can i just directly append to collection
in database?

so mongoose requires a model to do the mapping
between nodejs and mongodb, but why cant we just
prepend to some existing collection by using that model

exporting the actual model? what does this mean
how does the connection with the database actually work?
not sure if/where mongoose returns an object after just puting in database
idea for method:https://stackoverflow.com/questions/36585080/how-to-add-schema-method-in-mongoose
https://stackoverflow.com/questions/14196162/after-saving-an-object-using-mongoose-what-is-the-simplest-way-i-can-return-an
https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose
went with 3rd option to find id.

*/
