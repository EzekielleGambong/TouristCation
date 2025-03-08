import express from "express"
// import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import accRoute from "./routes/accommodationRoute.js"
import spotsRoute from "./routes/touristspotsRoute.js"
import userRoutes from './routes/userRoute.js';
import foodRoutes from './routes/foodRoute.js';
import savedLocationRoutes from './routes/savedLocationRoute.js';
import path from "path";
import { fileURLToPath } from "url";
const app = express();

import cors from 'cors';

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
// app.use(cors());


import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.mongoDBURL;
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/accommodation', accRoute);
app.use('/api/touristspots', spotsRoute);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/savedLocations', savedLocationRoutes);
app.get('/api/', (request, response) => {
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