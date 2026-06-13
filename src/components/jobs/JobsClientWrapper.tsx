"use client";

import { JobFormDB } from "@/utils/types/DashboardTypes";
import { JobFilters } from "@/utils/types/JobTypes";
import React, { useState, useMemo } from "react";
import JobFilterBar from "./JobFilter";
import JobCard from "./JobCard";

interface JobsClientWrapperProps {
  initialJobs: JobFormDB[];
}

export default function JobsClientWrapper({
  initialJobs,
}: JobsClientWrapperProps) {
  // 1. Initialize filter state
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: "",
    category: "All",
    jobType: "All",
    isRemote: false,
  });

  // 2. Handle state updates from the filter bar
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // 3. Compute the filtered array purely on the client
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const search = filters.searchQuery.toLowerCase();
      const matchesSearch =
        (job.title || "").toLowerCase().includes(search) ||
        (job.companyName || "").toLowerCase().includes(search);
      const matchesCategory =
        filters.category === "All" || job.category === filters.category;
      const matchesJobType =
        filters.jobType === "All" || job.jobType === filters.jobType;
      const matchesRemote = filters.isRemote ? job.isRemote === true : true;

      return (
        matchesSearch && matchesCategory && matchesJobType && matchesRemote
      );
    });
  }, [initialJobs, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Interactive Filter Bar */}
      <JobFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-lg font-medium text-white mb-1">No jobs found</p>
          <p className="text-sm text-zinc-400">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
