import express from "express";
import { createCustomer } from "../controllers/customerController.js";
import authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCustomer);

export default router;
