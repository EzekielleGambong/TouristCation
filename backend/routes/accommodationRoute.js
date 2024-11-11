import express from 'express';
import { Accommodationinformation } from '../models/accommodationModels.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newAcco = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const acco = await Accommodationinformation.create(newAcco);

    return response.status(201).send(acco);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/', async (request, response) => {
  try {
    const acco = await Accommodationinformation.find({});

    return response.status(200).json({
      count: acco.length,
      data: acco,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Accommodationinformation.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Accommodationinformation.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Accommodationinformation.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;