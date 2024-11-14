import mongoose from 'mongoose';

const attractionSchema = mongoose.Schema(
  {
    lgu: {
      type: String,
      required: true,
    },
    nameOfAttractions: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: false,
    },
    closingHours: {
      type: String,
      required: false,
    },
    typeOfAttractions: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    locationCoordinates: {
      type: String,
      required: true,
    },
    entranceFee: {
      type: Number,
      required: false,
    },
    additionalFee: {
      type: Number,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  }
);

export const Attractioninformation = mongoose.model('Attractioninformation', attractionSchema);
