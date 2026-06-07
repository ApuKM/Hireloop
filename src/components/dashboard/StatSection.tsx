import React from "react";
import StatCard from "./StatCard";
import { StatSectionProps } from "@/utils/types/DashboardTypes";

const StatSection = ({ stats, className = "" }: StatSectionProps) => {
  return (
    <section
      className={`py-6 px-4 w-full ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default StatSection;
