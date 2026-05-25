import express from "express";
import { createBranch, getBranches } from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/branches", createBranch);
router.get("/branches", getBranches);

export default router;
