const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const userModel = require('../Models/usersSchema');
require('dotenv/config');

router.post('/login', function(req, res){

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


router.post('/create', function(req,res){

  const user = new userModel(req.body);

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

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '86400s' });
}

module.exports = router;
