import {
  branchPerformanceRankingQuery,
  productBestPerformanceRankingQuery,
  topPerformingBranchesQuery,
} from "../queries/leaderboard.query.js";
import { employeePerformanceQuery } from "../queries/productivity.query.js";

export const getLeaderboardDataService = async (client) => {
  const [
    branchPerformanceRankingResult,
    employeePerformanceResult,
    productBestPerformanceRankingResult,
  ] = await Promise.all([
    client.query(branchPerformanceRankingQuery),
    client.query(employeePerformanceQuery),
    client.query(productBestPerformanceRankingQuery),
  ]);

  return {
    branchPerformanceRanking: branchPerformanceRankingResult.rows,
    employeePerformance: employeePerformanceResult.rows,
    productBestPerformanceRanking: productBestPerformanceRankingResult.rows,
  };
};
