const express = require('express');
const router = express.Router();
const listingsUploadController = require('../controllers/adoptionapplication.controller');
const ListingsUpload = require('../models/adoptionapplication.model');

// Route to create a new listing/upload
router.post('/create', listingsUploadController.createListingUpload);

// Route to get a listing/upload by ID
router.get('/:listingId', listingsUploadController.getListingUploadById);

// Add more routes as needed, such as update and delete routes
router.get('/', async (req, res) => {
    try {
        const listings = await ListingsUpload.find();
        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listings', error: error.message });
    }
});

module.exports = router;
