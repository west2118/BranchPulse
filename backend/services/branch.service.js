import pool from "../config/db.js";

export const getBranchOptionsService = async () => {
  const result = await pool.query(`
    SELECT
      id,
      branch_name AS "branchName"
    FROM branches
    ORDER BY branch_name ASC
  `);

  return result.rows;
};

export const getBranchesService = async (
  client,
  { page = 1, limit = 10, search, status, region },
) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];
  let idx = 1;

  /* -------------------- SEARCH -------------------- */
  if (search) {
    conditions.push(`
      (
        b.branch_name ILIKE $${idx}
        OR b.branch_code ILIKE $${idx}
        OR b.location ILIKE $${idx}
        OR b.region ILIKE $${idx}
        OR u.name ILIKE $${idx}
      )
    `);

    values.push(`%${search}%`);
    idx++;
  }

  /* -------------------- STATUS FILTER -------------------- */
  if (status) {
    conditions.push(`b.status = $${idx}`);
    values.push(status);
    idx++;
  }

  /* -------------------- REGION FILTER -------------------- */
  if (region) {
    conditions.push(`b.region = $${idx}`);
    values.push(region);
    idx++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const branchesQuery = `
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

    ${whereClause}

    ORDER BY "totalSales" DESC

    LIMIT $${idx}
    OFFSET $${idx + 1}
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM branches b
    LEFT JOIN users u
      ON u.id = b.manager_id
    ${whereClause}
  `;

  const [branchesResult, countResult] = await Promise.all([
    client.query(branchesQuery, [...values, limit, offset]),
    client.query(countQuery, values),
  ]);

  const total = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(total / limit);

  return {
    branches: branchesResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const getBranchesSummaryStatsService = async () => {
  const summaryResult = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM branches)::int AS "totalBranches",
      (SELECT COALESCE(SUM(total_amount), 0) FROM transactions)::int AS "totalSales",
      (SELECT COALESCE(SUM(stock), 0) FROM branch_inventory)::int AS "totalStocks"
  `);

  return summaryResult.rows[0];
};

export const getBranchesChartsService = async (client) => {
  const salesQuery = `
    SELECT
      b.branch_name AS name,
      COALESCE(SUM(t.total_amount), 0)::int AS value
    FROM branches b
    LEFT JOIN transactions t ON t.branch_id = b.id
    GROUP BY b.id, b.branch_name
    ORDER BY value DESC;
  `;

  const stocksQuery = `
    SELECT
      b.region AS name,
      COALESCE(SUM(bi.stock), 0)::int AS value
    FROM branches b
    LEFT JOIN branch_inventory bi ON bi.branch_id = b.id
    GROUP BY b.region
    ORDER BY value DESC;
  `;

  const [salesResult, stocksResult] = await Promise.all([
    client.query(salesQuery),
    client.query(stocksQuery),
  ]);

  return {
    salesDistribution: salesResult.rows,
    stockDistribution: stocksResult.rows,
  };
};
