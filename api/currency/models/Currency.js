import { Schema, model } from 'mongoose';

const Currency = new Schema({
  name: { type: String, unique: true, required: true },
  image: { type: String },
  values: [{ time: String, amount: String }],
});
export default model('Currency', Currency);
