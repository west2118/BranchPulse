import express from "express";
import { getProductivityData } from "../controllers/productivity.controller.js";

const router = express.Router();

router.get("/productivity", getProductivityData);

export default router;
