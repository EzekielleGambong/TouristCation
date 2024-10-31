const express = require('express');
const router = express.Router();
const listingsUploadController = require('../controllers/userprofile.controller');

// Route to create a new listing/upload
router.post('/create', listingsUploadController.createListingUpload);

// Route to get a listing/upload by ID
// router.get('/:listingId', listingsUploadController.getListingUploadById);

// Add more routes as needed, such as update and delete routes

module.exports = router;


