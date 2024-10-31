const CatInteractionModel = require("../models/catInteractionModel")
const DogInteractionModel = require("../models/dogInteractionModel")

const postDogPreference = async (req, res) => {
    try {
        const {
            userId,
            petId,
            type
        } = req.body
        let interactionId = null
        const dogInteractionDB = await DogInteractionModel.findOne({ userId, petId })
        interactionId = dogInteractionDB?._id
        if (!dogInteractionDB) {
            const dogInteractionDB = await new DogInteractionModel({ userId, petId, type }).save()
            interactionId = dogInteractionDB._id
        }
        return res.status(200).send({ success: true, message: 'Interaction added.' })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: error.message })
    }
}

const postCatPreference = async (req, res) => {
    try {
        const {
            userId,
            petId,
            type
        } = req.body
        let interactionId = null
        const catInteractionDB = await CatInteractionModel.findOne({ userId, petId })
        interactionId = catInteractionDB?._id
        if (!catInteractionDB) {
            const catInteractionDB = await new CatInteractionModel({ userId, petId, type }).save()
            interactionId = catInteractionDB._id
        }
        return res.status(200).send({ success: true, message: 'Interaction added.' })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: error.message })
    }
}

module.exports = {
    postDogPreference,
    postCatPreference
}