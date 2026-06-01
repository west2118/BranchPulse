export const productivitySummaryQuery = `
SELECT
  (
    SELECT COUNT(*)
    FROM users
    WHERE status <> 'archived'
      AND role <> 'central_admin'
  )::int AS "totalEmployees",

  (
    SELECT COALESCE(SUM(t.total_amount), 0)
    FROM transactions t
    WHERE t.status <> 'voided'
      AND t.payment_status = 'paid'
  )::numeric(12,2) AS "totalSales",

  (
    SELECT u.name
    FROM users u
    JOIN transactions t ON t.handled_by = u.id
    WHERE u.status <> 'archived'
      AND u.role <> 'central_admin'
      AND t.status <> 'voided'
      AND t.payment_status = 'paid'
    GROUP BY u.id, u.name
    ORDER BY SUM(t.total_amount) DESC
    LIMIT 1
  ) AS "topPerformer",

  (
    SELECT COALESCE(
      AVG(transaction_count),
      0
    )
    FROM (
      SELECT COUNT(*) AS transaction_count
      FROM transactions t
      JOIN users u ON u.id = t.handled_by
      WHERE u.status <> 'archived'
        AND u.role <> 'central_admin'
      GROUP BY t.handled_by
    ) s
  )::numeric(10,1) AS "avgProductivity"
`;

export const productivityByBranchQuery = `
WITH branch_productivity AS (
    SELECT
        b.branch_name AS name,
        COALESCE(SUM(t.total_amount), 0)
        / NULLIF(
            COUNT(DISTINCT u.id) FILTER (
                WHERE u.status <> 'archived'
                  AND u.role <> 'central_admin'
            ),
            0
        ) AS productivity
    FROM branches b
    LEFT JOIN users u
        ON u.branch_id = b.id
    LEFT JOIN transactions t
        ON t.branch_id = b.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    GROUP BY b.id, b.branch_name
)
SELECT
    name,
    ROUND(
        (
            productivity
            / NULLIF(MAX(productivity) OVER (), 0)
        ) * 100,
        1
    ) AS value
FROM branch_productivity
ORDER BY value DESC;
`;

export const productivityTrendsMonthlyQuery = `
    WITH months AS (
        SELECT generate_series(
            DATE_TRUNC('year', CURRENT_DATE),
            DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '11 months',
            INTERVAL '1 month'
        ) AS month
    ),
    monthly_productivity AS (
        SELECT
            m.month,
            b.branch_name,
            COALESCE(
                SUM(t.total_amount)
                /
                NULLIF(
                    COUNT(DISTINCT u.id) FILTER (
                        WHERE u.status <> 'archived'
                          AND u.role <> 'central_admin'
                    ),
                    0
                ),
                0
            ) AS productivity
        FROM months m
        CROSS JOIN branches b
        LEFT JOIN users u
            ON u.branch_id = b.id
        LEFT JOIN transactions t
            ON t.branch_id = b.id
            AND DATE_TRUNC('month', t.created_at) = m.month
            AND t.status <> 'voided'
            AND t.payment_status = 'paid'
        GROUP BY
            m.month,
            b.id,
            b.branch_name
    ),
    productivity_percentage AS (
        SELECT
            month,
            branch_name,
            COALESCE(
                ROUND(
                    (
                        productivity * 100.0
                        /
                        NULLIF(
                            MAX(productivity) OVER (
                                PARTITION BY month
                            ),
                            0
                        )
                    )::numeric,
                    1
                )
            , 0) AS productivity
        FROM monthly_productivity
    )
    SELECT
        TO_CHAR(month, 'Mon') AS "name",
        json_agg(
            json_build_object(
                'branch', branch_name,
                'productivity', productivity
            )
            ORDER BY branch_name
        ) AS "branches"
    FROM productivity_percentage
    GROUP BY month
    ORDER BY month;
`;

export const topPerformersMonthQuery = `
WITH employee_sales AS (
    SELECT
        u.id,
        u.name,
        u.role,
        b.branch_name AS "branch",
        COALESCE(SUM(t.total_amount), 0) AS sales
    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    JOIN transactions t
        ON t.handled_by = u.id
    WHERE u.status <> 'archived'
      AND u.role <> 'central_admin'
      AND t.status <> 'voided'
      AND t.payment_status = 'paid'
      AND t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
      AND t.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    GROUP BY u.id, u.name, u.role, b.id, b.branch_name
)
SELECT
    id,
    name,
    role,
    "branch",
    sales::int AS value,
    COALESCE(
        ROUND(
            (
                sales * 100.0
                / NULLIF(MAX(sales) OVER (), 0)
            )::numeric,
            1
        ), 0
    ) AS productivity
FROM employee_sales
ORDER BY sales DESC
LIMIT 5;
`;

export const needsImprovementMonthQuery = `
WITH employee_sales AS (
    SELECT
        u.id,
        u.name,
        u.role,
        b.branch_name AS "branch",
        COALESCE(SUM(t.total_amount), 0) AS sales
    FROM users u
    LEFT JOIN branches b ON b.id = u.branch_id
    LEFT JOIN transactions t
        ON t.handled_by = u.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('month', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    WHERE u.status <> 'archived'
      AND u.role <> 'central_admin'
    GROUP BY u.id, u.name, u.role, b.id, b.branch_name
)
SELECT
    id,
    name,
    role,
    "branch",
    sales::int AS value,
    COALESCE(
        ROUND(
            (
                sales * 100.0
                / NULLIF(MAX(sales) OVER (), 0)
            )::numeric,
            1
        ), 0
    ) AS productivity
FROM employee_sales
ORDER BY sales ASC
LIMIT 5;
`;

export const employeePerformanceQuery = `
WITH employee_performance AS (
    SELECT
        u.id,
        u.name AS "employeeName",
        b.branch_name AS "branchName",
        u.role,

        COALESCE(
            SUM(t.total_amount),
            0
        )::int AS "totalSales",

        COALESCE(
            COUNT(t.id),
            0
        )::int AS "totalTickets"

    FROM users u
    LEFT JOIN branches b
        ON b.id = u.branch_id
    LEFT JOIN transactions t
        ON t.handled_by = u.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
        AND t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
        AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    WHERE u.status <> 'archived'
      AND u.role <> 'central_admin'
    GROUP BY
        u.id,
        u.name,
        u.role,
        b.branch_name
),
employee_metrics AS (
    SELECT
        *,
        COALESCE(
            "totalSales"::numeric
            / NULLIF("totalTickets", 0),
            0
        ) AS avg_ticket,

        ROUND(
            (
                "totalSales" * 100.0
                / NULLIF(MAX("totalSales") OVER (), 0)
            )::numeric,
            1
        ) AS productivity
    FROM employee_performance
)
SELECT
    DENSE_RANK() OVER (
        ORDER BY productivity DESC
    ) AS rank,

    id,
    "employeeName",
    "branchName",
    role,

    "totalSales",
    "totalTickets",

    ROUND(avg_ticket, 2) AS "avgTicket",

    productivity
FROM employee_metrics
ORDER BY rank, "totalSales" DESC;
`;
