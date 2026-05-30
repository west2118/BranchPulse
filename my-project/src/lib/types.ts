import type { LucideIcon } from "lucide-react";

export type UserSummaryStatsType = {
  activeUsers: number;
  admins: number;
  branchManagers: number;
  cashiers: number;
  centralAdmins: number;
  inactiveUsers: number;
  inventoryStaff: number;
  totalUsers: number;
  unassigned: number;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  email: string;
  branchId: number;
  branchName: string;
  branchCode: string;
  contact: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (formData: any) => Promise<UserType>;
  logout: () => Promise<void>;
  loading: any;
};

export type SummaryStatType = {
  title: string;
  value: number | string;
  subtitle: string;
  subtitleColor: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
};

export type BranchType = {
  id: number;
  branchCode: string;
  branchName: string;
  createdAt: string;
  location: string;
  managerId: number | null;
  managerName: string | null;
  managerUsername: string | null;
  region: string;
  status: "active" | "inactive";
  totalSales: number;
  totalInventory: number;
};

export type ChartData = {
  name: string;
  value: number;
};

export type EmployeeProductivity = {
  name: string;
  employees: number;
  salesPerEmployee: number;
  ticketsPerEmployee: number;
};

export type DashboardDataType = {
  summaryStats: {
    totalBranches: number;
    totalSales: number;
    totalStocks: number;
  };
  topPerforming: ChartData;
  needsImprovement: ChartData;
  monthlySalesOverview: ChartData[];
  branchPerformance: ChartData[];
  inventoryDistribution: ChartData[];
  employeeProductivityOverview: EmployeeProductivity[];
};

export type SalesDataType = {
  summaryStats: {
    totalSales: number;
    avgSalesPerBranch: number;
    bestPerformingBranch: {
      branchName: string;
      sales: number;
    };
    fastestGrowingBranch: {
      branchName: string;
      growthPercent: number;
    };
  };

  salesComparisonMonthly: {
    name: string;
    branches: {
      branch: string;
      sales: number;
    }[];
  }[];

  monthlySalesOverview: ChartData[];

  branchPerformance: ChartData[];

  marketShare: {
    name: string;
    sales: number;
    marketShare: string;
  }[];

  topSellingProductsByBranch: {
    product: string;
    branches: {
      branch: string;
      sold: number;
    }[];
  }[];
};
