const mongoose = require('mongoose');

const userprofile = new mongoose.Schema({
    
    title : String,
    description : String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    specifyyearsofexperience : String,
    specifydurationifapplicable : String,
    
    living : String,
    dailyschedule : String,
    experiencelevel : String,
    financialconsiderations : String,
    activityLevel : String,
    allergies : String,
    commitment : String,
    familycomposition : String,
    trainingcapability : String,
    caringforspecialneeds : String,
    personalpreferences : String,
    futureplans : String,
    emotionalsupport : String,
    availabilityforadoption : String,
    legalrestrictions : String,
    adoptionapplication : String,
    interviewanddiscussion : String,
    livingsituationzssessment : String,
    petownershiphistory : String,
    workscheduleandtimecommitment : String,
    financialstability : String,
    expectationsandpreferences : String,
    references : String,
    education : String,
    homevisits : String,
    compatibilityassessment : String,


    // image: {
    //     type: String,
    //     required: true // Change this validation as per your requirement
    // },
    
   

    
});

module.exports = mongoose.model('userprofiles', userprofile);
