import express from "express"
// import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import accRoute from "./routes/accommodationRoute.js"
import spotsRoute from "./routes/touristspotsRoute.js"
import userRoutes from './routes/userRoute.js';
import foodRoutes from './routes/foodRoute.js';
import itineraryRoutes from './routes/itineraryRoute.js';
import savedLocationRoutes from './routes/savedLocationRoute.js';
import path from "path";
import { fileURLToPath } from "url";
const app = express();

import cors from 'cors';
const allowedOrigins = [
    "http://localhost:3000",   // For local development
    "http://18.136.142.232",
    "https://www.toursitcation.site",
    "https://toursitcation.site"
];
app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error("CORS not allowed"));
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(express.json());


import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const mongoDBURL = process.env.mongoDBURL;
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/accommodation', accRoute);
app.use('/api/touristspots', spotsRoute);
app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/savedLocations', savedLocationRoutes);
app.get('/api/', (request, response) => {
    console.log(request);
    return response.status(234).send('Success');
  });


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
