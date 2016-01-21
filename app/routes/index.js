'use strict';

var userRoutes = require('./user.route');
var eventRoutes = require('./event.route');
var venueRoutes = require('./venue.route');

function routes(router) {
  userRoutes(router);
  eventRoutes(router);
  venueRoutes(router);
}

module.exports = routes;