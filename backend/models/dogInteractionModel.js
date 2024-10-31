const mongoose = require('mongoose')


const DogInteractionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dogpetinformations',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
})

const DogInteractionModel = mongoose.model('dogInteraction', DogInteractionSchema)
module.exports = DogInteractionModel