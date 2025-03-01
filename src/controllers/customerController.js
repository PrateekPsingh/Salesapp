import Customer from "../models/Customer.js";

// @desc Create a new customer
// @route POST /api/customers
// @access Private (Authenticated Users Only)
export const createCustomer = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and Address are required" });
    }

    const newCustomer = new Customer({
      name,
      address,
      createdBy: req.user.id // Attach the logged-in user ID
    });

    await newCustomer.save();
    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
