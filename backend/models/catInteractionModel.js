const mongoose = require('mongoose')


const CatInteractionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catpetinformations',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
})

const CatInteractionModel = mongoose.model('catInteraction', CatInteractionSchema)
module.exports = CatInteractionModel