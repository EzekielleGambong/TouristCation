const ListingsUpload = require('../models/adoptionapplication.model');
    
exports.createListingUpload = async (req, res) => {
        const {
            userId,
            adoptionDateApplication,
            nameAdoptionApplication,
            ageAdoptionApplication,
            socMedAdoptionApplication,
            occupationAdoptionApplication,
            addressAdoptionApplication,
            phoneAdoptionApplication,
            emailAdoptionApplication,
            maritalStatusAdoptionApplication,
            alternateContactNameAdoptionApplication,
            relationshipAdoptionApplication,
            alternateContactPhoneAdoptionApplication,
            propmtedAdoptionApplication,
            petKindAdoptionApplication,
            adoptedBeforeAdoptionApplication,
            petNameAdoptionApplication,
            adoptingForAdoptionApplication
        } = req.body;

        const newListing = new ListingsUpload({
            userId,
            adoptionDateApplication,
            nameAdoptionApplication,
            ageAdoptionApplication,
            socMedAdoptionApplication,
            occupationAdoptionApplication,
            addressAdoptionApplication,
            phoneAdoptionApplication,
            emailAdoptionApplication,
            maritalStatusAdoptionApplication,
            alternateContactNameAdoptionApplication,
            relationshipAdoptionApplication,
            alternateContactPhoneAdoptionApplication,
            propmtedAdoptionApplication,
            petKindAdoptionApplication,
            adoptedBeforeAdoptionApplication,
            petNameAdoptionApplication,
            adoptingForAdoptionApplication
        });

        const savedListing = await newListing.save();

        // Assuming pet_preference_id is related to the newly created listing
        await fetch(`http://localhost:5000/dog/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pet_preference_id: savedListing._id })
        });

        res.status(201).json({ message: "Listing uploaded successfully", listing: savedListing });
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
