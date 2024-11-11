import mongoose from 'mongoose';

const accoSchema = mongoose.Schema(
  {
    Name_of_Establishments: {
      type: String,
      required: true,
    },
    Province: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    AE_Status: {
      type: String,
      required: true,
    },
    AE: {
      type: String,
      required: true,
    },
    Main_Type: {
      type: String,
      required: true,
    },
    Sub_Category: {
      type: String,
      required: true,
    },
    existing_rooms: {
      type: Number,
      required: true,
    },
    Male_Employee_Regular: {
      type: Number,
      required: true,
    },
    Female_Employee_Regular: {
      type: Number,
      required: true,
    },
    Male_Employee_Seasonal: {
      type: Number,
      required: true,
    },
    Female_Employee_Seasonal: {
      type: Number,
      required: true,
    },
    Telephone: {
      type: String,
      required: true,
    },
    Email_Address: {
      type: String,
      required: true,
    },
    DOT: {
      type: String,
      required: true,
    },
    Net: {
      type: String,
      required: true,
    }
  }
);

export const Accommodationinformation = mongoose.model('Accommodationinformation', accoSchema);