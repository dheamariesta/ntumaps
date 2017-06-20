import mongoose from 'mongoose';

const pathSchema = new mongoose.Schema({
  start: String,
  end: String,
  route: [{}]
}, { timestamps: true });


const Path = mongoose.model('Path', pathSchema);
module.exports = Path;
