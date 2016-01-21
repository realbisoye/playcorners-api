'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
	title: {
		type: String,
		required: 'please provide a username'
	},

	details: {
		type: String,
	},

	venue: {
		type: mongoose.Schema.Types.ObjectId,
	  ref: 'Venue'
	},
	
	date: {
		type: Date,
		required: 'please provide the event dates'
	}

});


module.exports = mongoose.model('Event', eventSchema);