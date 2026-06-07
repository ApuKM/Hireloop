import { StatItem } from "@/utils/types/DashboardTypes";
import React from "react";

const StatCard = ({icon, label, value}: StatItem) => {
  return (
    <div className="bg-[#1C1C1F] rounded-lg p-5 flex flex-col space-y-4 shadow-xl hover:ring ring-orange-200 transition-all duration-200">
      <div className="flex items-center justify-center">
        <div className="h-12 w-12 flex items-center justify-center bg-[#252528] rounded-md text-white">
          {icon}
        </div>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
