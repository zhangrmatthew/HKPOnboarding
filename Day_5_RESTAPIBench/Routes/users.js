//TODO: nav to diff screen?
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const userModel = require('../Models/usersSchema');
require('dotenv/config');

router.post('/login', function(req, res){
  //req.body should be populated by json middleware in server
  const user = new userModel(req.body);
  userModel.exists({ username: req.body.username, password: req.body.password},
    function(err, result){
      if(err){
        res.send("ErrorType: Account Validation");
      }
      else{
        if (result){
          const token = generateAccessToken({username : req.body.username});
          res.send(token);
        }
        else{
          res.send('ErrorType: Account Does Not Exist');
        }
      }
    });
});

//same logic as before, just nav to diff screen
router.post('/create', function(req,res){
  //req.body should be populated by json middleware in server
  //this is some document instance which you can use to make a new doc to add to collection?
  //otherwise queries can be made on the model itself?
  const user = new userModel(req.body);

  //only checks on username so people can't know others accoutns if try user and pw
  userModel.exists({ username: req.body.username},
    function(err, result){
      if(err){
        res.send("ErrorType: Username Validation");
      }
      else{
        if (result){
          res.send('ErrorType: Duplicate Username');
        }
        else{
          try{
            user.save();
            const token = generateAccessToken({username : req.body.username});
            res.send(token);
          }
          catch(err){
            res.send("ErrorType: Creation");
          }
        }
      }
    });
});

// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(username) {
  // expires after a day (86400 seconds = 1 day )
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}


//export router object to use methods + datafields later
module.exports = router;



/*Notes:

login should check if in database, then return a token if so

create should check if in database, if so then throw error, if not then add to it and still always return a token
*/

/*
Token stuff all credits to: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
*/





/*
reference link: https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas
to save to DB basically (here our schemas are already defined, how to switch between collecitons?)
how do we add to prexisting collection? do we still have to create a new schema?
https://www.reddit.com/r/node/comments/gfrjct/help_how_to_use_mongoose_to_connect_a_preexisting/
-->will creating a new model allow us to append to same database/collection?

how did it know which collection to save the document to?

figure out how save works too in mongoDB
how to handle duplicates in database? unhandled promise rejection error...
the regular try catch block doesnt seem to handle it
*/


/*
unuused
try{
  user.save();
  //standard json to send soemones username always attached to field username?
  const token = generateAccessToken({username : req.body.username});
  res.send(token);
}
catch(err){
  res.send("ErrorType: Login");
}
*/
