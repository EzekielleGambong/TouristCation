import mongoose from 'mongoose';

const itinerarySchema = mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      accommodation: {
        address: String,
        nameOfEstablishments: String,
      },
      noOfTravellers: {
        type: Number,
        required: true,
      },
      stayPeriodFrom: { 
        type: Date, 
        required: true 
      },  
      stayPeriodTo: { 
        type: Date, 
        required: true 
      },  
      touristSpots: [
        {
          nameOfAttractions: { type: String, required: true },
          description: { type: String, required: true },
        }
      ],
      shops: [
        {
          name_of_restaurant: { type: String, required: true },
          description: { type: String, required: true },
          coordination: { type: String, required: true },
        },
      ],
  },
  { timestamps: true }
);

export const Itinerary = mongoose.model('Itinerary', itinerarySchema);
