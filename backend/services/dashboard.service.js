import {
  branchPerformanceQuery,
  employeeProductivityOverviewQuery,
  inventoryDistributionQuery,
  monthlySalesOverviewQuery,
  needsImprovementQuery,
  summaryQuery,
  topPerformingQuery,
} from "../queries/dashboard.query.js";

export const getDashboardDataService = async (client) => {
  const [
    summaryResult,
    topPerformingResult,
    needsImprovementResult,
    monthlySalesOverviewResult,
    inventoryDistributionResult,
    branchPerformanceResult,
    employeeProductivityOverviewResult,
  ] = await Promise.all([
    client.query(summaryQuery),
    client.query(topPerformingQuery),
    client.query(needsImprovementQuery),
    client.query(monthlySalesOverviewQuery),
    client.query(inventoryDistributionQuery),
    client.query(branchPerformanceQuery),
    client.query(employeeProductivityOverviewQuery),
  ]);

  return {
    summaryStats: summaryResult.rows[0],
    topPerforming: topPerformingResult.rows[0],
    needsImprovement: needsImprovementResult.rows[0],
    monthlySalesOverview: monthlySalesOverviewResult.rows,
    inventoryDistribution: inventoryDistributionResult.rows,
    branchPerformance: branchPerformanceResult.rows,
    employeeProductivityOverview: employeeProductivityOverviewResult.rows,
  };
};
