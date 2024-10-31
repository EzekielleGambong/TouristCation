const mongoose = require('mongoose');

const adoptercatpreferences = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true,
    },

    petgender: String,
    secondarycolorpet: String,
    coatpatternpet: String,
    weightofthepet: String,
    furtypepet: String,
    petclaw: String,
    sociabilitypet: String,
    sociabilitypetcanines: String,
    disabilitypet: String,
    energylevelpet: String,
    groomreqpet: String,
    physicalactivitypet: String,
    protectivepet: String,
    stageage: String,
    dominantcolorpet: String,
    thirdprimarycolorpet: String,
    heightofpet: String,
    lengthfurpet: String,
    pettraining: String,
    vaccinepet: String,
    sociabilitypetchildren: String,
    sociabilitypetfelines: String,
    characteristicspet: String,
    socializationreqpet: String,
    cognitivepet: String,
    levelaffection: String,

});

module.exports = mongoose.model('adoptercatpreferences', adoptercatpreferences);