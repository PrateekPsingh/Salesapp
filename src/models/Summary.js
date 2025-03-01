import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  total_orders: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;