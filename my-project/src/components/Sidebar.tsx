import {
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  BarChart3,
  LogOut,
  Users2,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { id: "", label: "Dashboard", icon: LayoutDashboard },
  { id: "branches", label: "Branches", icon: Store },
  { id: "sales", label: "Sales Analytics", icon: TrendingUp },
  { id: "inventory", label: "Inventory Analytics", icon: Package },
  { id: "productivity", label: "Employee Productivity", icon: Users },
  { id: "leaderboards", label: "Leaderboards", icon: Trophy },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "users", label: "Users", icon: Users2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_PATH = `/admin`;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BranchPulse</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            // ✅ build full path correctly
            const fullPath = item?.id ? `${BASE_PATH}/${item?.id}` : BASE_PATH;

            // ✅ correct active logic
            const isActive =
              item?.id === ""
                ? location.pathname === BASE_PATH
                : location.pathname.startsWith(fullPath);

            return (
              <Link
                to={fullPath}
                key={item?.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
