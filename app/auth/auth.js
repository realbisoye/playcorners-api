'use strict';

var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var User = require('../models/user.model');
var config = require('../../configs/config')

module.exports = {

	//login a user
	login:  function(req, res) {
	  User.findOne({
	      username: req.body.username
	    })
    .select('username password')
    .then(function(user) {
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid Username or Password!'
        });
      } else {
        var validatePassword = user.verifyPassword(req.body.password);
        if (!validPassword) {
          return res.status(401).send({
            success: false,
            message: 'Invalid Username or Password!'
          });
        } else {
          var token = jwt.sign(user, config.jwtSecret, {
            expiresInMinutes: 1440
          });
          res.send({
            success: true,
            message: 'Login Successful',
            token: token,
            user: user
          });
        }
      }
    })
    .catch(function(err){
    	res.status(500)
    	.send({
    		success: false,
    		message: 'Internal Server Error',
    		error: err
    	});
    });
	},
	
	//logout a user by destroying user session.
	logout: function(req, res) {
		req.session.destroy(function(){
			res.status(200)
			.send({
				success: true,
				message: 'You are logged out.'
			})
		})
	},

	//authenticate user requests
	authenticate: function(req, res, next) {
  var token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Authentication failed.'
        });
      } else {

        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Authentication error'
    });
  }
}

};