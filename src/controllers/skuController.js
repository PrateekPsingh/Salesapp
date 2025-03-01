import SKU from "../models/SKU.js";

// Create SKU
export const createSku = async (req, res) => {
  try {
    const { sku_name, unit_of_measurement, tax_rate } = req.body;
    const userId = req.user.id; // Extracted from token

    const existingSku = await SKU.findOne({ sku_name, createdBy: userId });

    if (existingSku) {
      return res.status(400).json({ message: "SKU with this name already exists for the user" });
    }

    const newSku = await SKU.create({ sku_name, unit_of_measurement, tax_rate, createdBy: userId });

    res.status(201).json(newSku);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All SKUs (Only Created by User)
export const getSkus = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token
    const skus = await SKU.find({ createdBy: userId });

    res.status(200).json(skus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
