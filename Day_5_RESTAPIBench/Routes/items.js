//TODO: validate token, nav to add item?
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const itemModel = require('../Models/itemsSchema');
require('dotenv/config');

//using put vs post, behind the scenes? theoretically put should be used for update if exists, create if not right?
//this throws some error(cannot set headers after sent to client) when using put...probably because of the update?
router.put('/create', authenticateToken, function(req, res){
  const newItem = new itemModel({username: req.user.username, name: req.body.name
    , quantity: req.body.quantity});
  itemModel.exists({ username: req.user.username, name: req.body.name},
    function(err, result){
      if(err){
        res.send("ErrorType: Item Addition");
      }
      else{
        //why is it we need callbacks in order to interact with mongoose docs
        if (result){
          itemModel.findOneAndUpdate({ username: req.user.username, name: req.body.name},
          {$inc: {quantity: req.body.quantity} }, {new: true},
          function(err,result){
            if (err){
              res.send("ErrorType: Updating");
            }else{
              res.send(result);
            }
          });
        }
        else{
          try{
            /*
            https://stackoverflow.com/questions/33019804/how-does-mongooses-save-callback-work
            The save function's callback will accept three arguments :
            The error
            The document that was saved
            The number of rows affected
            */
            newItem.save(function (err, item){
              res.send(item);
                /* such a format so far: { _id: 5fec6755cf4dfc32a074968e, name: 'Apple', quantity: 15, __v: 0 }
                need i change it?
                */
            });
            //res.send();
          }
          catch(err){
            res.send("ErrorType: Add Item");
          }
        };
      }
  });
});

//not exactly sure, should the array persist somewhere? or is it just everytime
//we want it we call this function?
//need to auth token passed through url...
router.get('/get/:token', authenticateTokenURL, function(req, res){
  var items = [];
  itemModel.exists({ username: req.user.username},
    function(err, result){
      if(err){
        res.send("ErrorType: Cart Validation");
      }
      else{
        if (result){
          itemModel.find({username: req.user.username}, function (err, docs) {
            docs.forEach(function(doc){
                items.push(doc.name);
            });
            res.send(items);
          });
        }
        else{
          res.send('ErrorType: Cart is Empty');
        }
      }
    });
});

//used del instead of post
//figure out how these work under the hood
//stuff generally gets passed to callback in mongoose
router.delete('/remove', authenticateToken, function(req,res){
  itemModel.findByIdAndDelete(req.body._id, function(err, removed){
    if(err){
      res.send("ErrorType: Deletion");
    }
    else{
      console.log(removed);
      res.send(removed);
    }

  });
});

function authenticateToken(req, res, next) {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401) // if there isn't any token
  //callback w/in verify user/decoded gives u the user associated with the token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next(); // pass the execution off to whatever request the client intended, if not executed middleware stack is left
  })
}

function authenticateTokenURL(req, res, next) {
  const token = req.params.token;
  console.log(token);
  if (token == null) return res.sendStatus(401) // if there isn't any token
  //callback w/in verify user/decoded gives u the user associated with the token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next(); // pass the execution off to whatever request the client intended, if not executed middleware stack is left
  })
}
//export router object to use methods + datafields later
module.exports = router;


/*
https://www.npmjs.com/package/jsonwebtoken
*/

/*
itemModel is the collection? and the new instance of itemModel interfaces with collection?
Notes, what should i do if the item exists already? patch?

create --> if exists, patch, if doesn't exist create.


"'item' = {\r \n
    '_id' : item.id \r \n
    'username' : item.username \r \n
    'name' : item.name \r \n
    'quantity' : item.quantity
  }"
*/

/*
things to figure out
1 express cycle
2 how http works and loads and stuff
3 callbacks and promises
*/
