const ListingsUpload = require('../models/dogpetinformation.model');


exports.createListingUpload = (req, res) => {
    const {
        nameofpet,
        image,
        petgender,
        userId,
        secondarycolorpet,
        coatpatternpet,
        weightofthepet,
        furtypepet,
        petclaw,
        sociabilitypet,
        sociabilitypetcanines,
        disabilitypet,
        energylevelpet,
        groomreqpet,
        physicalactivitypet,
        protectivepet,
        stageage,
        dominantcolorpet,
        thirdprimarycolorpet,
        heightofpet,
        lengthfurpet,
        pettraining,
        vaccinepet,
        sociabilitypetchildren,
        sociabilitypetfelines,
        characteristicspet,
        socializationreqpet,
        cognitivepet,
        levelaffection,
        likes,rating3,rating2,rating1, } = req.body;

    const newListing = new ListingsUpload({
        nameofpet,
        image,
        userId,
        petgender,
        secondarycolorpet,
        coatpatternpet,
        weightofthepet,
        furtypepet,
        petclaw,
        sociabilitypet,
        sociabilitypetcanines,
        disabilitypet,
        energylevelpet,
        groomreqpet,
        physicalactivitypet,
        protectivepet,
        stageage,
        dominantcolorpet,
        thirdprimarycolorpet,
        heightofpet,
        lengthfurpet,
        pettraining,
        vaccinepet,
        sociabilitypetchildren,
        sociabilitypetfelines,
        characteristicspet,
        socializationreqpet,
        cognitivepet,
        levelaffection,
        likes,rating3,rating2,rating1,
    });

    newListing.save()
        .then(async(listing) => {
            try {
                await fetch(`http://localhost:5000/dog`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pet_id: listing._id })
                }) 
            } catch (error) {
                console.log(error)
            }
            res.status(201).json({ message: "Listing uploaded successfully", listing });
        })
        .catch(err => {
            res.status(400).json({ message: "Error uploading listing", error: err.message });
        });
};


exports.getListingUploadById = (req, res) => {
    const listingId = req.params.listingId;

    ListingsUpload.findById(listingId)
        .then(listing => {
            if (!listing) {
                return res.status(404).json({ message: "Listing not found" });
            }
            res.status(200).json({ listing });
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching listing", error: err.message });
        });
};

exports.updateLikes = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID:', id); // Check the ID received in the backend
    
    try {
        const listing = await ListingsUpload.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        console.log('Updated Listing:', listing); // Check the updated listing object
        res.status(200).json({ success: true, listing });
    } catch (error) {
        console.error('Error updating likes:', error);
        res.status(500).json({ success: false, error: 'Failed to update likes' });
    }
};

exports.updateRating = async (req, res) => {
    const { id, ratingType } = req.params;
    console.log(`Received ID for ${ratingType}:`, id); // Check the ID received in the backend
    
    try {
        const listing = await ListingsUpload.findByIdAndUpdate(
            id,
            { $inc: { [ratingType]: 1 } },
            { new: true }
        );
        console.log(`Updated Listing for ${ratingType}:`, listing); // Check the updated listing object
        res.status(200).json({ success: true, listing });
    } catch (error) {
        console.error(`Error updating ${ratingType}:`, error);
        res.status(500).json({ success: false, error: `Failed to update ${ratingType}` });
    }
};
// exports.updateRating5 = async (req, res) => {
//     const { id } = req.params;
//     console.log('Received ID export:', id); // Check the ID received in the backend
    
//     try {
//         const listing = await ListingsUpload.findByIdAndUpdate(
//             id,
//             { $inc: { rating5: 1 } },
//             { new: true }
//         );
//         console.log('Updated Listing:', listing); // Check the updated listing object
//         res.status(200).json({ success: true, listing });
//     } catch (error) {
//         console.error('Error updating rating5 export:', error);
//         res.status(500).json({ success: false, error: 'Failed to update rating5' });
//     }
// };
// exports.updateRating4 = async (req, res) => {
//     const { id } = req.params;
//     console.log('Received ID export:', id); // Check the ID received in the backend
    
//     try {
//         const listing = await ListingsUpload.findByIdAndUpdate(
//             id,
//             { $inc: { rating4: 1 } },
//             { new: true }
//         );
//         console.log('Updated Listing:', listing); // Check the updated listing object
//         res.status(200).json({ success: true, listing });
//     } catch (error) {
//         console.error('Error updating rating4 export:', error);
//         res.status(500).json({ success: false, error: 'Failed to update rating4' });
//     }
// };
// exports.updateRating3 = async (req, res) => {
//     const { id } = req.params;
//     console.log('Received ID export:', id); // Check the ID received in the backend
    
//     try {
//         const listing = await ListingsUpload.findByIdAndUpdate(
//             id,
//             { $inc: { rating3: 1 } },
//             { new: true }
//         );
//         console.log('Updated Listing:', listing); // Check the updated listing object
//         res.status(200).json({ success: true, listing });
//     } catch (error) {
//         console.error('Error updating rating3 export:', error);
//         res.status(500).json({ success: false, error: 'Failed to update rating3' });
//     }
// };