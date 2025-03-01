import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import skuRoutes from "./src/routes/skuRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js"

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON parsing in requests

// Routes
app.get('/',(req,res) => {
   res.send("Hello"); }
)
app.use("/api/auth", authRoutes); 
app.use("/api/sku", skuRoutes);
app.use("/api/customer", customerRoutes);  // All auth routes are prefixed with /api/auth
  // All auth routes are prefixed with /api/auth
 // All auth routes are prefixed with /api/auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
