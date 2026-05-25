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
  Download,
  RefreshCw,
  Eye,
  BarChart3,
  DollarSign,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  PieChart,
  LineChart,
  Activity,
  Target,
  Award,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  TrendingUp as TrendingUpIcon,
  Sliders,
  Maximize2,
  Minimize2,
  Percent,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";

const SalesComparisonPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sales");
  const [dateRange, setDateRange] = useState("month");
  const [selectedBranches, setSelectedBranches] = useState(["all"]);
  const [comparisonMetric, setComparisonMetric] = useState("revenue");
  const [drillDownLevel, setDrillDownLevel] = useState("branch");
  const [showExportModal, setShowExportModal] = useState(false);

  // Branch Data
  const branches = [
    { id: 1, name: "Manila Central", code: "MNL-001", color: "#3b82f6" },
    { id: 2, name: "Quezon City", code: "QC-002", color: "#10b981" },
    { id: 3, name: "Makati", code: "MAK-003", color: "#f59e0b" },
    { id: 4, name: "Taguig", code: "TAG-004", color: "#ef4444" },
    { id: 5, name: "Pasig", code: "PSG-005", color: "#8b5cf6" },
    { id: 6, name: "Cebu City", code: "CEB-006", color: "#ec4899" },
    { id: 7, name: "Davao", code: "DVO-007", color: "#06b6d4" },
    { id: 8, name: "Cebu South", code: "CEBS-008", color: "#84cc16" },
  ];

  // Monthly Sales Data by Branch
  const monthlySalesData = [
    {
      month: "Jan",
      manila: 185000,
      quezon: 168000,
      makati: 155000,
      taguig: 142000,
      pasig: 135000,
      cebu: 128000,
      davao: 118000,
      cebuSouth: 98000,
    },
    {
      month: "Feb",
      manila: 198000,
      quezon: 175000,
      makati: 162000,
      taguig: 148000,
      pasig: 140000,
      cebu: 132000,
      davao: 122000,
      cebuSouth: 102000,
    },
    {
      month: "Mar",
      manila: 210000,
      quezon: 185000,
      makati: 172000,
      taguig: 158000,
      pasig: 148000,
      cebu: 138000,
      davao: 128000,
      cebuSouth: 108000,
    },
    {
      month: "Apr",
      manila: 225000,
      quezon: 198000,
      makati: 182000,
      taguig: 168000,
      pasig: 158000,
      cebu: 145000,
      davao: 135000,
      cebuSouth: 115000,
    },
    {
      month: "May",
      manila: 242000,
      quezon: 212000,
      makati: 195000,
      taguig: 180000,
      pasig: 168000,
      cebu: 155000,
      davao: 142000,
      cebuSouth: 122000,
    },
    {
      month: "Jun",
      manila: 258000,
      quezon: 225000,
      makati: 208000,
      taguig: 192000,
      pasig: 178000,
      cebu: 162000,
      davao: 148000,
      cebuSouth: 128000,
    },
    {
      month: "Jul",
      manila: 275000,
      quezon: 240000,
      makati: 222000,
      taguig: 205000,
      pasig: 188000,
      cebu: 172000,
      davao: 155000,
      cebuSouth: 135000,
    },
    {
      month: "Aug",
      manila: 291000,
      quezon: 255000,
      makati: 235000,
      taguig: 218000,
      pasig: 198000,
      cebu: 182000,
      davao: 162000,
      cebuSouth: 142000,
    },
    {
      month: "Sep",
      manila: 308000,
      quezon: 268000,
      makati: 248000,
      taguig: 230000,
      pasig: 208000,
      cebu: 192000,
      davao: 170000,
      cebuSouth: 148000,
    },
    {
      month: "Oct",
      manila: 325000,
      quezon: 282000,
      makati: 262000,
      taguig: 242000,
      pasig: 218000,
      cebu: 202000,
      davao: 178000,
      cebuSouth: 155000,
    },
    {
      month: "Nov",
      manila: 340000,
      quezon: 295000,
      makati: 275000,
      taguig: 255000,
      pasig: 228000,
      cebu: 212000,
      davao: 185000,
      cebuSouth: 162000,
    },
    {
      month: "Dec",
      manila: 360000,
      quezon: 312000,
      makati: 290000,
      taguig: 268000,
      pasig: 240000,
      cebu: 225000,
      davao: 195000,
      cebuSouth: 170000,
    },
  ];

  // Daily Sales Data (Last 7 days)
  const dailySalesData = [
    {
      day: "Mon",
      manila: 12500,
      quezon: 10800,
      makati: 9800,
      taguig: 8900,
      pasig: 8200,
      cebu: 7500,
      davao: 6800,
      cebuSouth: 5500,
    },
    {
      day: "Tue",
      manila: 13200,
      quezon: 11200,
      makati: 10200,
      taguig: 9200,
      pasig: 8500,
      cebu: 7800,
      davao: 7000,
      cebuSouth: 5800,
    },
    {
      day: "Wed",
      manila: 12800,
      quezon: 11500,
      makati: 10500,
      taguig: 9500,
      pasig: 8800,
      cebu: 8000,
      davao: 7200,
      cebuSouth: 5900,
    },
    {
      day: "Thu",
      manila: 13500,
      quezon: 11800,
      makati: 10800,
      taguig: 9800,
      pasig: 9000,
      cebu: 8200,
      davao: 7400,
      cebuSouth: 6100,
    },
    {
      day: "Fri",
      manila: 14800,
      quezon: 12500,
      makati: 11500,
      taguig: 10500,
      pasig: 9500,
      cebu: 8800,
      davao: 7800,
      cebuSouth: 6500,
    },
    {
      day: "Sat",
      manila: 16200,
      quezon: 13800,
      makati: 12800,
      taguig: 11800,
      pasig: 10500,
      cebu: 9800,
      davao: 8500,
      cebuSouth: 7200,
    },
    {
      day: "Sun",
      manila: 15800,
      quezon: 13200,
      makati: 12200,
      taguig: 11200,
      pasig: 10000,
      cebu: 9200,
      davao: 8200,
      cebuSouth: 6800,
    },
  ];

  // Weekly Sales Data
  const weeklySalesData = [
    {
      week: "Week 1",
      manila: 92000,
      quezon: 78500,
      makati: 72500,
      taguig: 66500,
      pasig: 61500,
      cebu: 56500,
      davao: 51500,
      cebuSouth: 42500,
    },
    {
      week: "Week 2",
      manila: 98500,
      quezon: 84200,
      makati: 77800,
      taguig: 71200,
      pasig: 65800,
      cebu: 60500,
      davao: 55200,
      cebuSouth: 45500,
    },
    {
      week: "Week 3",
      manila: 101200,
      quezon: 86800,
      makati: 80200,
      taguig: 73500,
      pasig: 67800,
      cebu: 62500,
      davao: 56800,
      cebuSouth: 46800,
    },
    {
      week: "Week 4",
      manila: 108500,
      quezon: 92500,
      makati: 85500,
      taguig: 78200,
      pasig: 72200,
      cebu: 66500,
      davao: 60500,
      cebuSouth: 49800,
    },
  ];

  // Yearly Sales Data
  const yearlySalesData = [
    {
      year: "2020",
      manila: 2850000,
      quezon: 2450000,
      makati: 2250000,
      taguig: 2050000,
      pasig: 1880000,
      cebu: 1720000,
      davao: 1550000,
      cebuSouth: 1280000,
    },
    {
      year: "2021",
      manila: 3120000,
      quezon: 2680000,
      makati: 2480000,
      taguig: 2280000,
      pasig: 2080000,
      cebu: 1920000,
      davao: 1720000,
      cebuSouth: 1420000,
    },
    {
      year: "2022",
      manila: 3450000,
      quezon: 2980000,
      makati: 2750000,
      taguig: 2520000,
      pasig: 2320000,
      cebu: 2150000,
      davao: 1920000,
      cebuSouth: 1580000,
    },
    {
      year: "2023",
      manila: 3850000,
      quezon: 3350000,
      makati: 3100000,
      taguig: 2850000,
      pasig: 2620000,
      cebu: 2420000,
      davao: 2180000,
      cebuSouth: 1780000,
    },
    {
      year: "2024",
      manila: 4120000,
      quezon: 3580000,
      makati: 3320000,
      taguig: 3050000,
      pasig: 2800000,
      cebu: 2580000,
      davao: 2320000,
      cebuSouth: 1920000,
    },
  ];

  // Best Selling Products by Branch
  const bestSellingProducts = [
    {
      product: "RTX 4070 GPU",
      manila: 342,
      quezon: 298,
      makati: 275,
      taguig: 252,
      pasig: 228,
      cebu: 205,
      davao: 185,
      cebuSouth: 152,
    },
    {
      product: "i7-13700K",
      manila: 456,
      quezon: 398,
      makati: 368,
      taguig: 335,
      pasig: 305,
      cebu: 275,
      davao: 248,
      cebuSouth: 205,
    },
    {
      product: "32GB DDR5 RAM",
      manila: 523,
      quezon: 456,
      makati: 421,
      taguig: 385,
      pasig: 352,
      cebu: 318,
      davao: 285,
      cebuSouth: 235,
    },
    {
      product: "1TB NVMe SSD",
      manila: 612,
      quezon: 534,
      makati: 492,
      taguig: 448,
      pasig: 412,
      cebu: 372,
      davao: 335,
      cebuSouth: 278,
    },
    {
      product: "850W PSU",
      manila: 389,
      quezon: 342,
      makati: 315,
      taguig: 288,
      pasig: 265,
      cebu: 238,
      davao: 215,
      cebuSouth: 178,
    },
    {
      product: "Z790 MB",
      manila: 298,
      quezon: 262,
      makati: 242,
      taguig: 222,
      pasig: 205,
      cebu: 185,
      davao: 168,
      cebuSouth: 138,
    },
  ];

  // Branch Revenue Rankings
  const branchRankings = branches
    .map((branch) => {
      const totalSales = monthlySalesData.reduce((sum, month) => {
        const key = branch.name.toLowerCase().replace(" ", "");
        const mappedKey =
          key === "manilacentral"
            ? "manila"
            : key === "quezoncity"
              ? "quezon"
              : key === "cebucity"
                ? "cebu"
                : key === "cebusouth"
                  ? "cebuSouth"
                  : key;
        return sum + (month[mappedKey] || 0);
      }, 0);
      return {
        ...branch,
        totalSales,
        growth: Math.floor(Math.random() * 25) + 5,
        marketShare: (totalSales / 25200000) * 100,
      };
    })
    .sort((a, b) => b.totalSales - a.totalSales);

  // Sales Trends Data
  const trendsData = monthlySalesData.map((month) => ({
    month: month.month,
    totalSales:
      month.manila +
      month.quezon +
      month.makati +
      month.taguig +
      month.pasig +
      month.cebu +
      month.davao +
      month.cebuSouth,
    averageSales:
      (month.manila +
        month.quezon +
        month.makati +
        month.taguig +
        month.pasig +
        month.cebu +
        month.davao +
        month.cebuSouth) /
      8,
  }));

  // Get current data based on date range
  const getCurrentData = () => {
    switch (dateRange) {
      case "daily":
        return dailySalesData;
      case "weekly":
        return weeklySalesData;
      case "monthly":
        return monthlySalesData;
      case "yearly":
        return yearlySalesData;
      default:
        return monthlySalesData;
    }
  };

  const getXAxisKey = () => {
    switch (dateRange) {
      case "daily":
        return "day";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      case "yearly":
        return "year";
      default:
        return "month";
    }
  };

  const currentData = getCurrentData();
  const xAxisKey = getXAxisKey();

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-800 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₱{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Simple Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by branch name, location, or manager..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
              <p className="text-2xl font-bold text-gray-900">₱25.2M</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ +18.5% vs last year
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Revenue/Branch</p>
              <p className="text-2xl font-bold text-gray-900">₱3.15M</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ +12.3% vs last year
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
              <p className="text-sm text-gray-500">Best Performing Branch</p>
              <p className="text-lg font-bold text-gray-900">Manila Central</p>
              <p className="text-xs text-green-600 mt-1">₱4.12M revenue</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fastest Growing</p>
              <p className="text-lg font-bold text-gray-900">Cebu South</p>
              <p className="text-xs text-green-600 mt-1">↑ +24.3% growth</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Comparison Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Comparison (Monthly)
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Maximize2 className="w-4 h-4" /> Full Screen
            </button>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ReLineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxisKey} stroke="#94a3b8" />
              <YAxis
                tickFormatter={(value) => `₱${value / 1000}k`}
                stroke="#94a3b8"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="manila"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Manila Central"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="quezon"
                stroke="#10b981"
                strokeWidth={2}
                name="Quezon City"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="makati"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Makati"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="taguig"
                stroke="#ef4444"
                strokeWidth={2}
                name="Taguig"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pasig"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Pasig"
                dot={{ r: 4 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Branch Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue by Branch
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={branchRankings}
              layout="vertical"
              margin={{ left: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                tickFormatter={(value) => `₱${value / 1000000}M`}
                stroke="#94a3b8"
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                width={80}
              />
              <Tooltip
                formatter={(value) => [`₱${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="totalSales" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                {branchRankings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Trends & Market Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trends with Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Trends & Forecast
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis
                tickFormatter={(value) => `₱${value / 1000}k`}
                stroke="#94a3b8"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalSales"
                fill="#3b82f6"
                stroke="#3b82f6"
                fillOpacity={0.2}
                name="Total Sales"
              />
              <Line
                type="monotone"
                dataKey="averageSales"
                stroke="#f59e0b"
                strokeDasharray="5 5"
                name="Average per Branch"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Market Share by Branch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={branchRankings}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="marketShare"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
                labelLine={false}
              >
                {branchRankings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value.toFixed(1)}%`, "Market Share"]}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best Selling Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Best Selling Products by Branch
          </h3>
          <p className="text-sm text-gray-500 mt-1">Units sold (YTD)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Manila
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Quezon
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Makati
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Taguig
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Pasig
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Cebu
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Davao
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Cebu S
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bestSellingProducts.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.manila.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.quezon.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.makati.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.taguig.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.pasig.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.cebu.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.davao.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {product.cebuSouth.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Branch Performance Radar & Growth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Growth Metrics Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Branch Growth & Performance
          </h3>
          <div className="space-y-3">
            {branchRankings.map((branch, idx) => (
              <div
                key={branch.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                    style={{ backgroundColor: branch.color }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{branch.name}</p>
                    <p className="text-xs text-gray-500">
                      ₱{(branch.totalSales / 1000000).toFixed(1)}M revenue
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      {branch.growth}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">YoY Growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart for Multi-Dimensional Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Multi-Dimensional Comparison
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart
              data={[
                {
                  metric: "Revenue",
                  Manila: 95,
                  Quezon: 82,
                  Makati: 76,
                  Cebu: 59,
                },
                {
                  metric: "Growth",
                  Manila: 68,
                  Quezon: 72,
                  Makati: 78,
                  Cebu: 92,
                },
                {
                  metric: "Productivity",
                  Manila: 94,
                  Quezon: 89,
                  Makati: 91,
                  Cebu: 82,
                },
                {
                  metric: "Inventory",
                  Manila: 92,
                  Quezon: 88,
                  Makati: 85,
                  Cebu: 86,
                },
                {
                  metric: "Customer Sat",
                  Manila: 96,
                  Quezon: 91,
                  Makati: 88,
                  Cebu: 84,
                },
                {
                  metric: "Market Share",
                  Manila: 28,
                  Quezon: 24,
                  Makati: 22,
                  Cebu: 18,
                },
              ]}
            >
              <PolarGrid stroke="#94a3b8" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
              <Radar
                name="Manila Central"
                dataKey="Manila"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="Quezon City"
                dataKey="Quezon"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Radar
                name="Makati"
                dataKey="Makati"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
              <Radar
                name="Cebu City"
                dataKey="Cebu"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Export Report</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Excel (.xlsx)</option>
                  <option>CSV (.csv)</option>
                  <option>PDF (.pdf)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Current View</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Include
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Sales Charts
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Product Rankings
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Branch Comparisons
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesComparisonPage;
