import { useState } from "react";
import {
  X,
  Store,
  Search,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  User,
  DollarSign,
  Boxes,
  Phone,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Building2,
  Activity,
  Power,
  PowerOff,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatsCards from "../components/StatsCards";
import type { SummaryStatType } from "../lib/types";
import BranchAnalyticsCharts from "../components/branches/BranchAnalyticsCharts";
import BranchesTable from "../components/branches/BranchesTable";

const BranchManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showBranchDetails, setShowBranchDetails] = useState(false);

  // Branch Data
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Manila Central",
      code: "MNL-001",
      location: "123 Ayala Avenue, Makati City",
      region: "Metro Manila",
      status: "active",
      manager: "John Reyes",
      managerEmail: "john.reyes@branchpulse.com",
      managerPhone: "+63 912 345 6789",
      sales: 425000,
      inventory: 2450,
      employees: 28,
      productivity: 94,
      established: "2018-03-15",
      contactNumber: "+63 2 8123 4567",
      coordinates: { lat: 14.5547, lng: 121.0244 },
    },
    {
      id: 2,
      name: "Quezon City",
      code: "QC-002",
      location: "45 Eastwood Avenue, Quezon City",
      region: "Metro Manila",
      status: "active",
      manager: "Maria Santos",
      managerEmail: "maria.santos@branchpulse.com",
      managerPhone: "+63 917 234 5678",
      sales: 389000,
      inventory: 2120,
      employees: 24,
      productivity: 89,
      established: "2018-06-20",
      contactNumber: "+63 2 8234 5678",
    },
    {
      id: 3,
      name: "Makati",
      code: "MAK-003",
      location: "78 Salcedo Village, Makati City",
      region: "Metro Manila",
      status: "active",
      manager: "Antonio Cruz",
      managerEmail: "antonio.cruz@branchpulse.com",
      managerPhone: "+63 918 345 6789",
      sales: 367000,
      inventory: 1980,
      employees: 22,
      productivity: 91,
      established: "2018-09-10",
      contactNumber: "+63 2 8345 6789",
    },
    {
      id: 4,
      name: "Taguig",
      code: "TAG-004",
      location: "56 BGC High Street, Taguig",
      region: "Metro Manila",
      status: "active",
      manager: "Kristine Lopez",
      managerEmail: "kristine.lopez@branchpulse.com",
      managerPhone: "+63 919 456 7890",
      sales: 342000,
      inventory: 1850,
      employees: 20,
      productivity: 87,
      established: "2019-01-15",
      contactNumber: "+63 2 8456 7890",
    },
    {
      id: 5,
      name: "Pasig",
      code: "PSG-005",
      location: "34 Ortigas Center, Pasig City",
      region: "Metro Manila",
      status: "inactive",
      manager: "Ramon Villanueva",
      managerEmail: "ramon.villanueva@branchpulse.com",
      managerPhone: "+63 920 567 8901",
      sales: 318000,
      inventory: 1720,
      employees: 18,
      productivity: 84,
      established: "2019-04-20",
      contactNumber: "+63 2 8567 8901",
    },
    {
      id: 6,
      name: "Cebu City",
      code: "CEB-006",
      location: "89 Osmeña Boulevard, Cebu City",
      region: "Visayas",
      status: "active",
      manager: "Grace Fernandez",
      managerEmail: "grace.fernandez@branchpulse.com",
      managerPhone: "+63 921 678 9012",
      sales: 295000,
      inventory: 1650,
      employees: 18,
      productivity: 82,
      established: "2019-07-25",
      contactNumber: "+63 32 8678 9012",
    },
    {
      id: 7,
      name: "Davao",
      code: "DVO-007",
      location: "12 Ecoland Drive, Davao City",
      region: "Mindanao",
      status: "active",
      manager: "Roberto Dela Cruz",
      managerEmail: "roberto.delacruz@branchpulse.com",
      managerPhone: "+63 922 789 0123",
      sales: 278000,
      inventory: 1480,
      employees: 16,
      productivity: 80,
      established: "2019-10-30",
      contactNumber: "+63 82 8789 0123",
    },
    {
      id: 8,
      name: "Cebu South",
      code: "CEBS-008",
      location: "45 South Road, Cebu City",
      region: "Visayas",
      status: "active",
      manager: "Michael Tan",
      managerEmail: "michael.tan@branchpulse.com",
      managerPhone: "+63 923 890 1234",
      sales: 178000,
      inventory: 1280,
      employees: 14,
      productivity: 68,
      established: "2020-02-14",
      contactNumber: "+63 32 8890 1234",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    region: "",
    manager: "",
    managerEmail: "",
    managerPhone: "",
    contactNumber: "",
  });

  // Filter branches
  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || branch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sales data for chart
  const salesChartData = branches
    .map((b) => ({
      name: b.name,
      sales: b.sales,
      productivity: b.productivity,
    }))
    .sort((a, b) => b.sales - a.sales);

  // Region distribution
  const regionData = branches.reduce((acc, branch) => {
    acc[branch.region] = (acc[branch.region] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(regionData).map(([name, value]) => ({
    name,
    value,
    color: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
      Math.floor(Math.random() * 5)
    ],
  }));

  const handleAddBranch = () => {
    const newBranch = {
      id: branches.length + 1,
      code: `${formData.region.substring(0, 3).toUpperCase()}-${String(branches.length + 1).padStart(3, "0")}`,
      name: formData.name,
      location: formData.location,
      region: formData.region,
      status: "active",
      manager: formData.manager,
      managerEmail: formData.managerEmail,
      managerPhone: formData.managerPhone,
      contactNumber: formData.contactNumber,
      sales: 0,
      inventory: 0,
      employees: 0,
      productivity: 0,
      established: new Date().toISOString().split("T")[0],
    };
    setBranches([...branches, newBranch]);
    setShowAddModal(false);
    setFormData({
      name: "",
      location: "",
      region: "",
      manager: "",
      managerEmail: "",
      managerPhone: "",
      contactNumber: "",
    });
  };

  const handleToggleStatus = (branchId) => {
    setBranches(
      branches.map((branch) =>
        branch.id === branchId
          ? {
              ...branch,
              status: branch.status === "active" ? "inactive" : "active",
            }
          : branch,
      ),
    );
  };

  const handleDeleteBranch = (branchId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this branch? This action cannot be undone.",
      )
    ) {
      setBranches(branches.filter((branch) => branch.id !== branchId));
    }
  };

  // Status Badge Component

  const summaryStats: SummaryStatType[] = [
    {
      title: "Total Branches",
      value: "24",
      subtitle: "21 Active",
      subtitleColor: "text-green-600",
      icon: Building2,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Sales",
      value: "₱8.4M",
      subtitle: "+12.5% from last month",
      subtitleColor: "text-green-600",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Inventory",
      value: "18,450",
      subtitle: "Units across branches",
      subtitleColor: "text-gray-400",
      icon: Boxes,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg Productivity",
      value: "87%",
      subtitle: "Across all branches",
      subtitleColor: "text-gray-400",
      icon: Activity,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Stats Cards */}
      <StatsCards summaryStats={summaryStats} />

      {/* Branch Analytics Charts */}
      <BranchAnalyticsCharts
        salesChartData={salesChartData}
        pieData={pieData}
      />

      {/* Branch Table with Filters Above Headers */}
      <BranchesTable filteredBranches={filteredBranches} />
    </div>
  );
};

export default BranchManagementPage;
