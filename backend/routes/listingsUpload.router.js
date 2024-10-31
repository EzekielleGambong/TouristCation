const express = require('express');
const router = express.Router();
const listingsUploadController = require('../controllers/listingsUpload.controller');
const ListingsUpload = require('../models/listingsUpload.model');
// Route to create a new listing/upload
router.post('/create', listingsUploadController.createListingUpload);

// Route to get a listing/upload by ID
router.get('/:listingId', listingsUploadController.getListingUploadById);

router.get('/', async (req, res) => {
    try {
        const listings = await ListingsUpload.find();
        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching listings', error: error.message });
    }
});

router.put('/listings/:id/likes', listingsUploadController.updateLikes);

// Refactored route for updating ratings
router.put('/listings/:id/:ratingType', listingsUploadController.updateRating);
// router.put(`/listings/:id/rating5`, listingsUploadController.updateRating5);
// router.put(`/listings/:id/rating4`, listingsUploadController.updateRating4);
// router.put(`/listings/:id/rating3`, listingsUploadController.updateRating3);
// router.put(`/listings/:id/rating2`, listingsUploadController.updateRating2);
// router.put(`/listings/:id/rating1`, listingsUploadController.updateRating1);



module.exports = router;


