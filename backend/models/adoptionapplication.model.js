const mongoose = require('mongoose');

const adoptionapplication = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    createdAt: { type: Date, default: Date.now },

    adoptionDateApplication: String,
    nameAdoptionApplication: String,
    ageAdoptionApplication: String,
    socMedAdoptionApplication: String,
    occupationAdoptionApplication: String,
    addressAdoptionApplication: String,
    phoneAdoptionApplication: String,
    emailAdoptionApplication: String,
    maritalStatusAdoptionApplication: String,
    alternateContactNameAdoptionApplication: String,
    relationshipAdoptionApplication: String,
    alternateContactPhoneAdoptionApplication: String,
    propmtedAdoptionApplication: String,
    petKindAdoptionApplication: String,
    adoptedBeforeAdoptionApplication: String,
    petNameAdoptionApplication: String,
    adoptingForAdoptionApplication: String,


});

module.exports = mongoose.model('adoptionapplication', adoptionapplication);