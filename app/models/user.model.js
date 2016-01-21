'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: 'please provide a username'
	},

	password: {
		type: String,
		required: 'please provide a password',
		minlength: 6
	},

	email: {
		type: String,
		unique: true,
		required: 'please provide an email address'
	},

	avatar: {
		type: String,
	}

});


//encrypt user password
userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {

      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
//compare provided password
userSchema.methods.verifyPassword = function(password) {
  var user = this;
  return bcrypt.compare(user.password, hash)
};

module.exports = mongoose.model('User', userSchema);