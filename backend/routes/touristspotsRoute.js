import express from 'express';
import { Attractioninformation } from '../models/tourists.js';
const router = express.Router();

// router.get('/', async (request, response) => {
//   try {
//     const acco = await Attractioninformation.find({});

//     return response.status(200).json(acco);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

router.get('/', async (request, response) => {
  try {
    
    const {province} = request.query;
    const provinceUpper = province ? province.toUpperCase() : undefined;
    


    const filter = {};
    if (provinceUpper) filter.province = provinceUpper;

    

    const acco = await Attractioninformation.find(filter);

    return response.status(200).json(acco);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get only coordinates and relevant info
router.get('/coordinates', async (req, res) => {
  try {
    const locations = await Attractioninformation.find({}, {
      nameOfAttractions: 1,
      locationCoordinates: 1,
    });

    res.status(200).json(locations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Failed to fetch coordinates' });
  }
});


// Add a new attraction
router.post('/add', async (req, res) => {
  try {
    const newAttraction = new Attractioninformation(req.body);
    await newAttraction.save();
    res.status(201).json({ message: 'Attraction added successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: 'Failed to add attraction.' });
  }
});


export default router;