export const topPerformingBranchesQuery = `
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
    LIMIT 3
`;

export const branchPerformanceRankingQuery = `
WITH branch_performance AS (
    SELECT
        b.id,
        b.branch_code AS "branchCode",
        b.region,
        b.branch_name AS name,

        COALESCE(
            SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
                     AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
                    THEN t.total_amount
                    ELSE 0
                END
            ),
            0
        )::int AS "totalSales",

        COALESCE(
            SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
                     AND t.created_at < DATE_TRUNC('year', CURRENT_DATE)
                    THEN t.total_amount
                    ELSE 0
                END
            ),
            0
        )::int AS "previousYearSales",

        COALESCE(
            COUNT(t.id) FILTER (
                WHERE t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
                  AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
            ),
            0
        )::int AS "totalTickets",

        COUNT(DISTINCT u.id) FILTER (
            WHERE u.status <> 'archived'
              AND u.role <> 'central_admin'
        )::int AS "employeeCount"

    FROM branches b
    LEFT JOIN users u
        ON u.branch_id = b.id
    LEFT JOIN transactions t
        ON t.branch_id = b.id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
    GROUP BY
        b.id,
        b.branch_code,
        b.region,
        b.branch_name
),
branch_metrics AS (
    SELECT
        *,
        COALESCE(
            "totalSales"::numeric
            / NULLIF("employeeCount", 0),
            0
        ) AS sales_per_employee,

        COALESCE(
            "totalSales"::numeric
            / NULLIF("totalTickets", 0),
            0
        ) AS avg_ticket
    FROM branch_performance
),
final_metrics AS (
    SELECT
        *,
        ROUND(
            (
                sales_per_employee * 100.0
                /
                NULLIF(MAX(sales_per_employee) OVER (), 0)
            )::numeric,
            1
        ) AS productivity,

        ROUND(
            (
                ("totalSales" - "previousYearSales") * 100.0
                /
                NULLIF("previousYearSales", 0)
            )::numeric,
            1
        ) AS growth
    FROM branch_metrics
)
SELECT
    DENSE_RANK() OVER (ORDER BY productivity DESC) AS rank,

    name,
    "branchCode",
    region,

    "totalSales",
    "totalTickets",
    "employeeCount",

    ROUND(avg_ticket, 2) AS "avgTicket",

    productivity,
    growth
FROM final_metrics
ORDER BY rank;
`;

export const productBestPerformanceRankingQuery = `
WITH product_performance AS (
    SELECT
        p.id,
        p.product_name AS "productName",
        p.category,

        COALESCE(
            SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
                     AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
                    THEN ti.quantity * ti.price
                    ELSE 0
                END
            ),
            0
        )::int AS "totalSales",

        COALESCE(
            SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE)
                     AND t.created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
                    THEN ti.quantity
                    ELSE 0
                END
            ),
            0
        )::int AS "totalUnitsSold",

        COALESCE(
            SUM(
                CASE
                    WHEN t.created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
                     AND t.created_at < DATE_TRUNC('year', CURRENT_DATE)
                    THEN ti.quantity * ti.price
                    ELSE 0
                END
            ),
            0
        )::int AS "previousYearSales"

    FROM products p
    LEFT JOIN transaction_items ti
        ON ti.product_id = p.id
    LEFT JOIN transactions t
        ON t.id = ti.transaction_id
        AND t.status <> 'voided'
        AND t.payment_status = 'paid'
    WHERE p.status <> 'archived'
    GROUP BY
        p.id,
        p.product_name
)
SELECT
    DENSE_RANK() OVER (
        ORDER BY "totalSales" DESC
    ) AS rank,

    id,
    category,
    "productName",
    "totalSales",
    "totalUnitsSold",

    COALESCE(
        ROUND(
            (
                ("totalSales" - "previousYearSales") * 100.0
                /
                NULLIF("previousYearSales", 0)
            )::numeric,
            1
        ),
        0
    ) AS growth

FROM product_performance
ORDER BY rank, "totalSales" DESC;
`;
