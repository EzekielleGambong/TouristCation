const mongoose = require('mongoose');

const questionnaire = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    childrenInHouse: String,
    otherPets: String,
    petsPast: String,
    liveWith: String,
    responsibility: String,
    financialResponsible: String,
    lookAfterPet: String,
    hoursLeftAlone: String,
    familySupport: String,
    familiarize: String,
    buildingType: String,
    fencedYard: String,
    dogYardTime: String,
    dogTrain: String,
    dogManagement: String,
    catOut: String,
    catLitterbox: String,
    catOdor: String,
    catManagement: String,
    firstInterviewNotes: String,
    secondInterviewNotes: String,


});

module.exports = mongoose.model('questionnaire', questionnaire);