import { useState } from "react";
import { Menu, X, Store, Calendar, RefreshCw, ChevronDown } from "lucide-react";

const HeaderNavigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("last30");
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-500">
                Overview of branch performance and analytics
              </p>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="last7">Last 7 days</option>
                <option value="last30">Last 30 days</option>
                <option value="last90">Last 90 days</option>
                <option value="thisYear">This year</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
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
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <button className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
