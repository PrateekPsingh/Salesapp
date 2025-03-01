import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // Import createServer from http
import { Server } from "socket.io"; // Import Server from socket.io
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import skuRoutes from "./src/routes/skuRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON parsing in requests

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/auth", authRoutes);
app.use("/api/sku", skuRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/orders", orderRoutes);

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update in production)
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Export Socket.IO instance for use in other files
export { io };

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});