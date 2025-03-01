import Customer from "../models/Customer.js";


export const createCustomer = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and Address are required" });
    }

    const existingCustomer = await Customer.findOne({ 
      name, 
      address, 
      createdBy: req.user.id 
    });

    if (existingCustomer) {
      return res.status(400).json({ message: "Customer with this name and address already exists" });
    }

    const newCustomer = new Customer({
      
      name,
      address,
      createdBy: req.user.id
    });

    await newCustomer.save();
    res.status(201).json({ 
      message: "Customer created successfully", 
      customer: newCustomer 
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.id })
      .sort({ createdAt: 1 }); // Changed sorting to createdAt
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};