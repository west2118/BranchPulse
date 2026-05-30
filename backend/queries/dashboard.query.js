export const summaryQuery = `
    SELECT 
      (SELECT COUNT(*) FROM branches)::int AS "totalBranches",

      (
        SELECT COALESCE(SUM(total_amount), 0) 
        FROM transactions
        WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
      )::int AS "totalSales",

      (SELECT COALESCE(SUM(stock), 0) FROM branch_inventory)::int AS "totalStocks"
  `;

export const topPerformingQuery = `
    SELECT
        b.branch_name AS name,
        COALESCE(SUM(t.total_amount), 0)::int AS value
    FROM branches b
    LEFT JOIN transactions t
        ON t.branch_id = b.id
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY b.id, b.branch_name
    ORDER BY SUM(t.total_amount) DESC NULLS LAST
    LIMIT 1
`;

export const needsImprovementQuery = `
    SELECT
        b.branch_name AS name,
        COALESCE(SUM(t.total_amount), 0)::int AS value
    FROM branches b
    LEFT JOIN transactions t
        ON t.branch_id = b.id
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY b.id, b.branch_name
    ORDER BY SUM(t.total_amount) ASC NULLS FIRST
    LIMIT 1
`;

export const monthlySalesOverviewQuery = `
    SELECT
        TO_CHAR(months.month, 'Mon') AS "name",
        COALESCE(SUM(t.total_amount), 0)::int AS "value"
    FROM (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ) months
    LEFT JOIN transactions t
        ON DATE_TRUNC('month', t.created_at) = months.month
    GROUP BY months.month
    ORDER BY months.month
`;

export const inventoryDistributionQuery = `
    SELECT 
        p.category AS name,
        COALESCE(SUM(bi.stock), 0)::int AS value
    FROM products p
    LEFT JOIN branch_inventory bi ON bi.product_id = p.id
    GROUP BY p.category
    ORDER BY value DESC
`;

export const branchPerformanceQuery = `
    SELECT 
        b.branch_name AS name,
        COALESCE(SUM(t.total_amount), 0)::int AS value
    FROM branches b
    LEFT JOIN transactions t ON t.branch_id = b.id
    WHERE t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY b.id, b.branch_name
    ORDER BY value DESC
`;

export const employeeProductivityOverviewQuery = `
    SELECT
        b.branch_name AS name,

        COUNT(DISTINCT u.id)::int AS "employees",

        ROUND(
            COALESCE(SUM(t.total_amount), 0)
            / NULLIF(COUNT(DISTINCT u.id), 0)
        )::int AS "salesPerEmployee",

        ROUND(
            COUNT(t.id)::numeric
            / NULLIF(COUNT(DISTINCT u.id), 0),
            0
        )::int AS "ticketsPerEmployee"

    FROM branches b

    LEFT JOIN users u
        ON u.branch_id = b.id

    LEFT JOIN transactions t
        ON t.branch_id = b.id
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'

    GROUP BY b.id, b.branch_name

    ORDER BY "salesPerEmployee" DESC
`;
