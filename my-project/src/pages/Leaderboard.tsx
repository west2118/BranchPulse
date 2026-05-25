import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Star,
  Award,
  Medal,
  Crown,
  Sparkles,
  Zap,
  Target,
  TrendingUp as TrendingUpIcon,
  BarChart3,
  Activity,
  Clock,
  Calendar,
  ArrowUp,
  ArrowDown,
  DollarSign,
  ShoppingBag,
  UserCheck,
  Building2,
  Percent,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  AreaChart,
  Area,
} from "recharts";

const BranchLeaderboardsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("leaderboards");
  const [period, setPeriod] = useState("monthly");
  const [category, setCategory] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedRanking, setSelectedRanking] = useState(null);

  // Branch Performance Data (Ranked)
  const branchRankings = [
    {
      id: 1,
      name: "Manila Central",
      code: "MNL-001",
      region: "Metro Manila",
      sales: 4250000,
      salesGrowth: 18.5,
      productivity: 94,
      productivityGrowth: 5.2,
      inventory: 2450,
      customerSat: 4.8,
      employeeCount: 28,
      avgTicket: 17347,
      rank: 1,
      trend: "up",
      score: 96.5,
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Makati",
      code: "MAK-003",
      region: "Metro Manila",
      sales: 3980000,
      salesGrowth: 15.2,
      productivity: 92,
      productivityGrowth: 4.8,
      inventory: 1980,
      customerSat: 4.7,
      employeeCount: 24,
      avgTicket: 16583,
      rank: 2,
      trend: "up",
      score: 92.8,
      color: "#10b981",
    },
    {
      id: 3,
      name: "Quezon City",
      code: "QC-002",
      region: "Metro Manila",
      sales: 3850000,
      salesGrowth: 12.8,
      productivity: 89,
      productivityGrowth: 3.5,
      inventory: 2120,
      customerSat: 4.6,
      employeeCount: 26,
      avgTicket: 14808,
      rank: 3,
      trend: "down",
      score: 88.2,
      color: "#f59e0b",
    },
    {
      id: 4,
      name: "Taguig",
      code: "TAG-004",
      region: "Metro Manila",
      sales: 3620000,
      salesGrowth: 14.2,
      productivity: 88,
      productivityGrowth: 4.2,
      inventory: 1850,
      customerSat: 4.5,
      employeeCount: 22,
      avgTicket: 16455,
      rank: 4,
      trend: "up",
      score: 86.5,
      color: "#ef4444",
    },
    {
      id: 5,
      name: "Pasig",
      code: "PSG-005",
      region: "Metro Manila",
      sales: 3350000,
      salesGrowth: 9.5,
      productivity: 84,
      productivityGrowth: 2.8,
      inventory: 1720,
      customerSat: 4.4,
      employeeCount: 20,
      avgTicket: 16750,
      rank: 5,
      trend: "down",
      score: 82.0,
      color: "#8b5cf6",
    },
    {
      id: 6,
      name: "Cebu City",
      code: "CEB-006",
      region: "Visayas",
      sales: 3120000,
      salesGrowth: 11.2,
      productivity: 86,
      productivityGrowth: 3.2,
      inventory: 1650,
      customerSat: 4.5,
      employeeCount: 20,
      avgTicket: 15600,
      rank: 6,
      trend: "up",
      score: 81.5,
      color: "#ec4899",
    },
    {
      id: 7,
      name: "Davao",
      code: "DVO-007",
      region: "Mindanao",
      sales: 2850000,
      salesGrowth: 8.5,
      productivity: 82,
      productivityGrowth: 2.5,
      inventory: 1480,
      customerSat: 4.3,
      employeeCount: 18,
      avgTicket: 15833,
      rank: 7,
      trend: "down",
      score: 78.0,
      color: "#06b6d4",
    },
    {
      id: 8,
      name: "Cebu South",
      code: "CEBS-008",
      region: "Visayas",
      sales: 2450000,
      salesGrowth: 5.2,
      productivity: 72,
      productivityGrowth: 1.8,
      inventory: 1280,
      customerSat: 3.9,
      employeeCount: 16,
      avgTicket: 15313,
      rank: 8,
      trend: "down",
      score: 68.5,
      color: "#84cc16",
    },
  ];

  // Employee Rankings (Top 10 overall)
  const employeeRankings = [
    {
      id: 1,
      name: "John Reyes",
      branch: "Manila Central",
      position: "Senior Sales Associate",
      sales: 485000,
      productivity: 96,
      tickets: 258,
      satisfaction: 4.9,
      avatar: "JR",
      rank: 1,
      trend: "up",
    },
    {
      id: 2,
      name: "Antonio Cruz",
      branch: "Manila Central",
      position: "Technical Specialist",
      sales: 462000,
      productivity: 94,
      tickets: 245,
      satisfaction: 4.8,
      avatar: "AC",
      rank: 2,
      trend: "up",
    },
    {
      id: 3,
      name: "Michael Tan",
      branch: "Makati",
      position: "Senior Sales",
      sales: 445000,
      productivity: 93,
      tickets: 242,
      satisfaction: 4.8,
      avatar: "MT",
      rank: 3,
      trend: "up",
    },
    {
      id: 4,
      name: "Maria Santos",
      branch: "Manila Central",
      position: "Sales Associate",
      sales: 428000,
      productivity: 91,
      tickets: 238,
      satisfaction: 4.7,
      avatar: "MS",
      rank: 4,
      trend: "down",
    },
    {
      id: 5,
      name: "Grace Fernandez",
      branch: "Quezon City",
      position: "Senior Sales",
      sales: 412000,
      productivity: 89,
      tickets: 232,
      satisfaction: 4.6,
      avatar: "GF",
      rank: 5,
      trend: "up",
    },
    {
      id: 6,
      name: "Ramon Villanueva",
      branch: "Quezon City",
      position: "Branch Manager",
      sales: 398000,
      productivity: 88,
      tickets: 228,
      satisfaction: 4.7,
      avatar: "RV",
      rank: 6,
      trend: "down",
    },
    {
      id: 7,
      name: "Kristine Lopez",
      branch: "Manila Central",
      position: "Sales Associate",
      sales: 385000,
      productivity: 86,
      tickets: 222,
      satisfaction: 4.5,
      avatar: "KL",
      rank: 7,
      trend: "down",
    },
    {
      id: 8,
      name: "Sofia Rodriguez",
      branch: "Taguig",
      position: "Technical Specialist",
      sales: 372000,
      productivity: 87,
      tickets: 225,
      satisfaction: 4.6,
      avatar: "SR",
      rank: 8,
      trend: "up",
    },
    {
      id: 9,
      name: "Luzviminda Cebu",
      branch: "Cebu City",
      position: "Branch Manager",
      sales: 358000,
      productivity: 85,
      tickets: 218,
      satisfaction: 4.5,
      avatar: "LC",
      rank: 9,
      trend: "up",
    },
    {
      id: 10,
      name: "Jennifer Lee",
      branch: "Makati",
      position: "Sales Associate",
      sales: 345000,
      productivity: 84,
      tickets: 215,
      satisfaction: 4.4,
      avatar: "JL",
      rank: 10,
      trend: "down",
    },
  ];

  // Best Selling Products Rankings
  const productRankings = [
    {
      id: 1,
      name: "NVIDIA RTX 4090",
      category: "Graphics Cards",
      unitsSold: 2845,
      revenue: 312875000,
      growth: 32,
      rank: 1,
      trend: "up",
    },
    {
      id: 2,
      name: "Intel Core i9-13900K",
      category: "Processors",
      unitsSold: 2650,
      revenue: 86117500,
      growth: 25,
      rank: 2,
      trend: "up",
    },
    {
      id: 3,
      name: "Corsair Vengeance 32GB DDR5",
      category: "Memory (RAM)",
      unitsSold: 3120,
      revenue: 24944400,
      growth: 42,
      rank: 3,
      trend: "up",
    },
    {
      id: 4,
      name: "Samsung 990 Pro 2TB NVMe",
      category: "Storage",
      unitsSold: 2890,
      revenue: 37565500,
      growth: 38,
      rank: 4,
      trend: "up",
    },
    {
      id: 5,
      name: "ASUS ROG Maximus Z790",
      category: "Motherboards",
      unitsSold: 1850,
      revenue: 46257500,
      growth: 18,
      rank: 5,
      trend: "down",
    },
    {
      id: 6,
      name: "AMD Ryzen 9 7950X",
      category: "Processors",
      unitsSold: 1750,
      revenue: 50743750,
      growth: 22,
      rank: 6,
      trend: "down",
    },
    {
      id: 7,
      name: "Corsair RM1000e PSU",
      category: "Power Supplies",
      unitsSold: 2250,
      revenue: 35988750,
      growth: 15,
      rank: 7,
      trend: "down",
    },
    {
      id: 8,
      name: "NVIDIA RTX 4080",
      category: "Graphics Cards",
      unitsSold: 1920,
      revenue: 143990400,
      growth: 12,
      rank: 8,
      trend: "down",
    },
    {
      id: 9,
      name: "WD Black 4TB HDD",
      category: "Storage",
      unitsSold: 2100,
      revenue: 18889500,
      growth: 8,
      rank: 9,
      trend: "down",
    },
    {
      id: 10,
      name: "Lian Li O11 Dynamic Evo",
      category: "Cases",
      unitsSold: 1650,
      revenue: 16491750,
      growth: 20,
      rank: 10,
      trend: "up",
    },
  ];

  // Performance Scores by Category
  const performanceScores = [
    {
      metric: "Sales Performance",
      manila: 98,
      makati: 92,
      quezon: 88,
      taguig: 85,
      cebu: 82,
    },
    {
      metric: "Productivity",
      manila: 96,
      makati: 93,
      quezon: 89,
      taguig: 87,
      cebu: 84,
    },
    {
      metric: "Customer Satisfaction",
      manila: 95,
      makati: 93,
      quezon: 90,
      taguig: 88,
      cebu: 86,
    },
    {
      metric: "Inventory Efficiency",
      manila: 92,
      makati: 88,
      quezon: 85,
      taguig: 82,
      cebu: 80,
    },
    {
      metric: "Employee Engagement",
      manila: 94,
      makati: 90,
      quezon: 86,
      taguig: 84,
      cebu: 81,
    },
    {
      metric: "Growth Rate",
      manila: 96,
      makati: 91,
      quezon: 85,
      taguig: 89,
      cebu: 83,
    },
  ];

  // Weekly Ranking Changes
  const weeklyRankingHistory = [
    {
      week: "Week 1",
      manila: 2,
      quezon: 3,
      makati: 4,
      taguig: 5,
      cebu: 6,
      pasig: 1,
      davao: 7,
      cebuSouth: 8,
    },
    {
      week: "Week 2",
      manila: 1,
      quezon: 3,
      makati: 4,
      taguig: 5,
      cebu: 6,
      pasig: 2,
      davao: 7,
      cebuSouth: 8,
    },
    {
      week: "Week 3",
      manila: 1,
      quezon: 2,
      makati: 4,
      taguig: 5,
      cebu: 6,
      pasig: 3,
      davao: 7,
      cebuSouth: 8,
    },
    {
      week: "Week 4",
      manila: 1,
      quezon: 2,
      makati: 3,
      taguig: 4,
      cebu: 5,
      pasig: 6,
      davao: 7,
      cebuSouth: 8,
    },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "branches", label: "Branches", icon: Store },
    { id: "sales", label: "Sales Analytics", icon: TrendingUp },
    { id: "inventory", label: "Inventory Analytics", icon: Package },
    { id: "productivity", label: "Employee Productivity", icon: Users },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const RankBadge = ({ rank, trend }) => (
    <div className="flex items-center gap-1">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
          rank === 1
            ? "bg-yellow-500 text-white"
            : rank === 2
              ? "bg-gray-400 text-white"
              : rank === 3
                ? "bg-orange-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
        }`}
      >
        {rank}
      </div>
      {trend === "up" && <ArrowUp className="w-4 h-4 text-green-500" />}
      {trend === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
    </div>
  );

  const TrendBadge = ({ growth }) => (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        growth >= 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {growth >= 0 ? (
        <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowDown className="w-3 h-3" />
      )}
      {Math.abs(growth)}%
    </span>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="sales">Sales Performance</option>
                <option value="productivity">Productivity</option>
                <option value="satisfaction">Customer Satisfaction</option>
              </select>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Podium Section - Top 3 Branches */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 text-white mb-6">
        <h3 className="text-lg font-semibold mb-6 text-center">
          🏆 Top Performing Branches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* 2nd Place */}
          <div className="text-center order-2 md:order-1">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Medal className="w-12 h-12 text-gray-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center font-bold text-white">
                2
              </div>
            </div>
            <h4 className="text-xl font-bold">Makati</h4>
            <p className="text-gray-300 text-sm">Score: 92.8</p>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              <span>₱3.98M sales</span>
              <span>92% productivity</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center order-1 md:order-2 transform md:scale-110">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-3 shadow-xl ring-4 ring-yellow-300">
                <Crown className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-white">
                1
              </div>
            </div>
            <h4 className="text-2xl font-bold text-yellow-400">
              Manila Central
            </h4>
            <p className="text-gray-300">Score: 96.5</p>
            <div className="mt-2 flex justify-center gap-4 text-sm">
              <span>₱4.25M sales</span>
              <span>94% productivity</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center order-3">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-orange-300 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Medal className="w-12 h-12 text-orange-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                3
              </div>
            </div>
            <h4 className="text-xl font-bold">Quezon City</h4>
            <p className="text-gray-300 text-sm">Score: 88.2</p>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              <span>₱3.85M sales</span>
              <span>89% productivity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Rankings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Branch Performance Rankings
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Ranked by overall performance score
              </p>
            </div>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Branch
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Sales (MTD)
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Growth
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Productivity
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Customer Sat
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Performance Score
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {branchRankings.map((branch) => (
                <tr
                  key={branch.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <RankBadge rank={branch.rank} trend={branch.trend} />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{branch.name}</p>
                      <p className="text-xs text-gray-400">
                        {branch.code} • {branch.region}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-semibold text-gray-900">
                      ₱{(branch.sales / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-xs text-gray-400">
                      ₱{branch.avgTicket.toLocaleString()}/ticket
                    </p>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <TrendBadge growth={branch.salesGrowth} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${branch.productivity}%` }}
                        />
                      </div>
                      <span className="text-sm">{branch.productivity}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(branch.customerSat) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {branch.customerSat}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${branch.score}%` }}
                        />
                      </div>
                      <span className="font-bold text-gray-900">
                        {branch.score}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {branch.trend === "up" ? (
                      <ArrowUp className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Radar Chart & Ranking History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Radar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Comparison (Top 5 Branches)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={performanceScores}>
              <PolarGrid stroke="#94a3b8" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "#64748b", fontSize: 11 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
              <Radar
                name="Manila Central"
                dataKey="manila"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="Makati"
                dataKey="makati"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Radar
                name="Quezon City"
                dataKey="quezon"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
              <Radar
                name="Taguig"
                dataKey="taguig"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranking History Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ranking History (Weekly)
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Lower rank number = Better performance
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyRankingHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis reversed domain={[1, 8]} stroke="#94a3b8" />
              <Tooltip formatter={(value) => [`#${value}`, "Rank"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="manila"
                stroke="#3b82f6"
                name="Manila Central"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="makati"
                stroke="#10b981"
                name="Makati"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="quezon"
                stroke="#f59e0b"
                name="Quezon City"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="taguig"
                stroke="#ef4444"
                name="Taguig"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cebu"
                stroke="#ec4899"
                name="Cebu City"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Top Performing Employees
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Ranked by productivity and sales performance
              </p>
            </div>
            <Award className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Employee
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Branch
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Position
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Sales
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Productivity
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Tickets
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Satisfaction
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employeeRankings.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        emp.rank === 1
                          ? "bg-yellow-500 text-white"
                          : emp.rank === 2
                            ? "bg-gray-400 text-white"
                            : emp.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {emp.rank}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        {emp.trend === "up" && (
                          <ArrowUp className="w-3 h-3 text-green-500 inline ml-1" />
                        )}
                        {emp.trend === "down" && (
                          <ArrowDown className="w-3 h-3 text-red-500 inline ml-1" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{emp.branch}</td>
                  <td className="py-3 px-4 text-gray-600">{emp.position}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ₱{(emp.sales / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            emp.productivity >= 90
                              ? "bg-green-500"
                              : emp.productivity >= 80
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${emp.productivity}%` }}
                        />
                      </div>
                      <span className="text-sm">{emp.productivity}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {emp.tickets}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(emp.satisfaction) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Selling Products Rankings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Best Selling Products
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Ranked by units sold and revenue generated
              </p>
            </div>
            <ShoppingBag className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Units Sold
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Revenue
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Growth
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productRankings.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        product.rank === 1
                          ? "bg-yellow-500 text-white"
                          : product.rank === 2
                            ? "bg-gray-400 text-white"
                            : product.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {product.rank}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {product.unitsSold.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₱{(product.revenue / 1000000).toFixed(1)}M
                  </td>
                  <td className="py-3 px-4 text-center">
                    <TrendBadge growth={product.growth} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.trend === "up" ? (
                      <ArrowUp className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Export Leaderboard Report
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <option>Excel (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF (.pdf)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Include Data
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Branch Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Employee Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Product Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Performance Charts
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Period
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <option>Current Period</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchLeaderboardsPage;
