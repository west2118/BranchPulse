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
  AlertTriangle,
  CheckCircle,
  Box,
  ShoppingCart,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  BarChart3,
  Activity,
  Truck,
  Clock,
  Percent,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  Zap,
  Layers,
  Signal,
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
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";

const InventoryComparisonPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  // Product Categories
  const categories = [
    { id: 1, name: "Processors", icon: "CPU" },
    { id: 2, name: "Graphics Cards", icon: "GPU" },
    { id: 3, name: "Motherboards", icon: "MB" },
    { id: 4, name: "Memory (RAM)", icon: "RAM" },
    { id: 5, name: "Storage (SSD/HDD)", icon: "Storage" },
    { id: 6, name: "Power Supplies", icon: "PSU" },
    { id: 7, name: "Cases", icon: "Case" },
    { id: 8, name: "Cooling Systems", icon: "Cooling" },
  ];

  // Product Inventory Data
  const products = [
    {
      id: 1,
      name: "Intel Core i9-13900K",
      category: "Processors",
      sku: "CPU-001",
      threshold: 50,
      manila: 85,
      quezon: 72,
      makati: 68,
      taguig: 58,
      pasig: 52,
      cebu: 45,
      davao: 38,
      cebuSouth: 28,
      price: 32495,
      movement: "+12%",
      status: "good",
    },
    {
      id: 2,
      name: "AMD Ryzen 9 7950X",
      category: "Processors",
      sku: "CPU-002",
      threshold: 50,
      manila: 62,
      quezon: 55,
      makati: 48,
      taguig: 42,
      pasig: 38,
      cebu: 35,
      davao: 28,
      cebuSouth: 22,
      price: 28995,
      movement: "+8%",
      status: "good",
    },
    {
      id: 3,
      name: "NVIDIA RTX 4090",
      category: "Graphics Cards",
      sku: "GPU-001",
      threshold: 30,
      manila: 28,
      quezon: 22,
      makati: 18,
      taguig: 15,
      pasig: 12,
      cebu: 10,
      davao: 8,
      cebuSouth: 5,
      price: 109995,
      movement: "-15%",
      status: "low",
    },
    {
      id: 4,
      name: "NVIDIA RTX 4080",
      category: "Graphics Cards",
      sku: "GPU-002",
      threshold: 40,
      manila: 35,
      quezon: 28,
      makati: 25,
      taguig: 20,
      pasig: 18,
      cebu: 15,
      davao: 12,
      cebuSouth: 8,
      price: 74995,
      movement: "-8%",
      status: "low",
    },
    {
      id: 5,
      name: "AMD Radeon RX 7900 XT",
      category: "Graphics Cards",
      sku: "GPU-003",
      threshold: 35,
      manila: 42,
      quezon: 35,
      makati: 30,
      taguig: 25,
      pasig: 22,
      cebu: 18,
      davao: 15,
      cebuSouth: 10,
      price: 64995,
      movement: "-5%",
      status: "good",
    },
    {
      id: 6,
      name: "ASUS ROG Maximus Z790",
      category: "Motherboards",
      sku: "MB-001",
      threshold: 40,
      manila: 55,
      quezon: 48,
      makati: 42,
      taguig: 38,
      pasig: 32,
      cebu: 28,
      davao: 22,
      cebuSouth: 18,
      price: 24995,
      movement: "+5%",
      status: "good",
    },
    {
      id: 7,
      name: "MSI B760 Tomahawk",
      category: "Motherboards",
      sku: "MB-002",
      threshold: 45,
      manila: 68,
      quezon: 58,
      makati: 52,
      taguig: 45,
      pasig: 40,
      cebu: 35,
      davao: 28,
      cebuSouth: 20,
      price: 12995,
      movement: "+10%",
      status: "good",
    },
    {
      id: 8,
      name: "Corsair Vengeance 32GB DDR5",
      category: "Memory (RAM)",
      sku: "RAM-001",
      threshold: 100,
      manila: 145,
      quezon: 128,
      makati: 115,
      taguig: 98,
      pasig: 88,
      cebu: 75,
      davao: 62,
      cebuSouth: 48,
      price: 7995,
      movement: "+18%",
      status: "good",
    },
    {
      id: 9,
      name: "G.Skill Trident Z5 64GB",
      category: "Memory (RAM)",
      sku: "RAM-002",
      threshold: 60,
      manila: 52,
      quezon: 45,
      makati: 38,
      taguig: 32,
      pasig: 28,
      cebu: 22,
      davao: 18,
      cebuSouth: 12,
      price: 15995,
      movement: "+3%",
      status: "good",
    },
    {
      id: 10,
      name: "Samsung 990 Pro 2TB NVMe",
      category: "Storage (SSD/HDD)",
      sku: "STO-001",
      threshold: 80,
      manila: 95,
      quezon: 82,
      makati: 75,
      taguig: 65,
      pasig: 58,
      cebu: 48,
      davao: 42,
      cebuSouth: 32,
      price: 12995,
      movement: "+15%",
      status: "good",
    },
    {
      id: 11,
      name: "WD Black 4TB HDD",
      category: "Storage (SSD/HDD)",
      sku: "STO-002",
      threshold: 70,
      manila: 88,
      quezon: 75,
      makati: 68,
      taguig: 58,
      pasig: 52,
      cebu: 45,
      davao: 38,
      cebuSouth: 28,
      price: 8995,
      movement: "-2%",
      status: "good",
    },
    {
      id: 12,
      name: "Corsair RM1000e PSU",
      category: "Power Supplies",
      sku: "PSU-001",
      threshold: 40,
      manila: 32,
      quezon: 28,
      makati: 24,
      taguig: 20,
      pasig: 18,
      cebu: 15,
      davao: 12,
      cebuSouth: 8,
      price: 15995,
      movement: "-12%",
      status: "low",
    },
    {
      id: 13,
      name: "Seasonic Focus Gold 850W",
      category: "Power Supplies",
      sku: "PSU-002",
      threshold: 45,
      manila: 48,
      quezon: 42,
      makati: 38,
      taguig: 32,
      pasig: 28,
      cebu: 24,
      davao: 18,
      cebuSouth: 14,
      price: 11995,
      movement: "+2%",
      status: "good",
    },
    {
      id: 14,
      name: "Lian Li O11 Dynamic Evo",
      category: "Cases",
      sku: "CSE-001",
      threshold: 35,
      manila: 42,
      quezon: 38,
      makati: 32,
      taguig: 28,
      pasig: 24,
      cebu: 20,
      davao: 16,
      cebuSouth: 12,
      price: 9995,
      movement: "+8%",
      status: "good",
    },
    {
      id: 15,
      name: "NZXT H9 Flow",
      category: "Cases",
      sku: "CSE-002",
      threshold: 30,
      manila: 35,
      quezon: 30,
      makati: 26,
      taguig: 22,
      pasig: 18,
      cebu: 15,
      davao: 12,
      cebuSouth: 8,
      price: 10995,
      movement: "+5%",
      status: "good",
    },
    {
      id: 16,
      name: "NZXT Kraken Elite 360",
      category: "Cooling Systems",
      sku: "CLN-001",
      threshold: 25,
      manila: 22,
      quezon: 18,
      makati: 15,
      taguig: 12,
      pasig: 10,
      cebu: 8,
      davao: 6,
      cebuSouth: 4,
      price: 18995,
      movement: "-10%",
      status: "low",
    },
    {
      id: 17,
      name: "Noctua NH-D15",
      category: "Cooling Systems",
      sku: "CLN-002",
      threshold: 30,
      manila: 28,
      quezon: 24,
      makati: 20,
      taguig: 18,
      pasig: 15,
      cebu: 12,
      davao: 10,
      cebuSouth: 6,
      price: 8495,
      movement: "-5%",
      status: "low",
    },
  ];

  // Stock Movement Data (Last 6 months)
  const stockMovementData = [
    { month: "Jun", received: 2450, sold: 2120, returned: 85 },
    { month: "Jul", received: 2680, sold: 2350, returned: 92 },
    { month: "Aug", received: 2820, sold: 2480, returned: 78 },
    { month: "Sep", received: 2950, sold: 2620, returned: 95 },
    { month: "Oct", received: 3120, sold: 2850, returned: 88 },
    { month: "Nov", received: 3280, sold: 2980, returned: 102 },
  ];

  // Branch Inventory Summary
  const branchInventorySummary = [
    {
      branch: "Manila Central",
      total: 2450,
      lowStock: 3,
      value: 8750000,
      turnover: 4.2,
    },
    {
      branch: "Quezon City",
      total: 2120,
      lowStock: 4,
      value: 7580000,
      turnover: 3.9,
    },
    {
      branch: "Makati",
      total: 1980,
      lowStock: 2,
      value: 6980000,
      turnover: 4.0,
    },
    {
      branch: "Taguig",
      total: 1850,
      lowStock: 5,
      value: 6520000,
      turnover: 3.7,
    },
    {
      branch: "Pasig",
      total: 1720,
      lowStock: 3,
      value: 6080000,
      turnover: 3.5,
    },
    {
      branch: "Cebu City",
      total: 1650,
      lowStock: 4,
      value: 5850000,
      turnover: 3.4,
    },
    {
      branch: "Davao",
      total: 1480,
      lowStock: 2,
      value: 5180000,
      turnover: 3.2,
    },
    {
      branch: "Cebu South",
      total: 1280,
      lowStock: 6,
      value: 4450000,
      turnover: 2.8,
    },
  ];

  // Low Stock Products Alert
  const lowStockProducts = products.filter(
    (p) =>
      p.manila < p.threshold ||
      p.quezon < p.threshold ||
      p.makati < p.threshold ||
      p.taguig < p.threshold ||
      p.pasig < p.threshold ||
      p.cebu < p.threshold ||
      p.davao < p.threshold ||
      p.cebuSouth < p.threshold,
  );

  // Category Distribution
  const categoryDistribution = categories.map((cat) => ({
    name: cat.name,
    value: products.filter((p) => p.category === cat.name).length,
    totalStock: products
      .filter((p) => p.category === cat.name)
      .reduce(
        (sum, p) =>
          sum +
          p.manila +
          p.quezon +
          p.makati +
          p.taguig +
          p.pasig +
          p.cebu +
          p.davao +
          p.cebuSouth,
        0,
      ),
  }));

  // Get filtered products based on search and stock filter
  const getFilteredProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (stockFilter === "low") {
      filtered = filtered.filter(
        (p) =>
          p.manila < p.threshold ||
          p.quezon < p.threshold ||
          p.makati < p.threshold ||
          p.taguig < p.threshold ||
          p.pasig < p.threshold ||
          p.cebu < p.threshold ||
          p.davao < p.threshold ||
          p.cebuSouth < p.threshold,
      );
    } else if (stockFilter === "critical") {
      filtered = filtered.filter(
        (p) =>
          p.manila < p.threshold * 0.5 ||
          p.quezon < p.threshold * 0.5 ||
          p.makati < p.threshold * 0.5 ||
          p.taguig < p.threshold * 0.5,
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Get stock value for a specific branch
  const getBranchStockValue = (branchKey) => {
    return products.reduce((sum, p) => sum + p[branchKey] * p.price, 0);
  };

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

  const StatusBadge = ({ status }) => {
    const config = {
      good: {
        bg: "bg-green-100",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircle,
        label: "In Stock",
      },
      low: {
        bg: "bg-yellow-100",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: AlertTriangle,
        label: "Low Stock",
      },
      critical: {
        bg: "bg-red-100",
        text: "text-red-700 dark:text-red-400",
        icon: Signal,
        label: "Critical",
      },
    };
    const { bg, text, icon: Icon, label } = config[status] || config.good;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
      >
        <Icon className="w-3 h-3" />
        {label}
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
              <p className="text-sm text-gray-500">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">₱55.8M</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ +8.5% vs last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Units in Stock</p>
              <p className="text-2xl font-bold text-gray-900">15,840</p>
              <p className="text-xs text-gray-400 mt-1">Across all branches</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Layers className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {lowStockProducts.length}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                {
                  lowStockProducts.filter(
                    (p) =>
                      p.manila < p.threshold * 0.5 ||
                      p.quezon < p.threshold * 0.5,
                  ).length
                }{" "}
                critical items
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inventory Turnover</p>
              <p className="text-2xl font-bold text-gray-900">3.8x</p>
              <p className="text-xs text-green-600 mt-1">
                ↑ +0.4 vs last quarter
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Activity className="w-6 h-6 text-purple-600" />
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
                placeholder="Search products by name, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Stock Levels</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical Stock</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Store className="w-4 h-4 text-gray-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Branches</option>
                <option value="manila">Manila Central</option>
                <option value="quezon">Quezon City</option>
                <option value="makati">Makati</option>
                <option value="taguig">Taguig</option>
                <option value="pasig">Pasig</option>
                <option value="cebu">Cebu City</option>
                <option value="davao">Davao</option>
                <option value="cebuSouth">Cebu South</option>
              </select>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inventory by Branch Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Levels by Branch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchInventorySummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="branch"
                angle={-45}
                textAnchor="end"
                height={80}
                stroke="#94a3b8"
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                formatter={(value) => [
                  `${value.toLocaleString()} units`,
                  "Inventory",
                ]}
              />
              <Legend />
              <Bar
                dataKey="total"
                fill="#3b82f6"
                name="Total Units"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="lowStock"
                fill="#ef4444"
                name="Low Stock Items"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="totalStock"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                        "#ec4899",
                        "#06b6d4",
                        "#84cc16",
                      ][index % 8]
                    }
                  />
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
        </div>
      </div>

      {/* Stock Movement Chart & Branch Value Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Movement Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Movement (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stockMovementData}>
              <defs>
                <linearGradient
                  id="receivedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="soldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} units`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="received"
                stroke="#10b981"
                fill="url(#receivedGradient)"
                name="Received"
              />
              <Area
                type="monotone"
                dataKey="sold"
                stroke="#ef4444"
                fill="url(#soldGradient)"
                name="Sold"
              />
              <Line
                type="monotone"
                dataKey="returned"
                stroke="#f59e0b"
                name="Returned"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Inventory Value Comparison */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Value by Branch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={branchInventorySummary}
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
                dataKey="branch"
                stroke="#94a3b8"
                width={80}
              />
              <Tooltip
                formatter={(value) => [
                  `₱${value.toLocaleString()}`,
                  "Inventory Value",
                ]}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alerts Section */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Low Stock Alerts</h3>
            <span className="text-sm text-yellow-600">
              {lowStockProducts.length} products need attention
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-3 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <StatusBadge status="low" />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Manila:</span>
                    <span
                      className={`ml-1 font-medium ${product.manila < product.threshold ? "text-red-600" : ""}`}
                    >
                      {product.manila}/{product.threshold}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Quezon:</span>
                    <span
                      className={`ml-1 font-medium ${product.quezon < product.threshold ? "text-red-600" : ""}`}
                    >
                      {product.quezon}/{product.threshold}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Makati:</span>
                    <span
                      className={`ml-1 font-medium ${product.makati < product.threshold ? "text-red-600" : ""}`}
                    >
                      {product.makati}/{product.threshold}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cebu:</span>
                    <span
                      className={`ml-1 font-medium ${product.cebu < product.threshold ? "text-red-600" : ""}`}
                    >
                      {product.cebu}/{product.threshold}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Product Inventory Status
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} products
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  SKU
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
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const branchToCheck =
                  selectedBranch !== "all" ? selectedBranch : "manila";
                const stockValue =
                  selectedBranch !== "all"
                    ? product[selectedBranch]
                    : product.manila;
                const threshold = product.threshold;
                let status = "good";
                if (stockValue < threshold * 0.5) status = "critical";
                else if (stockValue < threshold) status = "low";

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {product.category}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.manila < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.manila}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        /{product.threshold}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.quezon < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.quezon}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.makati < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.makati}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.taguig < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.taguig}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.pasig < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.pasig}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.cebu < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.cebu}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.davao < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.davao}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-medium ${product.cebuSouth < product.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {product.cebuSouth}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={status} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetails(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedProduct.sku} • {selectedProduct.category}
                </p>
              </div>
              <button
                onClick={() => setShowProductDetails(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Unit Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Movement (MoM)</p>
                  <p
                    className={`text-2xl font-bold ${selectedProduct.movement.includes("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedProduct.movement}
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">
                Stock Levels by Branch
              </h4>
              <div className="space-y-3">
                {[
                  {
                    name: "Manila Central",
                    stock: selectedProduct.manila,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Quezon City",
                    stock: selectedProduct.quezon,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Makati",
                    stock: selectedProduct.makati,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Taguig",
                    stock: selectedProduct.taguig,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Pasig",
                    stock: selectedProduct.pasig,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Cebu City",
                    stock: selectedProduct.cebu,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Davao",
                    stock: selectedProduct.davao,
                    threshold: selectedProduct.threshold,
                  },
                  {
                    name: "Cebu South",
                    stock: selectedProduct.cebuSouth,
                    threshold: selectedProduct.threshold,
                  },
                ].map((branch) => (
                  <div key={branch.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{branch.name}</span>
                      <span
                        className={`font-medium ${branch.stock < branch.threshold ? "text-red-600" : "text-gray-700"}`}
                      >
                        {branch.stock} / {branch.threshold} units
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${branch.stock < branch.threshold * 0.5 ? "bg-red-500" : branch.stock < branch.threshold ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{
                          width: `${Math.min(100, (branch.stock / branch.threshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Request Replenishment
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  View History
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
                Export Inventory Report
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
                    Product Inventory Table
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Low Stock Alerts
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Stock Movement Charts
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />{" "}
                    Branch Summary
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

export default InventoryComparisonPage;
