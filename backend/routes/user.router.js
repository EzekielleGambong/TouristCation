const express = require('express')

const route = express.Router()

const multer = require('multer');
const userController = require('../controllers/user.controller')

// route.get('/edit', userController.editLoad);
route.put('/update-profile', userController.updateProfile);
route.post('/signup', userController.signup)
route.post('/login', userController.login)
route.post('/logout', (req, res) => {
    res.json({ message: "Logged out successfully" });
});
// router.post("/verify-email", userController.verifyEmail)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Create the 'uploads' directory in your project
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Add this middleware before your routes
  route.use(upload.single('image'));
module.exports = route