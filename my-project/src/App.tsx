import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RoleRedirect from "./components/RoleRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import BranchManagementPage from "./pages/Branches";
import SalesComparisonPage from "./pages/Sales";
import InventoryComparisonPage from "./pages/Inventory";
import EmployeeProductivityPage from "./pages/Employees";
import BranchLeaderboardsPage from "./pages/Leaderboard";
import CompanyPerformanceReportsPage from "./pages/Reports";
import UserManagementPage from "./pages/Users";
import SystemSettingsPage from "./pages/Settings";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["central_admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="branches" element={<BranchManagementPage />} />
        <Route path="sales" element={<SalesComparisonPage />} />
        <Route path="inventory" element={<InventoryComparisonPage />} />
        <Route path="productivity" element={<EmployeeProductivityPage />} />
        <Route path="leaderboards" element={<BranchLeaderboardsPage />} />
        <Route path="reports" element={<CompanyPerformanceReportsPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="settings" element={<SystemSettingsPage />} />
      </Route>
    </>,
  ),
);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
