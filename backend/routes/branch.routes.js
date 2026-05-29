import express from "express";
import {
  createBranch,
  getBranches,
  getBranchesCharts,
  getBranchesSummaryStats,
  getBranchOptions,
} from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/branches", createBranch);
router.get("/branches", getBranches);
router.get("/branches-stats", getBranchesSummaryStats);
router.get("/branches-charts", getBranchesCharts);
router.get("/branches-options", getBranchOptions);

export default router;
