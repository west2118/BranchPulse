import express from "express";
import { getInventoryData } from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/inventory", getInventoryData);

export default router;
