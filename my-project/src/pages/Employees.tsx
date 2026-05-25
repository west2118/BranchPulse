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
  User,
  UserCheck,
  UserPlus,
  TrendingUp as TrendingUpIcon,
  BarChart3,
  Activity,
  Clock,
  Calendar,
  Target,
  Medal,
  Crown,
  Sparkles,
  Zap,
  Brain,
  ChartLine,
  Percent,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  DollarSign,
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
  ScatterChart,
  Scatter,
} from "recharts";

const EmployeeProductivityPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("productivity");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("productivity");
  const [viewMode, setViewMode] = useState("table");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  // Employee Data by Branch
  const employees = [
    // Manila Central
    {
      id: 1,
      name: "John Reyes",
      branch: "Manila Central",
      position: "Senior Sales Associate",
      avatar: "JR",
      sales: 425000,
      productivity: 94,
      tickets: 245,
      satisfaction: 4.8,
      attendance: 98,
      experience: 5,
      target: 400000,
      commission: 42500,
      status: "excellent",
      category: "top",
    },
    {
      id: 2,
      name: "Maria Santos",
      branch: "Manila Central",
      position: "Sales Associate",
      avatar: "MS",
      sales: 389000,
      productivity: 89,
      tickets: 228,
      satisfaction: 4.6,
      attendance: 96,
      experience: 3,
      target: 350000,
      commission: 38900,
      status: "good",
      category: "good",
    },
    {
      id: 3,
      name: "Antonio Cruz",
      branch: "Manila Central",
      position: "Technical Specialist",
      avatar: "AC",
      sales: 412000,
      productivity: 92,
      tickets: 235,
      satisfaction: 4.9,
      attendance: 97,
      experience: 4,
      target: 380000,
      commission: 41200,
      status: "excellent",
      category: "top",
    },
    {
      id: 4,
      name: "Kristine Lopez",
      branch: "Manila Central",
      position: "Sales Associate",
      avatar: "KL",
      sales: 356000,
      productivity: 82,
      tickets: 210,
      satisfaction: 4.4,
      attendance: 94,
      experience: 2,
      target: 340000,
      commission: 35600,
      status: "good",
      category: "average",
    },

    // Quezon City
    {
      id: 5,
      name: "Ramon Villanueva",
      branch: "Quezon City",
      position: "Branch Manager",
      avatar: "RV",
      sales: 395000,
      productivity: 88,
      tickets: 232,
      satisfaction: 4.7,
      attendance: 97,
      experience: 6,
      target: 380000,
      commission: 39500,
      status: "good",
      category: "good",
    },
    {
      id: 6,
      name: "Grace Fernandez",
      branch: "Quezon City",
      position: "Senior Sales",
      avatar: "GF",
      sales: 372000,
      productivity: 85,
      tickets: 218,
      satisfaction: 4.5,
      attendance: 95,
      experience: 4,
      target: 360000,
      commission: 37200,
      status: "good",
      category: "good",
    },
    {
      id: 7,
      name: "Roberto Dela Cruz",
      branch: "Quezon City",
      position: "Sales Associate",
      avatar: "RD",
      sales: 335000,
      productivity: 77,
      tickets: 198,
      satisfaction: 4.2,
      attendance: 92,
      experience: 2,
      target: 330000,
      commission: 33500,
      status: "average",
      category: "average",
    },

    // Makati
    {
      id: 8,
      name: "Michael Tan",
      branch: "Makati",
      position: "Senior Sales",
      avatar: "MT",
      sales: 408000,
      productivity: 93,
      tickets: 242,
      satisfaction: 4.8,
      attendance: 98,
      experience: 5,
      target: 390000,
      commission: 40800,
      status: "excellent",
      category: "top",
    },
    {
      id: 9,
      name: "Jennifer Lee",
      branch: "Makati",
      position: "Sales Associate",
      avatar: "JL",
      sales: 365000,
      productivity: 84,
      tickets: 215,
      satisfaction: 4.5,
      attendance: 95,
      experience: 3,
      target: 350000,
      commission: 36500,
      status: "good",
      category: "good",
    },

    // Taguig
    {
      id: 10,
      name: "Patrick Cruz",
      branch: "Taguig",
      position: "Sales Associate",
      avatar: "PC",
      sales: 348000,
      productivity: 80,
      tickets: 205,
      satisfaction: 4.3,
      attendance: 93,
      experience: 2,
      target: 340000,
      commission: 34800,
      status: "average",
      category: "average",
    },
    {
      id: 11,
      name: "Sofia Rodriguez",
      branch: "Taguig",
      position: "Technical Specialist",
      avatar: "SR",
      sales: 392000,
      productivity: 90,
      tickets: 228,
      satisfaction: 4.7,
      attendance: 96,
      experience: 4,
      target: 370000,
      commission: 39200,
      status: "good",
      category: "good",
    },

    // Pasig
    {
      id: 12,
      name: "Andres Bonifacio",
      branch: "Pasig",
      position: "Sales Associate",
      avatar: "AB",
      sales: 325000,
      productivity: 75,
      tickets: 192,
      satisfaction: 4.1,
      attendance: 91,
      experience: 1,
      target: 320000,
      commission: 32500,
      status: "average",
      category: "average",
    },

    // Cebu City
    {
      id: 13,
      name: "Luzviminda Cebu",
      branch: "Cebu City",
      position: "Branch Manager",
      avatar: "LC",
      sales: 385000,
      productivity: 86,
      tickets: 225,
      satisfaction: 4.6,
      attendance: 96,
      experience: 5,
      target: 370000,
      commission: 38500,
      status: "good",
      category: "good",
    },
    {
      id: 14,
      name: "Datu Lapu-Lapu",
      branch: "Cebu City",
      position: "Sales Associate",
      avatar: "DL",
      sales: 342000,
      productivity: 78,
      tickets: 202,
      satisfaction: 4.3,
      attendance: 93,
      experience: 2,
      target: 330000,
      commission: 34200,
      status: "average",
      category: "average",
    },

    // Davao
    {
      id: 15,
      name: "Mindanao Pearl",
      branch: "Davao",
      position: "Sales Associate",
      avatar: "MP",
      sales: 318000,
      productivity: 73,
      tickets: 188,
      satisfaction: 4.0,
      attendance: 90,
      experience: 1,
      target: 310000,
      commission: 31800,
      status: "average",
      category: "average",
    },

    // Cebu South
    {
      id: 16,
      name: "Visayas Maria",
      branch: "Cebu South",
      position: "Sales Associate",
      avatar: "VM",
      sales: 275000,
      productivity: 63,
      tickets: 165,
      satisfaction: 3.8,
      attendance: 88,
      experience: 0.5,
      target: 280000,
      commission: 27500,
      status: "needs improvement",
      category: "bottom",
    },
  ];

  // Productivity Metrics by Branch
  const branchProductivityMetrics = [
    {
      branch: "Manila Central",
      avgProductivity: 89.3,
      avgSales: 395500,
      avgTickets: 230,
      satisfaction: 4.68,
      headcount: 4,
      totalSales: 1582000,
    },
    {
      branch: "Quezon City",
      avgProductivity: 83.3,
      avgSales: 367333,
      avgTickets: 216,
      satisfaction: 4.47,
      headcount: 3,
      totalSales: 1102000,
    },
    {
      branch: "Makati",
      avgProductivity: 88.5,
      avgSales: 386500,
      avgTickets: 229,
      satisfaction: 4.65,
      headcount: 2,
      totalSales: 773000,
    },
    {
      branch: "Taguig",
      avgProductivity: 85.0,
      avgSales: 370000,
      avgTickets: 217,
      satisfaction: 4.5,
      headcount: 2,
      totalSales: 740000,
    },
    {
      branch: "Pasig",
      avgProductivity: 75.0,
      avgSales: 325000,
      avgTickets: 192,
      satisfaction: 4.1,
      headcount: 1,
      totalSales: 325000,
    },
    {
      branch: "Cebu City",
      avgProductivity: 82.0,
      avgSales: 363500,
      avgTickets: 214,
      satisfaction: 4.45,
      headcount: 2,
      totalSales: 727000,
    },
    {
      branch: "Davao",
      avgProductivity: 73.0,
      avgSales: 318000,
      avgTickets: 188,
      satisfaction: 4.0,
      headcount: 1,
      totalSales: 318000,
    },
    {
      branch: "Cebu South",
      avgProductivity: 63.0,
      avgSales: 275000,
      avgTickets: 165,
      satisfaction: 3.8,
      headcount: 1,
      totalSales: 275000,
    },
  ];

  // Productivity Trends (Last 6 months)
  const productivityTrends = [
    {
      month: "Jun",
      manila: 86,
      quezon: 80,
      makati: 85,
      taguig: 82,
      cebu: 79,
      davao: 70,
      cebuSouth: 60,
    },
    {
      month: "Jul",
      manila: 87,
      quezon: 81,
      makati: 86,
      taguig: 83,
      cebu: 80,
      davao: 71,
      cebuSouth: 61,
    },
    {
      month: "Aug",
      manila: 88,
      quezon: 82,
      makati: 87,
      taguig: 84,
      cebu: 81,
      davao: 72,
      cebuSouth: 62,
    },
    {
      month: "Sep",
      manila: 89,
      quezon: 83,
      makati: 88,
      taguig: 85,
      cebu: 82,
      davao: 73,
      cebuSouth: 62,
    },
    {
      month: "Oct",
      manila: 90,
      quezon: 84,
      makati: 89,
      taguig: 86,
      cebu: 83,
      davao: 74,
      cebuSouth: 63,
    },
    {
      month: "Nov",
      manila: 91,
      quezon: 85,
      makati: 90,
      taguig: 87,
      cebu: 84,
      davao: 75,
      cebuSouth: 64,
    },
  ];

  // Employee Rankings Data
  const topPerformers = [...employees]
    .sort((a, b) => b.productivity - a.productivity)
    .slice(0, 5);
  const bottomPerformers = [...employees]
    .sort((a, b) => a.productivity - b.productivity)
    .slice(0, 3);

  // Productivity Distribution
  const productivityDistribution = [
    {
      range: "90-100%",
      count: employees.filter((e) => e.productivity >= 90).length,
      color: "#10b981",
    },
    {
      range: "80-89%",
      count: employees.filter(
        (e) => e.productivity >= 80 && e.productivity < 90,
      ).length,
      color: "#3b82f6",
    },
    {
      range: "70-79%",
      count: employees.filter(
        (e) => e.productivity >= 70 && e.productivity < 80,
      ).length,
      color: "#f59e0b",
    },
    {
      range: "60-69%",
      count: employees.filter(
        (e) => e.productivity >= 60 && e.productivity < 70,
      ).length,
      color: "#ef4444",
    },
    {
      range: "<60%",
      count: employees.filter((e) => e.productivity < 60).length,
      color: "#8b5cf6",
    },
  ];

  // Sales per Employee Chart Data
  const salesPerEmployeeData = branchProductivityMetrics.map((b) => ({
    branch: b.branch,
    avgSales: b.avgSales,
    avgProductivity: b.avgProductivity,
  }));

  // Filter employees based on branch and search
  const getFilteredEmployees = () => {
    let filtered = employees;

    if (selectedBranch !== "all") {
      filtered = filtered.filter((e) => e.branch === selectedBranch);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.position.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort employees
    if (sortBy === "productivity") {
      filtered.sort((a, b) => b.productivity - a.productivity);
    } else if (sortBy === "sales") {
      filtered.sort((a, b) => b.sales - a.sales);
    } else if (sortBy === "tickets") {
      filtered.sort((a, b) => b.tickets - a.tickets);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredEmployees = getFilteredEmployees();

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

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BranchPulse</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const ProductivityBadge = ({ score }) => {
    let color = "";
    let label = "";
    if (score >= 90) {
      color =
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      label = "Excellent";
    } else if (score >= 80) {
      color =
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      label = "Good";
    } else if (score >= 70) {
      color =
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      label = "Average";
    } else {
      color = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      label = "Needs Improvement";
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}
      >
        {score}% • {label}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length}
              </p>
              <p className="text-xs text-green-600 mt-1">Across 8 branches</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Productivity</p>
              <p className="text-2xl font-bold text-gray-900">81.7%</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ +3.2% vs last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Top Performer</p>
              <p className="text-lg font-bold text-gray-900">John Reyes</p>
              <p className="text-xs text-green-600 mt-1">94% productivity</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales (Employees)</p>
              <p className="text-2xl font-bold text-gray-900">₱6.04M</p>
              <p className="text-xs text-gray-400 mt-1">
                YTD employee contribution
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Store className="w-4 h-4 text-gray-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Branches</option>
                <option value="Manila Central">Manila Central</option>
                <option value="Quezon City">Quezon City</option>
                <option value="Makati">Makati</option>
                <option value="Taguig">Taguig</option>
                <option value="Pasig">Pasig</option>
                <option value="Cebu City">Cebu City</option>
                <option value="Davao">Davao</option>
                <option value="Cebu South">Cebu South</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="productivity">Sort by Productivity</option>
                <option value="sales">Sort by Sales</option>
                <option value="tickets">Sort by Tickets</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "chart" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
            >
              <ChartLine className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Branch Productivity Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity by Branch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchProductivityMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="branch"
                angle={-45}
                textAnchor="end"
                height={80}
                stroke="#94a3b8"
              />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip formatter={(value) => [`${value}%`, "Productivity"]} />
              <Legend />
              <Bar
                dataKey="avgProductivity"
                fill="#3b82f6"
                name="Avg Productivity (%)"
                radius={[4, 4, 0, 0]}
              >
                {branchProductivityMetrics.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.avgProductivity >= 85
                        ? "#10b981"
                        : entry.avgProductivity >= 75
                          ? "#3b82f6"
                          : "#f59e0b"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Productivity Distribution Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productivityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="range"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {productivityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} employees`, "Count"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Trends & Sales Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Productivity Trends Over Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Trends (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis domain={[50, 100]} stroke="#94a3b8" />
              <Tooltip formatter={(value) => [`${value}%`, "Productivity"]} />
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
                dataKey="quezon"
                stroke="#10b981"
                name="Quezon City"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="makati"
                stroke="#f59e0b"
                name="Makati"
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

        {/* Sales vs Productivity Scatter Plot */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales vs Productivity Correlation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                dataKey="avgSales"
                name="Avg Sales"
                unit="₱"
                tickFormatter={(value) => `₱${value / 1000}k`}
                stroke="#94a3b8"
              />
              <YAxis
                type="number"
                dataKey="avgProductivity"
                name="Productivity"
                unit="%"
                domain={[50, 100]}
                stroke="#94a3b8"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => {
                  if (name === "Avg Sales")
                    return [`₱${value.toLocaleString()}`, "Avg Sales"];
                  return [`${value}%`, "Productivity"];
                }}
              />
              <Scatter
                name="Branches"
                data={salesPerEmployeeData}
                fill="#3b82f6"
                shape="circle"
              >
                {salesPerEmployeeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.avgProductivity >= 85
                        ? "#10b981"
                        : entry.avgProductivity >= 75
                          ? "#3b82f6"
                          : "#f59e0b"
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers & Bottom Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Performers */}
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <h3 className="text-lg font-semibold">Top Performers</h3>
            </div>
            <span className="text-sm text-green-100">
              Highest productivity scores
            </span>
          </div>
          <div className="space-y-3">
            {topPerformers.map((emp, idx) => (
              <div
                key={emp.id}
                className="flex items-center justify-between bg-white/10 rounded-xl p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-xs text-green-100">
                      {emp.branch} • {emp.position}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{emp.productivity}%</p>
                  <p className="text-xs text-green-100">
                    ₱{emp.sales.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-300" />
              <h3 className="text-lg font-semibold">Needs Improvement</h3>
            </div>
            <span className="text-sm text-red-100">
              Lowest productivity scores
            </span>
          </div>
          <div className="space-y-3">
            {bottomPerformers.map((emp, idx) => (
              <div
                key={emp.id}
                className="flex items-center justify-between bg-white/10 rounded-xl p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-xs text-red-100">
                      {emp.branch} • {emp.position}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{emp.productivity}%</p>
                  <p className="text-xs text-red-100">
                    ₱{emp.sales.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Performance Rankings
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredEmployees.length} employees
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
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
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Tickets
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Productivity
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Satisfaction
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {employee.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {employee.experience} years exp
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{employee.branch}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {employee.position}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <p className="font-semibold text-gray-900">
                      ₱{employee.sales.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Target: ₱{employee.target.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {employee.tickets}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            employee.productivity >= 90
                              ? "bg-green-500"
                              : employee.productivity >= 80
                                ? "bg-blue-500"
                                : employee.productivity >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${employee.productivity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {employee.productivity}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(employee.satisfaction) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {employee.satisfaction}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowEmployeeDetails(true);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No employees found</p>
          </div>
        )}
      </div>

      {/* Employee Details Modal */}
      {showEmployeeDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {selectedEmployee.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedEmployee.position} • {selectedEmployee.branch}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEmployeeDetails(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedEmployee.productivity}%
                  </p>
                  <p className="text-xs text-gray-500">Productivity Score</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{(selectedEmployee.sales / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-gray-500">Total Sales</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedEmployee.tickets}
                  </p>
                  <p className="text-xs text-gray-500">Tickets Closed</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedEmployee.satisfaction}
                  </p>
                  <p className="text-xs text-gray-500">Satisfaction Rating</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Sales Performance</span>
                    <span className="font-medium">
                      {(
                        (selectedEmployee.sales / selectedEmployee.target) *
                        100
                      ).toFixed(0)}
                      % of target
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, (selectedEmployee.sales / selectedEmployee.target) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Attendance Rate</span>
                    <span className="font-medium">
                      {selectedEmployee.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${selectedEmployee.attendance}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Performance Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Commission Earned
                    </span>
                    <span className="font-semibold text-green-600">
                      ₱{selectedEmployee.commission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      Avg Ticket Value
                    </span>
                    <span className="font-semibold">
                      ₱
                      {(
                        selectedEmployee.sales / selectedEmployee.tickets
                      ).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Detailed Report
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Schedule Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Export Productivity Report
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
                    Employee Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Branch Comparison
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Productivity Trends
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Individual Performance
                  </label>
                </div>
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

export default EmployeeProductivityPage;
