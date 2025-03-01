import express from "express";
import { createSku, getSkus } from "../controllers/skuController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSku);
router.get("/", authMiddleware, getSkus);

export default router;
