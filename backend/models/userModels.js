import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: { type: String, required: false },
  region: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  zip: { type: Number, required: false },
  phonenumber: { type: Number, required: false },
  photo: { type: String }, 
  typeOfAttractions: { type: String, required: false },
  category: { type: String, required: false },
  travelStylePrediction: { type: String, required: false },
  average_price_range: { type: Number, required: false },
  ambiance: { type: String, required: false },
  popularity: { type: String, required: false },
  foodPrediction: { type: String, required: false },
  storeTypePreference: { type: String, required: false },
  country: { type: String, required: false },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
