const express = require('express');
const router = express.Router();
const listingsUploadController = require('../controllers/catpetinformation.controller');
const ListingsUpload = require('../models/catpetinformation.model');
const { default: mongoose } = require('mongoose');
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

router.get('/recommend/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const result = await fetch(`http://localhost:5000/recommend/cat/${userId}`)
        if (!result.ok) throw new Error('Waiting for your personalized recommendations.')
        const recommendedCatIds = await result.json()
        const parsedIds = recommendedCatIds.map(id => new mongoose.Types.ObjectId(id))
        const listings = await ListingsUpload.aggregate([
            {
                $match: {
                    _id: { $in: parsedIds }
                }
            },
            {
                $addFields: {
                    __order: {
                        $indexOfArray: [parsedIds, '$_id']
                    }
                }
            },
            {
                $sort: { __order: 1 }
            }
        ])

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





