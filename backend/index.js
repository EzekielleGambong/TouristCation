import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import accRoute from "./routes/accommodationRoute.js"
import spotsRoute from "./routes/touristspotsRoute.js"
const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());
app.use('/accommodation', accRoute);
app.use('/touristspots', spotsRoute);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Success');
  });


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });