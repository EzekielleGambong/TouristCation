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
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
