import { Schema, model } from 'mongoose';

const Value = new Schema({
  time: { type: String },
  amount: { type: String },
});
export default model('Value', Value);
