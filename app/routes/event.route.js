'use strict';

var eventCtrl = require('../controllers/event.controller');
var auth = require('../auth/auth');

function eventRoutes (router) {
  router.route('/events/')
    .get(eventCtrl.getAllEvents)
    .post(auth.authenticate, eventCtrl.addEvent);
	
	router.route('/events/:id')
		.get(eventCtrl.getAnEvent)
    .put(auth.authenticate, eventCtrl.updateEvent)
    .delete(auth.authenticate, eventCtrl.removeEvent);
}

module.exports = eventRoutes;