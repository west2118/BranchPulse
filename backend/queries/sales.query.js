export const salesSummaryQuery = `
    SELECT 
      (
        SELECT COALESCE(SUM(total_amount), 0) 
        FROM transactions
        WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
      )::int AS "totalSales",

      (
        SELECT
            COALESCE(SUM(t.total_amount), 0) /
            NULLIF((SELECT COUNT(*) FROM branches), 0)
        FROM transactions t
        WHERE t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
      ) AS "avgSalesPerBranch",

      (
        SELECT json_build_object(
            'branchName', b.branch_name,
            'sales', SUM(t.total_amount)::int
        )
        FROM transactions t
        JOIN branches b ON b.id = t.branch_id
        WHERE t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY b.id, b.branch_name
        ORDER BY SUM(t.total_amount) DESC
        LIMIT 1
      ) AS "bestPerformingBranch",

      (
        WITH branch_growth AS (
            SELECT
            b.id,
            b.branch_name,

            COALESCE(
                SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
                    THEN t.total_amount
                    ELSE 0
                END
                ),
                0
            ) AS current_month_sales,

            COALESCE(
                SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
                    AND t.created_at < DATE_TRUNC('month', CURRENT_DATE)
                    THEN t.total_amount
                    ELSE 0
                END
                ),
                0
            ) AS previous_month_sales
            FROM branches b
            LEFT JOIN transactions t
            ON t.branch_id = b.id
            GROUP BY b.id, b.branch_name
        )
        SELECT json_build_object(
            'branchName', branch_name,
            'growthPercent',
            ROUND(
            (
                (current_month_sales - previous_month_sales)
                / NULLIF(previous_month_sales, 0)
            ) * 100,
            1
            )
        )
        FROM branch_growth
        WHERE previous_month_sales > 0
        ORDER BY
            (
            (current_month_sales - previous_month_sales)
            / NULLIF(previous_month_sales, 0)
            ) DESC
        LIMIT 1
      ) AS "fastestGrowingBranch"
  `;

export const salesComparisonMonthlyQuery = `
    WITH months AS (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ),
    monthly_sales AS (
        SELECT
            m.month,
            b.branch_name,
            COALESCE(SUM(t.total_amount), 0)::int AS sales
        FROM months m
        CROSS JOIN branches b
        LEFT JOIN transactions t
            ON t.branch_id = b.id
            AND DATE_TRUNC('month', t.created_at) = m.month
        GROUP BY
            m.month,
            b.id,
            b.branch_name
    )
    SELECT
        TO_CHAR(month, 'Mon') AS "name",
        json_agg(
            json_build_object(
                'branch', branch_name,
                'sales', sales
            )
            ORDER BY branch_name
        ) AS "branches"
    FROM monthly_sales
    GROUP BY month
    ORDER BY month;
`;

export const marketShareQuery = `
    WITH branch_sales AS (
        SELECT
            b.id,
            b.branch_name,
            COALESCE(SUM(t.total_amount), 0) AS sales
        FROM branches b
        LEFT JOIN transactions t
            ON t.branch_id = b.id
            AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
            AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY b.id, b.branch_name
    )
    SELECT
        branch_name AS name,
        sales::int AS sales,
        ROUND(
            sales * 100.0 /
            NULLIF(SUM(sales) OVER (), 0),
            1
        )::int AS "marketShare"
    FROM branch_sales
    ORDER BY sales DESC;
`;

export const topSellingProductsByBranchQuery = `
    WITH sales AS (
        SELECT
            ti.product_id,
            t.branch_id,
            SUM(ti.quantity)::int AS sold
        FROM transaction_items ti
        JOIN transactions t
            ON t.id = ti.transaction_id
        WHERE t.status = 'completed'
          AND t.payment_status = 'paid'
          AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
          AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
        GROUP BY ti.product_id, t.branch_id
    )
    SELECT
        p.product_name AS product,
        json_agg(
            json_build_object(
                'branch', b.branch_name,
                'sold', COALESCE(s.sold, 0)
            )
            ORDER BY b.branch_name
        ) AS branches
    FROM products p
    CROSS JOIN branches b
    LEFT JOIN sales s
        ON s.product_id = p.id
        AND s.branch_id = b.id
    GROUP BY p.id, p.product_name
    ORDER BY p.product_name;
`;
