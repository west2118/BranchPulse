import pool from "../config/db.js";
import {
  getBranchesChartsService,
  getBranchesService,
  getBranchesSummaryStatsService,
  getBranchOptionsService,
} from "../services/branch.service.js";

export const createBranch = async (req, res) => {
  const { branchName, branchCode, region, location, status } = req.body;

  try {
    // Validation
    if (!branchName || !branchCode || !location || !region) {
      return res.status(400).json({
        success: false,
        message: "Branch name, branch code, and location are required",
      });
    }

    // Check if branch already exists
    const existingBranch = await pool.query(
      `SELECT * FROM branches 
       WHERE branch_name = $1 OR branch_code = $2`,
      [branchName, branchCode],
    );

    if (existingBranch.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Branch name or branch code already exists",
      });
    }

    // Insert new branch
    const newBranch = await pool.query(
      `INSERT INTO branches 
        (branch_name, branch_code, location, status, region)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [branchName, branchCode, location, status || "active", region],
    );

    return res.status(201).json({
      success: true,
      message: "Branch created successfully",
      branch: newBranch.rows[0],
    });
  } catch (error) {
    console.error("Create branch error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBranches = async (req, res) => {
  const client = await pool.connect();

  try {
    const { page, limit, search, status, region } = req.query;

    const branches = await getBranchesService(client, {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      status,
      region,
    });

    console.log(branches);

    return res.status(200).json(branches);
  } catch (error) {
    console.error("Get Branches Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  } finally {
    client.release();
  }
};

export const getBranchesSummaryStats = async (req, res) => {
  try {
    const summaryStats = await getBranchesSummaryStatsService();

    return res.status(200).json(summaryStats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  }
};

export const getBranchesCharts = async (req, res) => {
  const client = await pool.connect();

  try {
    const charts = await getBranchesChartsService(client);

    return res.status(200).json(charts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  } finally {
    client.release();
  }
};

export const getBranchOptions = async (req, res) => {
  try {
    const branches = await getBranchOptionsService();

    return res.status(200).json(branches);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  }
};
