const ListingsUpload = require('../models/questionnaire.model');

exports.createListingUpload = async (req, res) => {
    const {
        userId, // Include userId in the request body
        childrenInHouse,
        otherPets,
        petsPast,
        liveWith,
        responsibility,
        financialResponsible,
        lookAfterPet,
        hoursLeftAlone,
        familySupport,
        familiarize,
        buildingType,
        fencedYard,
        dogYardTime,
        dogTrain,
        dogManagement,
        catOut,
        catLitterbox,
        catOdor,
        catManagement,
        firstInterviewNotes,
        secondInterviewNotes
    } = req.body;

    const newListing = new ListingsUpload({
        userId, // Include userId in the request body
        childrenInHouse,
        otherPets,
        petsPast,
        liveWith,
        responsibility,
        financialResponsible,
        lookAfterPet,
        hoursLeftAlone,
        familySupport,
        familiarize,
        buildingType,
        fencedYard,
        dogYardTime,
        dogTrain,
        dogManagement,
        catOut,
        catLitterbox,
        catOdor,
        catManagement,
        firstInterviewNotes,
        secondInterviewNotes,
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
