import { useState } from "react";
import BranchesTableRow from "./BranchesTableRow";
import { Plus, Search, Store } from "lucide-react";
import BranchDetailsModal from "./BranchDetailsModal";
import BranchFormModal from "./BranchFormModal";
import { fetchData } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";

const BranchesTable = ({ filteredBranches }: { filteredBranches: any }) => {
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);
  const [modalType, setModalType] = useState<"view" | "create" | "edit" | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["branches-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/branches`),
  });

  const handleViewBranch = (branch: any) => {
    setSelectedBranch(branch);
    setModalType("view");
  };

  // Edit Branch
  const handleEditBranch = (branch: any) => {
    setSelectedBranch(branch);
    setModalType("edit");
  };

  // Create Branch
  const handleCreateBranch = () => {
    setSelectedBranch(null);
    setModalType("create");
  };

  const handleCloseModal = () => {
    setSelectedBranch(null);
    setModalType(null);
  };

  console.log("Branches: ", data);

  const isFormModalOpen = modalType === "create" || modalType === "edit";
  const isDetailsModalOpen = modalType === "view";

  return (
    <div className="flex-1 overflow-auto mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 border-b border-gray-200">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search branch..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Add Branch Button */}
          <button
            onClick={handleCreateBranch}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Branch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {/* Column Headers Row */}
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Branch
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Manager
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Sales (MTD)
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Inventory
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Productivity
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data?.map((branch: any) => (
                <BranchesTableRow
                  key={branch.id}
                  branch={branch}
                  handleCreateBranch={handleCreateBranch}
                  handleViewBranch={handleViewBranch}
                  handleEditBranch={handleEditBranch}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No branches found</p>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700">
              Clear search
            </button>
          </div>
        )}
      </div>

      {isDetailsModalOpen && selectedBranch && (
        <BranchDetailsModal
          selectedBranch={selectedBranch}
          isModalOpen={isDetailsModalOpen}
          isCloseModal={handleCloseModal}
        />
      )}

      {isFormModalOpen && (
        <BranchFormModal
          isModalOpen={isFormModalOpen}
          isCloseModal={handleCloseModal}
          mode={modalType}
        />
      )}
    </div>
  );
};

export default BranchesTable;
