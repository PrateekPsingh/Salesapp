import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // User who created this customer
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const customer = mongoose.model("Customer", CustomerSchema);
export default customer;
