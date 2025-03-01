import Order from "../models/Order.js";
import SKU from "../models/SKU.js"
import Customer from "../models/Customer.js"
import {io} from "../../server.js"
import User from "../models/User.js"

// Helper function to generate order ID
async function generateOrderId() {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  
  if (!lastOrder) {
    return 'OD-1';
  }

  const lastNumber = parseInt(lastOrder.order_id.split('-')[1]);
  return `OD-${lastNumber + 1}`;
}

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { customer_id, sku_id, quantity, rate } = req.body;

    if (!customer_id || !sku_id || !quantity || !rate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the customer and SKU combination is unique for the user
    const existingOrder = await Order.findOne({ customer: customer_id, sku: sku_id, createdBy: req.user.id });
    if (existingOrder) {
      return res.status(400).json({ message: "An order with this customer and SKU already exists for this user" });
    }

    const order_id = await generateOrderId();
    
    // Fetch the SKU to get the tax_rate
    const skuDetails = await SKU.findById(sku_id);
    if (!skuDetails || skuDetails.tax_rate < 0 || skuDetails.tax_rate >= 100) {
      return res.status(400).json({ message: "Invalid SKU or tax rate" });
    }

    const total_amount = quantity * rate * (1 + skuDetails.tax_rate / 100);

    const newOrder = await Order.create({
      order_id,
      customer: customer_id,
      sku: sku_id,
      quantity,
      rate,
      total_amount,
      createdBy: req.user.id
    });

    // Create customer detail variable
    const customerData = await Customer.findById(customer_id);

    // Prepare the notification payload
    const user = await User.findById(req.user.id); // Fetch the user details using the user ID from the request
    const notification = {
        message: "New order placed",
        order_id: newOrder.order_id,
        user: user.username,
        customer: customerData.name,
        sku: skuDetails.sku_name, // Assuming skuDetails has a sku_name field
        total_amount: newOrder.total_amount,
        timestamp: newOrder.createdAt
         // Include the username in the notification
    };
  
      // Emit the notification to all connected clients
      io.emit("new_order", notification);

    res.status(201).json({
      order_id: newOrder.order_id,
      customer: customerData.name,
      sku: skuDetails.sku_name, // Assuming skuDetails has a sku_name field
      total_amount: newOrder.total_amount,
      timestamp: newOrder.createdAt
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Orders (for all users - admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate(['customer', 'sku'])
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User's Orders (for specific user)
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user.id })
      .populate(['customer', 'sku'])
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};