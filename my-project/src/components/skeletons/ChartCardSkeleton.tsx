import { BarChart3 } from "lucide-react";

const ChartCardSkeleton = () => {
  return (
    <div className="w-full h-76 bg-gray-50 rounded-xl flex items-center justify-center animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <BarChart3 className="w-20 h-20 text-gray-300" strokeWidth={1.5} />
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default ChartCardSkeleton;
