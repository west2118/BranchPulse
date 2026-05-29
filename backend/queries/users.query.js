export const usersQuery = (whereClause, idx) => `
    SELECT
      u.id,
      u.branch_id AS "branchId",
      u.name,
      u.username,
      u.role,
      u.status,
      u.email,
      u.contact,

      b.branch_name AS "branchName",
      b.branch_code AS "branchCode"

    FROM users u
    LEFT JOIN branches b
      ON b.id = u.branch_id

    ${whereClause}

    ORDER BY u.id DESC
    LIMIT $${idx}
    OFFSET $${idx + 1}
  `;

export const countQuery = (whereClause) => `
    SELECT COUNT(*)::int AS total

    FROM users u
    LEFT JOIN branches b
      ON b.id = u.branch_id

    ${whereClause}
  `;
