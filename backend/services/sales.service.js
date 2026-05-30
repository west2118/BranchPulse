import {
  branchPerformanceQuery,
  monthlySalesOverviewQuery,
} from "../queries/dashboard.query.js";
import {
  marketShareQuery,
  salesComparisonMonthlyQuery,
  salesSummaryQuery,
  topSellingProductsByBranchQuery,
} from "../queries/sales.query.js";

export const getSalesDataService = async (client) => {
  const [
    salesSummaryResult,
    salesComparisonMonthlyResult,
    branchPerformanceResult,
    monthlySalesOverviewResult,
    marketShareResult,
    topSellingProductsByBranchResult,
  ] = await Promise.all([
    client.query(salesSummaryQuery),
    client.query(salesComparisonMonthlyQuery),
    client.query(branchPerformanceQuery),
    client.query(monthlySalesOverviewQuery),
    client.query(marketShareQuery),
    client.query(topSellingProductsByBranchQuery),
  ]);

  return {
    summaryStats: salesSummaryResult.rows[0],
    salesComparisonMonthly: salesComparisonMonthlyResult.rows,
    branchPerformance: branchPerformanceResult.rows,
    monthlySalesOverview: monthlySalesOverviewResult.rows,
    marketShare: marketShareResult.rows,
    topSellingProductsByBranch: topSellingProductsByBranchResult.rows,
  };
};
