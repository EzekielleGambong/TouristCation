const express = require('express')
const { postDogPreference, postCatPreference } = require('../controllers/interaction.controller')
const router = express.Router()

router.post('/dog-preference', postDogPreference)
router.post('/cat-preference', postCatPreference)

module.exports = router