const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(express.json({ limit: '50mb' }));
app.use(cors())
app.get('/', (req, res) => {
    res.send('Try')
})

const userRoutes = require('./routes/user.router')
const listingsUploadRoutes = require('./routes/listingsUpload.router')
const userprofileRoutes = require('./routes/userprofile.router')
const ListingsUpload = require('./models/listingsUpload.model')
const adoptercatpreferences = require('./routes/adoptercatpreferences.router')
const adopterdogpreferences = require('./routes/adopterdogpreferences.router')
const dogpetinformation = require('./routes/dogpetinformation.router')
const catpetinformation = require('./routes/catpetinformation.router')
const interactionRoute = require('./routes/interaction.route')
const adoptionapplication = require('./routes/adoptionapplication.router')
const questionnaire = require('./routes/questionnaire.router')

// Assuming the User model is in './models/user.model'
const User = require('./models/user.model');
const DogPetInformation = require('./models/dogpetinformation.model');
const CatPetInformation = require('./models/catpetinformation.model');
const AdoptionApplication = require('./models/adoptionapplication.model');

app.use('/users', userRoutes)


mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected successfully")
})

app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);

})

