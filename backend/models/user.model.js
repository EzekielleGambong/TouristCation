const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    typeofuser : String,
    firstname : String,
    // lastname : String,
    email: {
        type: String,
        required: true,
        unique: true
      },
    password : String,
    role : {
        type : String,
        enum :['admin', 'user'],
        default : 'user'
    },
    // birthdate : Date,
    address: String,
    // occupation: String,
    // stats: String,
    cpassword: String,
    phone: Number,
    image: {
        data: Buffer,
        contentType: String,
      },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String }
})

module.exports = mongoose.model('users', userSchema)