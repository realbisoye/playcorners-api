'use strict';

var userCtrl = require('../controllers/user.controller');
var auth = require('../auth/auth');

function userRoutes (router) {
	router.route('/users/')
		.post(userCtrl.register);

  router.route('/users/:id')
    .get(auth.authenticate, userCtrl.getUser)
    .put(auth.authenticate, userCtrl.updateProfile)
    .delete(auth.authenticate, userCtrl.deleteAccount);
}

module.exports = userRoutes;