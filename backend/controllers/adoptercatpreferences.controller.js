const ListingsUpload = require('../models/adoptercatpreferences.model');


exports.createListingUpload = (req, res) => {
    const {
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
        levelaffection } = req.body;

    const newListing = new ListingsUpload({
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
    });

    newListing.save()
        .then(async (listing) => {
            try {
                await fetch(`http://localhost:5000/cat/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pet_preference_id: listing._id })
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


// exports.getListingUploadById = (req, res) => {
//     const listingId = req.params.listingId;

//     ListingsUpload.findById(listingId)
//         .then(listing => {
//             if (!listing) {
//                 return res.status(404).json({ message: "Listing not found" });
//             }
//             res.status(200).json({ listing });
//         })
//         .catch(err => {
//             res.status(500).json({ message: "Error fetching listing", error: err.message });
//         });
// };