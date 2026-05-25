import type { LucideIcon } from "lucide-react";

export type UserType = {
  id: number;
  name: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
};

export type AuthContextType = {
  user: UserType | null;
  login: (formData: any) => Promise<UserType>;
  logout: () => Promise<void>;
  loading: any;
};

export type SummaryStatType = {
  title: string;
  value: string;
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
