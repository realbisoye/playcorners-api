'use strict';

var venueCtrl = require('../controllers/venue.controller');
var auth = require('../auth/auth');

function eventRoutes (router) {
  router.route('/events/:id/venue')
    .post(auth.authenticate, venueCtrl.addVenue);
	
	router.route('/events/:id/venue/:id')
    .put(auth.authenticate, venueCtrl.updateVenue)
    .delete(auth.authenticate, venueCtrl.removeVenue);
}

module.exports = eventRoutes;