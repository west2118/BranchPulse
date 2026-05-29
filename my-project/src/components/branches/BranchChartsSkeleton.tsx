import ChartCardSkeleton from "../skeletons/ChartCardSkeleton";

const BranchChartsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Branch Sales Comparison Chart Skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <ChartCardSkeleton />
      </div>

      {/* Branch Distribution by Region Chart Skeleton */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-56"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <ChartCardSkeleton />
      </div>
    </div>
  );
};

export default BranchChartsSkeleton;
