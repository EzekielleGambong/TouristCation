const mongoose = require('mongoose');

const listingsUploadSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    lifestyle: {
        type: String,
        required: true
    },
    sociability: {
        type: String,
        required: true
    },
    trainability: {
        type: String,
        required: true
    },
    adaptability: {
        type: String,
        required: true
    },
    activityLevel: {
        type: String,
        required: true
    },
    temperament: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    specialNeeds: {
        type: String,
        required: true
    },
    personalpreferences: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    behavior: {
        type: String,
        required: true
    },
    medical: {
        type: String,
        required: true
    },
    special: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true // Change this validation as per your requirement
    },
    likes: {
        type: Number,
        required: true
    },
    rating5: {
        type: Number,
        required: true
    },
    rating4: {
        type: Number,
        required: true
    },
    rating3: {
        type: Number,
        required: true
    },
    rating2: {
        type: Number,
        required: true
    },
    rating1: {
        type: Number,
        required: true
    },

    
});

module.exports = mongoose.model('listingsuploads', listingsUploadSchema);
