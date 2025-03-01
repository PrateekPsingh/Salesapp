import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getSummary
} from "../controllers/orderController.js";


const router = express.Router();


// Create new order
router.post("/",authMiddleware, createOrder);

// Get all orders (admin only)
router.get("/",authMiddleware, getAllOrders);

// Get user's orders
router.get("/order",authMiddleware, getUserOrders);

router.get("/summary",authMiddleware, getSummary);


export default router;