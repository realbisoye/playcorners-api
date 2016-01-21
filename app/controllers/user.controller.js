'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var User = require('../models/user.model');

var cloudinary =require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

});

module.exports = {

  register: function(req, res) {

     //save venue with picture if picture was provided. 
    if (req.file) {
      
      var data = req.body;

      if (!data.username) {
        res.status(401)
          .send({
            success: false,
            message: 'Invalid user details provided'
          });
      } else if (!data.email) {
        res.status(401)
          .send({
            status: false,
            message: 'Invalid user details provided'
          });
      } else if (!data.password) {
        res.status(401)
          .send({
            status: false,
            message: 'Invalid user details provided'
          });    
      } else {
        // Get temp file path 
        var imageFile = req.file.path;

        //upload file to the cloudinary web-server
        cloudinary.uploader.upload(imageFile, function(response) {

          // save all event data
          var newUser = new User(data);
          newUser.avatar = response.url;
          User.save()
          .then(function(user) {

            res.status(200)
            .send({
              status: true,
              message: 'account created successfully',
              user: user,
            });
          })
          .catch(function(err) {
            res.status(401)
            .send({
              success: false,
              error: err,
              message: 'error saving your details, kindly try again'
            });
          })
        }, {
            use_filename: true
          });
      } 
    } else {
      
      //save data if no venue picture was provided 
      var data = req.body;

      if (!data.username) {
        res.status(401)
          .send({
            success: false,
            message: 'Invalid user details provided'
          });
      } else if (!data.email) {
        res.status(401)
          .send({
            status: false,
            message: 'Invalid user details provided'
          });
      } else if (!data.password) {
        res.status(401)
          .send({
            status: false,
            message: 'Invalid user details provided'
          });
      } else {
        var newUser = new User(data);
        User.save()
        .then(function(user) {

          res.status(200)
          .send({
            status: true,
            message: 'account created successfully',
            user: user,
          });
        })
        .catch(function(err) {
          res.status(401)
          .send({
            success: false,
            error: err,
            message: 'error saving your details, kindly try again'
          });
        })
      }
    };  
  },

  getUser: function(req, res){
    User.findById(req.params.id)
    .then(function(user){
      res.status(200)
      .send(user);
    })
    .catch(function(err){
      res.status(401)
      .send({
        success: false,
        message: 'Error, kindly try again',
        error: err
      });
    });
  },

  updateProfile: function(req, res) {
    User.findByIdAndUpdate(req.params.id)
    .then(function(user){
      res.status(200)
        .send({
          status: true,
          message: 'your details updated'
        });
    })
    .catch(function(err){
      res.status(401)
        .send({
          success: false,
          error: err,
          message: 'updating your details, kindly try again'
        });
      })
  },

  deleteAccount: function(req, res) {

    User.findById(req.params.id)
    .remove()
    .then(function(user){
      res.status(200)
        .send({
          status: true,
          message: 'account deleted successfully'
        });
    })
    .catch(function(err){
      res.status(401)
        .send({
          success: false,
          error: err,
          message: 'error deleting your account, kindly try again'
        });
      })
  }
}