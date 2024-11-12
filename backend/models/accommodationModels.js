import mongoose from 'mongoose';

const accoSchema = mongoose.Schema(
  {
    establishmentId: {
      type: String,
      required: true,
    },
    nameOfEstablishment: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    aeStatus: {
      type: String,
      required: false,
    },
    aeType: {
      type: String,
      required: false,
    },
    mainType: {
      type: String,
      required: false,
    },
    subCategory: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
      required: false,
    },
    emailAddress: {
      type: String,
      required: false,
    },
    facebookPage: {
      type: String,
      required: false, 
    },
    room: {
      type: String,
      required: true,
    },
    pax: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    booking: {
      type: String,
      required: false,
    },
    agoda: {
      type: String,
      required: false,
    },
    googleTravel: {
      type: String,
      required: false,
    },
    coordinates: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  }
);

export const Accommodationinformation = mongoose.model('Accommodationinformation', accoSchema);
