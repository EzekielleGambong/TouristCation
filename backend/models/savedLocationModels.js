import mongoose from 'mongoose';

const savedLocationSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const SavedLocation = mongoose.model('SavedLocation', savedLocationSchema);
