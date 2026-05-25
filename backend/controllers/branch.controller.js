import pool from "../config/db.js";

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
  try {
    const query = `
        WITH sales AS (
            SELECT
                branch_id,
                SUM(total_amount) AS total_sales
            FROM transactions
            WHERE status = 'completed'
                AND payment_status = 'paid'
            GROUP BY branch_id
        ),

         inventory AS (
            SELECT
                branch_id,
                SUM(stock) AS total_inventory
            FROM branch_inventory
            GROUP BY branch_id
        )

        SELECT
            b.id,
            b.manager_id AS "managerId",
            b.region,
            b.branch_name AS "branchName",
            b.branch_code AS "branchCode",
            b.location,
            b.status,
            b.created_at AS "createdAt",

            u.name AS "managerName",
            u.username AS "managerUsername",

            COALESCE(s.total_sales, 0) AS "totalSales",
            COALESCE(i.total_inventory, 0) AS "totalInventory"

        FROM branches b

        LEFT JOIN users u
            ON u.id = b.manager_id

        LEFT JOIN sales s
            ON s.branch_id = b.id

        LEFT JOIN inventory i
            ON i.branch_id = b.id

        ORDER BY b.created_at DESC
    `;

    const { rows: branches } = await pool.query(query);

    return res.status(200).json(branches);
  } catch (error) {
    console.error("Get Branches Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch branches",
    });
  }
};
