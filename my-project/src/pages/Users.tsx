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
  Edit2,
  Trash2,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Key,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Award,
  Crown,
  Building2,
  Globe,
  Star,
  MoreVertical,
  Activity,
  LogOut,
  Power,
  PowerOff,
  ShieldCheck,
  ShieldAlert,
  UserCog,
  Database,
  Fingerprint,
  Smartphone,
  AtSign,
  Briefcase,
  BarChart3,
  XCircle,
} from "lucide-react";

const UserManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // User Data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Reyes",
      email: "john.reyes@branchpulse.com",
      role: "admin",
      roleLabel: "Central Admin",
      branch: "All Branches",
      branchCode: "ALL",
      status: "active",
      lastActive: "2024-01-15T10:30:00",
      createdAt: "2023-01-10",
      phone: "+63 912 345 6789",
      avatar: "JR",
      permissions: [
        "full_access",
        "manage_users",
        "manage_branches",
        "view_reports",
        "export_data",
      ],
      loginCount: 245,
      lastLoginIP: "192.168.1.100",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@branchpulse.com",
      role: "branch_manager",
      roleLabel: "Branch Manager",
      branch: "Manila Central",
      branchCode: "MNL-001",
      status: "active",
      lastActive: "2024-01-15T09:15:00",
      createdAt: "2023-03-15",
      phone: "+63 917 234 5678",
      avatar: "MS",
      permissions: [
        "view_branch_sales",
        "manage_inventory",
        "view_employee_performance",
        "generate_reports",
      ],
      loginCount: 189,
      lastLoginIP: "192.168.1.50",
    },
    {
      id: 3,
      name: "Antonio Cruz",
      email: "antonio.cruz@branchpulse.com",
      role: "branch_manager",
      roleLabel: "Branch Manager",
      branch: "Makati",
      branchCode: "MAK-003",
      status: "active",
      lastActive: "2024-01-14T16:45:00",
      createdAt: "2023-03-20",
      phone: "+63 918 345 6789",
      avatar: "AC",
      permissions: [
        "view_branch_sales",
        "manage_inventory",
        "view_employee_performance",
        "generate_reports",
      ],
      loginCount: 156,
      lastLoginIP: "192.168.1.51",
    },
    {
      id: 4,
      name: "Kristine Lopez",
      email: "kristine.lopez@branchpulse.com",
      role: "staff",
      roleLabel: "Staff",
      branch: "Quezon City",
      branchCode: "QC-002",
      status: "active",
      lastActive: "2024-01-15T14:20:00",
      createdAt: "2023-06-01",
      phone: "+63 919 456 7890",
      avatar: "KL",
      permissions: ["view_inventory", "process_sales", "view_daily_reports"],
      loginCount: 98,
      lastLoginIP: "192.168.1.52",
    },
    {
      id: 5,
      name: "Ramon Villanueva",
      email: "ramon.villanueva@branchpulse.com",
      role: "staff",
      roleLabel: "Staff",
      branch: "Taguig",
      branchCode: "TAG-004",
      status: "inactive",
      lastActive: "2024-01-10T11:00:00",
      createdAt: "2023-07-15",
      phone: "+63 920 567 8901",
      avatar: "RV",
      permissions: ["view_inventory", "process_sales", "view_daily_reports"],
      loginCount: 67,
      lastLoginIP: "192.168.1.53",
    },
    {
      id: 6,
      name: "Grace Fernandez",
      email: "grace.fernandez@branchpulse.com",
      role: "branch_manager",
      roleLabel: "Branch Manager",
      branch: "Cebu City",
      branchCode: "CEB-006",
      status: "active",
      lastActive: "2024-01-15T08:30:00",
      createdAt: "2023-04-10",
      phone: "+63 921 678 9012",
      avatar: "GF",
      permissions: [
        "view_branch_sales",
        "manage_inventory",
        "view_employee_performance",
        "generate_reports",
      ],
      loginCount: 142,
      lastLoginIP: "192.168.1.54",
    },
    {
      id: 7,
      name: "Roberto Dela Cruz",
      email: "roberto.delacruz@branchpulse.com",
      role: "staff",
      roleLabel: "Staff",
      branch: "Davao",
      branchCode: "DVO-007",
      status: "active",
      lastActive: "2024-01-14T13:45:00",
      createdAt: "2023-08-20",
      phone: "+63 922 789 0123",
      avatar: "RD",
      permissions: ["view_inventory", "process_sales", "view_daily_reports"],
      loginCount: 54,
      lastLoginIP: "192.168.1.55",
    },
    {
      id: 8,
      name: "Michael Tan",
      email: "michael.tan@branchpulse.com",
      role: "viewer",
      roleLabel: "Viewer",
      branch: "All Branches",
      branchCode: "ALL",
      status: "active",
      lastActive: "2024-01-14T10:00:00",
      createdAt: "2023-10-01",
      phone: "+63 923 890 1234",
      avatar: "MT",
      permissions: ["view_reports", "view_dashboard"],
      loginCount: 32,
      lastLoginIP: "192.168.1.56",
    },
  ]);

  // Role Definitions
  const roles = [
    {
      id: "admin",
      name: "Central Admin",
      icon: Crown,
      color: "purple",
      description:
        "Full system access. Can manage users, branches, and all settings.",
      permissions: [
        "full_access",
        "manage_users",
        "manage_branches",
        "manage_inventory",
        "view_all_reports",
        "export_data",
        "manage_roles",
      ],
    },
    {
      id: "branch_manager",
      name: "Branch Manager",
      icon: UserCog,
      color: "blue",
      description:
        "Manage assigned branch. Can view sales, inventory, and employee performance.",
      permissions: [
        "view_branch_sales",
        "manage_inventory",
        "view_employee_performance",
        "generate_reports",
        "manage_staff",
      ],
    },
    {
      id: "staff",
      name: "Staff",
      icon: Users,
      color: "green",
      description: "Basic access. Can process sales and view inventory.",
      permissions: ["view_inventory", "process_sales", "view_daily_reports"],
    },
    {
      id: "viewer",
      name: "Viewer",
      icon: Eye,
      color: "gray",
      description: "Read-only access. Can view reports and dashboards.",
      permissions: ["view_reports", "view_dashboard"],
    },
  ];

  const branches = [
    { id: 1, name: "Manila Central", code: "MNL-001" },
    { id: 2, name: "Quezon City", code: "QC-002" },
    { id: 3, name: "Makati", code: "MAK-003" },
    { id: 4, name: "Taguig", code: "TAG-004" },
    { id: 5, name: "Pasig", code: "PSG-005" },
    { id: 6, name: "Cebu City", code: "CEB-006" },
    { id: 7, name: "Davao", code: "DVO-007" },
    { id: 8, name: "Cebu South", code: "CEBS-008" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "staff",
    branch: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roleLabel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "branches", label: "Branches", icon: Store },
    { id: "sales", label: "Sales Analytics", icon: TrendingUp },
    { id: "inventory", label: "Inventory Analytics", icon: Package },
    { id: "productivity", label: "Employee Productivity", icon: Users },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "users", label: "User Management", icon: Settings },
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

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        status === "active"
          ? "bg-green-100 text-green-700 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:text-red-400"
      }`}
    >
      {status === "active" ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );

  const RoleBadge = ({ role }) => {
    const config = {
      admin: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: Crown,
      },
      branch_manager: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: UserCog,
      },
      staff: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: Users,
      },
      viewer: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        icon: Eye,
      },
    };
    const { bg, text, icon: Icon } = config[role] || config.viewer;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
      >
        <Icon className="w-3 h-3" />
        {role === "admin"
          ? "Central Admin"
          : role === "branch_manager"
            ? "Branch Manager"
            : role === "staff"
              ? "Staff"
              : "Viewer"}
      </span>
    );
  };

  const handleAddUser = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      roleLabel:
        formData.role === "admin"
          ? "Central Admin"
          : formData.role === "branch_manager"
            ? "Branch Manager"
            : formData.role === "staff"
              ? "Staff"
              : "Viewer",
      branch: formData.branch
        ? branches.find((b) => b.id === parseInt(formData.branch))?.name ||
          "All Branches"
        : "All Branches",
      branchCode: formData.branch
        ? branches.find((b) => b.id === parseInt(formData.branch))?.code ||
          "ALL"
        : "ALL",
      status: "active",
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString().split("T")[0],
      phone: formData.phone,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      permissions: roles.find((r) => r.id === formData.role)?.permissions || [],
      loginCount: 0,
      lastLoginIP: "N/A",
    };

    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      role: "staff",
      branch: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const handleDeleteUser = (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleResetPassword = () => {
    alert(`Password reset link sent to ${selectedUser?.email}`);
    setShowResetPasswordModal(false);
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const managerCount = users.filter((u) => u.role === "branch_manager").length;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-xs text-green-600 mt-1">
                {activeUsers} Active
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Administrators</p>
              <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
              <p className="text-xs text-gray-400">Full system access</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Branch Managers</p>
              <p className="text-2xl font-bold text-gray-900">{managerCount}</p>
              <p className="text-xs text-gray-400">Manage assigned branches</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <UserCog className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Staff & Viewers</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalUsers - adminCount - managerCount}
              </p>
              <p className="text-xs text-gray-400">Limited access</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {roles.map((role) => {
          const Icon = role.icon;
          const roleCount = users.filter((u) => u.role === role.id).length;
          return (
            <div
              key={role.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${role.color}-100 rounded-xl`}>
                  <Icon className={`w-5 h-5 text-${role.color}-600`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{role.name}</h4>
                  <p className="text-xs text-gray-500">{roleCount} users</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{role.description}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="admin">Central Admin</option>
                <option value="branch_manager">Branch Manager</option>
                <option value="staff">Staff</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredUsers.length} users
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  User
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Assigned Branch
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Last Active
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                      <p className="text-xs text-gray-400">
                        Logins: {user.loginCount}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-600">{user.branch}</p>
                      <p className="text-xs text-gray-400">{user.branchCode}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <p className="text-sm text-gray-600">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(user.lastActive).toLocaleTimeString()}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowResetPasswordModal(true);
                        }}
                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Reset Password"
                      >
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === "active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          user.status === "active"
                            ? "Disable User"
                            : "Enable User"
                        }
                      >
                        {user.status === "active" ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
              <p className="text-sm text-gray-500">
                Create a new system user account
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@branchpulse.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+63 XXX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="staff">Staff</option>
                  <option value="branch_manager">Branch Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              {formData.role !== "viewer" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Branch
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Edit User</h3>
              <p className="text-sm text-gray-500">Update user information</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.phone}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  defaultValue={selectedUser.role}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Central Admin</option>
                  <option value="branch_manager">Branch Manager</option>
                  <option value="staff">Staff</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Branch
                </label>
                <select
                  defaultValue={selectedUser.branch}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Reset Password
              </h3>
              <p className="text-sm text-gray-500">
                Send password reset link to user
              </p>
            </div>
            <div className="p-6">
              <div className="bg-yellow-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Confirm Reset
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      A password reset link will be sent to {selectedUser.email}
                      . The user will be required to set a new password.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {selectedUser.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    User will receive reset instructions
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
