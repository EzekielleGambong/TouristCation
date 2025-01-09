import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import accRoute from "./routes/accommodationRoute.js"
import spotsRoute from "./routes/touristspotsRoute.js"
import userRoutes from './routes/userRoute.js';
import savedLocationRoutes from './routes/savedLocationRoute.js';

const app = express();
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
// app.use(cors());
app.use('/accommodation', accRoute);
app.use('/touristspots', spotsRoute);
app.use('/users', userRoutes);
app.use('/savedLocations', savedLocationRoutes);
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