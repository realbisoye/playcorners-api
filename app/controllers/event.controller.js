'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var Event = require('../models/event.model');

module.exports = {

	addEvent: function(req, res) {
	
    if (req.file){

    }
		var data = req.body;

		if (!data.title) {
			res.status(401)
				.send({
					success: false,
					message: 'Invalid event description provided'
				});
		} else if (!data.details) {
			res.status(401)
				.send({
					status: false,
					message: 'Invalid event description provided'
				});
		} else if (!data.venue) {
      res.status(401)
        .send({
          status: false,
          message: 'Invalid event description provided'
        });
    } else {

			var newEvent = new Event(data)
      newEvent.venue = data.venue._id 
			
      newEvent.save()
			.then(function(val) {

				res.status(200)
				.send({
					status: true,
					message: 'event added',
          details: val
				});
			})
			.catch(function(err) {
				res.status(401)
				.send({
					success: false,
					error: err,
					message: 'error saving the event, kindly try again'
				});
			})
		}
	},

  getAllEvents: function(req, res){
    Event.find()
    .then(function(events){
      res.status(200)
      .send(events)
    })
    .catch(function(err){
      res.status(401)
      .send({
        success: false,
        message: 'error fetching events',
        error: err
      });
    });
  },

  getAnEvent: function(req, res){
    Event.findById(req.params.id)
    .then(function(evnt){
      res.status(200)
      .send(evnt);
    })
    .catch(function(err){
      res.status(401)
      .send({
        success: false,
        message: 'error fetching this event, kindly try again',
        error: err
      });
    });
  },

	updateEvent: function(req, res) {
		Event.findByIdAndUpdate(req.params.id)
		.then(function(evnt){
			res.status(200)
				.send({
					status: true,
					message: 'event updated'
				});
		})
		.catch(function(err){
			res.status(401)
				.send({
					success: false,
					error: err,
					message: 'error updating the event, kindly try again'
				});
			})
	},

	removeEvent: function(req, res) {

		Event.findById(req.params.id)
		.remove()
		.then(function(evnt){
			res.status(200)
				.send({
					status: true,
					message: 'event removed'
				});
		})
		.catch(function(err){
			res.status(401)
				.send({
					success: false,
					error: err,
					message: 'error deleting the event, kindly try again'
				});
			})
	}
}