const ListingsUpload = require('../models/userprofile.model');


exports.createListingUpload = (req, res) => {
    const { title, description, userId,specifyyearsofexperience, specifydurationifapplicable, living,
        dailyschedule, experiencelevel, financialconsiderations, activityLevel, allergies, commitment, familycomposition,
        trainingcapability, personalpreferences, futureplans, emotionalsupport, availabilityforadoption, legalrestrictions, adoptionapplication, interviewanddiscussion,
        livingsituationzssessment, petownershiphistory, workscheduleandtimecommitment, financialstability, expectationsandpreferences, references, 
        education, homevisits, compatibilityassessment} = req.body;

    const newListing = new ListingsUpload({
        title, 
        description, 
        userId,
        specifyyearsofexperience, 
        specifydurationifapplicable,
        living,
        dailyschedule, 
        experiencelevel, 
        financialconsiderations, 
        activityLevel, 
        allergies, 
        commitment, 
        familycomposition,
        trainingcapability, 
        personalpreferences, 
        futureplans, 
        emotionalsupport, 
        availabilityforadoption, 
        legalrestrictions, 
        adoptionapplication, 
        interviewanddiscussion,
        livingsituationzssessment, 
        petownershiphistory, 
        workscheduleandtimecommitment, 
        financialstability, expectationsandpreferences, 
        references, 
        education, 
        homevisits, 
        compatibilityassessment,
        // image,
    });



    
    newListing.save()
        .then(listing => {
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


