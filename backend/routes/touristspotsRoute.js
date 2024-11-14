import express from 'express';
import { Attractioninformation } from '../models/tourists.js';
const router = express.Router();


router.get('/', async (request, response) => {
  try {
    const acco = await Attractioninformation.find({});

    return response.status(200).json(acco);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;