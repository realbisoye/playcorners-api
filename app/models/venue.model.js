'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var venueSchema = new Schema({

	name: {
		type: String,
		required: 'please provide the venue name',
	},

	address: {
		type: String,
		required: 'please provide the venue address',
	},

	image: {
	type: String,
}

});

module.exports = mongoose.model('Venue', venueSchema);