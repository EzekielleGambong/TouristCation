const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(

    {
        image:String
    },
    {
        collection:"ImageDetails",
    }
);

module.exports = mongoose.model('ImageDetails', userSchema)