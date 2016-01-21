module.exports = {
	
  database: process.env.DB_DEV,
  secret: process.env.SESSION_SECRET,
  cloudinary: process.env.CLOUDINARY_URL,
  jwtSecret: process.env.JWT_SECRET
};
