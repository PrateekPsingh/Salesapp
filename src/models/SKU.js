import mongoose from "mongoose";

const SkuSchema = new mongoose.Schema({
  sku_name: { type: String, required: true, trim: true },
  unit_of_measurement: { type: String, required: true },
  tax_rate: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  createdAt: { type: Date, default: Date.now }
});

const sku = mongoose.model("SKU", SkuSchema);
export default sku;
