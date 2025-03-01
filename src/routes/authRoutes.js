import express from "express";
import { signup, login } from "../controllers/authController.js"; // Import controller functions

const router = express.Router();

// Define authentication routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
