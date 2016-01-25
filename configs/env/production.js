module.exports = {
	
  database: process.env.MONGOLAB_URI,
  secret: process.env.SESSION_SECRET,
  cloudinary: process.env.CLOUDINARY_URL,
  jwtSecret: process.env.JWT_SECRET
};
