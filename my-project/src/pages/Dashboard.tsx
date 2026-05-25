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
  Calendar,
  Filter,
  Search,
  Star,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
  Building2,
  DollarSign,
  Boxes,
  UserCheck,
  Crown,
  AlertTriangle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  // Mock Data
  const kpis = {
    totalBranches: 12,
    totalSales: 2847500,
    totalInventory: 15840,
    topPerformingBranch: "Manila Central",
    lowestPerformingBranch: "Cebu South",
    averageProductivity: 87.5,
  };

  // Monthly Sales Data
  const monthlySalesData = [
    { month: "Jan", sales: 185000, target: 175000 },
    { month: "Feb", sales: 198000, target: 185000 },
    { month: "Mar", sales: 210000, target: 200000 },
    { month: "Apr", sales: 225000, target: 210000 },
    { month: "May", sales: 242000, target: 225000 },
    { month: "Jun", sales: 258000, target: 240000 },
    { month: "Jul", sales: 275000, target: 260000 },
    { month: "Aug", sales: 291000, target: 275000 },
    { month: "Sep", sales: 308000, target: 290000 },
    { month: "Oct", sales: 325000, target: 310000 },
    { month: "Nov", sales: 340000, target: 325000 },
    { month: "Dec", sales: 360000, target: 340000 },
  ];

  // Inventory Status by Category
  const inventoryStatusData = [
    { name: "Processors", stock: 2450, threshold: 2000, status: "Good" },
    { name: "Motherboards", stock: 1820, threshold: 1500, status: "Good" },
    { name: "Graphics Cards", stock: 950, threshold: 1000, status: "Low" },
    { name: "RAM", stock: 4200, threshold: 3000, status: "Good" },
    { name: "Storage", stock: 3650, threshold: 2500, status: "Good" },
    { name: "PSU", stock: 780, threshold: 800, status: "Low" },
    { name: "Cases", stock: 1120, threshold: 1000, status: "Good" },
    { name: "Cooling", stock: 830, threshold: 700, status: "Good" },
  ];

  // Inventory Pie Chart Data
  const inventoryPieData = [
    { name: "Processors", value: 2450, color: "#3b82f6" },
    { name: "Motherboards", value: 1820, color: "#10b981" },
    { name: "Graphics Cards", value: 950, color: "#ef4444" },
    { name: "RAM", value: 4200, color: "#f59e0b" },
    { name: "Storage", value: 3650, color: "#8b5cf6" },
    { name: "Others", value: 2730, color: "#6b7280" },
  ];

  // Branch Performance Comparison
  const branchPerformance = [
    { name: "Manila Central", sales: 425000, productivity: 94, inventory: 92 },
    { name: "Quezon City", sales: 389000, productivity: 89, inventory: 88 },
    { name: "Makati", sales: 367000, productivity: 91, inventory: 85 },
    { name: "Taguig", sales: 342000, productivity: 87, inventory: 90 },
    { name: "Pasig", sales: 318000, productivity: 84, inventory: 82 },
    { name: "Cebu City", sales: 295000, productivity: 82, inventory: 86 },
    { name: "Davao", sales: 278000, productivity: 80, inventory: 79 },
    { name: "Baguio", sales: 245000, productivity: 78, inventory: 81 },
    { name: "Iloilo", sales: 228000, productivity: 76, inventory: 77 },
    { name: "Bacolod", sales: 210000, productivity: 74, inventory: 75 },
    { name: "Cagayan", sales: 195000, productivity: 72, inventory: 73 },
    { name: "Cebu South", sales: 178000, productivity: 68, inventory: 70 },
  ];

  // Employee Productivity Overview
  const productivityData = [
    {
      branch: "Manila Central",
      employees: 28,
      avgSalesPerEmp: 15178,
      ticketsPerEmp: 245,
    },
    {
      branch: "Quezon City",
      employees: 24,
      avgSalesPerEmp: 16208,
      ticketsPerEmp: 238,
    },
    {
      branch: "Makati",
      employees: 22,
      avgSalesPerEmp: 16681,
      ticketsPerEmp: 252,
    },
    {
      branch: "Taguig",
      employees: 20,
      avgSalesPerEmp: 17100,
      ticketsPerEmp: 241,
    },
    {
      branch: "Pasig",
      employees: 18,
      avgSalesPerEmp: 17666,
      ticketsPerEmp: 235,
    },
    {
      branch: "Cebu City",
      employees: 18,
      avgSalesPerEmp: 16388,
      ticketsPerEmp: 228,
    },
  ];

  // Recent Notifications
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Low Inventory Alert",
      message: "Graphics Cards stock is below threshold (950/1000)",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "alert",
      title: "Low Inventory Alert",
      message: "PSU stock is below threshold (780/800)",
      time: "3 hours ago",
      priority: "high",
    },
    {
      id: 3,
      type: "performance",
      title: "Weekly Performance Summary",
      message: "Manila Central is top performer this week",
      time: "1 day ago",
      priority: "medium",
    },
    {
      id: 4,
      type: "report",
      title: "Monthly Report Ready",
      message: "October 2024 sales report is now available",
      time: "2 days ago",
      priority: "low",
    },
    {
      id: 5,
      type: "achievement",
      title: "Milestone Achieved",
      message: "Overall sales exceeded ₱280M this quarter",
      time: "3 days ago",
      priority: "medium",
    },
  ];

  // Quick Stats Cards
  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {trendValue}
              </span>
              <span className="text-xs text-gray-400">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Branches"
          value={kpis.totalBranches}
          icon={Building2}
          color="bg-blue-500"
          trend="up"
          trendValue="+2"
        />
        <StatCard
          title="Total Sales"
          value={`₱${(kpis.totalSales / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          color="bg-green-500"
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Inventory"
          value={`${kpis.totalInventory.toLocaleString()} units`}
          icon={Boxes}
          color="bg-purple-500"
          trend="up"
          trendValue="+5.2%"
        />
        <StatCard
          title="Avg Productivity"
          value={`${kpis.averageProductivity}%`}
          icon={UserCheck}
          color="bg-orange-500"
          trend="up"
          trendValue="+3.1%"
        />
      </div>

      {/* Top & Lowest Performing Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-300" />
                <p className="text-sm font-medium text-blue-100">
                  Top Performing Branch
                </p>
              </div>
              <h3 className="text-2xl font-bold">{kpis.topPerformingBranch}</h3>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <p className="text-sm text-blue-100">Sales</p>
                  <p className="text-lg font-semibold">₱425,000</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Productivity</p>
                  <p className="text-lg font-semibold">94%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Growth</p>
                  <p className="text-lg font-semibold">+18%</p>
                </div>
              </div>
            </div>
            <Trophy className="w-16 h-16 text-yellow-300 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <p className="text-sm font-medium text-gray-100">
                  Needs Improvement
                </p>
              </div>
              <h3 className="text-2xl font-bold">
                {kpis.lowestPerformingBranch}
              </h3>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <p className="text-sm text-gray-100">Sales</p>
                  <p className="text-lg font-semibold">₱178,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-100">Productivity</p>
                  <p className="text-lg font-semibold">68%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-100">Growth</p>
                  <p className="text-lg font-semibold">-5%</p>
                </div>
              </div>
            </div>
            <Activity className="w-16 h-16 text-gray-300 opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Monthly Sales Overview
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Eye className="w-4 h-4" /> Detailed Report
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlySalesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `₱${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`₱${value.toLocaleString()}`, "Sales"]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#salesGradient)"
                name="Actual Sales"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10b981"
                strokeDasharray="5 5"
                name="Target"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Status Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Inventory Distribution
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Eye className="w-4 h-4" /> View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={inventoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {inventoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString()} units`,
                    "Stock",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {inventoryStatusData.slice(0, 5).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.status === "Low" ? "bg-red-500" : "bg-green-500"}`}
                        style={{
                          width: `${(item.stock / item.threshold) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Productivity Overview & Branch Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Productivity Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Employee Productivity Overview
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Eye className="w-4 h-4" /> View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">
                    Branch
                  </th>
                  <th className="text-center py-3 text-sm font-medium text-gray-500">
                    Employees
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">
                    Sales/Emp
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">
                    Tickets/Emp
                  </th>
                </tr>
              </thead>
              <tbody>
                {productivityData.map((item) => (
                  <tr key={item.branch} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-700">
                      {item.branch}
                    </td>
                    <td className="py-3 text-sm text-center text-gray-600">
                      {item.employees}
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600">
                      ₱{item.avgSalesPerEmp.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600">
                      {item.ticketsPerEmp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Branch Performance Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Branch Performance Comparison
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Eye className="w-4 h-4" /> Compare All
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={branchPerformance.slice(0, 8)}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                tickFormatter={(value) => `₱${value / 1000}k`}
                stroke="#94a3b8"
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                width={80}
              />
              <Tooltip
                formatter={(value) => [`₱${value.toLocaleString()}`, "Sales"]}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notifications */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Notifications & Alerts
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Bell className="w-4 h-4" /> View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border ${
                  notif.priority === "high"
                    ? "bg-red-50 border-red-200"
                    : notif.priority === "medium"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      notif.priority === "high"
                        ? "bg-red-100"
                        : notif.priority === "medium"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {notif.type === "alert" ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : notif.type === "performance" ? (
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-semibold text-gray-800">
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Reports */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Generate Summary Report</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Export Analytics Data</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700">Advanced Filters</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Branch Comparison Tool</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Need detailed insights?
                </p>
                <p className="text-xs text-gray-400">
                  Navigate to specific analytics pages
                </p>
              </div>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
