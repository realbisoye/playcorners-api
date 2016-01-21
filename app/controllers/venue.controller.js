'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var Venue = require('../models/venue.model');

var cloudinary =require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

});

module.exports = {

	addVenue: function(req, res) {

   //save venue with picture if picture was provided. 
    if (req.file) {
      
      var data = req.body;

      if (!data.name) {
        res.status(401)
          .send({
            success: false,
            message: 'Invalid venue details provided'
          });
      } else if (!data.address) {
        res.status(401)
          .send({
            status: false,
            message: 'Invalid venue details provided'
          });
      } else {
        // Get temp file path 
        var imageFile = req.file.path;

        //upload file to the cloudinary web-server
        cloudinary.uploader.upload(imageFile, function(response) {

          // save all event data
          var newVenue = new Venue(data);
          newVenue.image = response.url;
          hairStyle.save()
          .then(function(venue) {

            res.status(200)
            .send({
              status: true,
              message: 'venue added',
              venue: venue,
            });
          })
          .catch(function(err) {
            res.status(401)
            .send({
              success: false,
              error: err,
              message: 'error saving the venue, kindly try again'
            });
          })
        }, {
            use_filename: true
          });
      } 
    } else {
      
      //save data if no venue picture was provided 
    	var data = req.body;

    	if (!data.name) {
    		res.status(401)
    			.send({
    				success: false,
    				message: 'Invalid venue details provided'
    			});
    	} else if (!data.address) {
    		res.status(401)
    			.send({
    				status: false,
    				message: 'Invalid venue details provided'
    			});
    	} else {
    		var venue = new Venue(data)

    		venue.save()
    		.then(function(venue) {

    			res.status(200)
    			.send({
    				status: true,
    				message: 'venue added',
            venue: venue,
    			});
    		})
    		.catch(function(err) {
    			res.status(401)
    			.send({
    				success: false,
    				error: err,
    				message: 'error saving the venue, kindly try again'
    			});
    		})
    	}
    };  
  },

	updateVenue: function(req, res) {
		Venue.findByIdAndUpdate(req.params.id)
		.then(function(venue){
			res.status(200)
				.send({
					status: true,
					message: 'venue updated'
				});
		})
		.catch(function(err){
			res.status(401)
				.send({
					success: false,
					error: err,
					message: 'error updating the venue, kindly try again'
				});
			})
	},

	removeVenue: function(req, res) {

		Venue.findById(req.params.id)
		.remove()
		.then(function(venue){
			res.status(200)
				.send({
					status: true,
					message: 'venue removed'
				});
		})
		.catch(function(err){
			res.status(401)
				.send({
					success: false,
					error: err,
					message: 'error deleting the venue, kindly try again'
				});
			})
	}
}