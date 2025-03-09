import mongoose from 'mongoose';

const foodSchema = mongoose.Schema(
  {
    establishmentId: {
      type: Number,
      required: true,
    },
    nameOfRestaurant: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    cityMunicipality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    closingHours: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },
    dineIn: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    takeout: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    delivery: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    averagePriceRange: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    contactInformation: {
      type: String, 
      required: true,
    },
    coordination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Food = mongoose.model('Food', foodSchema);
