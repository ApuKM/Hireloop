"use client";

import { JobFormDB } from "@/utils/types/DashboardTypes";
import { JobFilters } from "@/utils/types/JobTypes";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import JobFilterBar from "./JobFilter";
import JobCard from "./JobCard";

interface JobsClientWrapperProps {
  jobs: JobFormDB[];
}

export default function JobsClientWrapper({
  jobs,
}: JobsClientWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initialize state directly from the URL so reloading the page keeps filters
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: searchParams.get("searchQuery") || "",
    category: searchParams.get("category") || "All",
    jobType: searchParams.get("jobType") || "All",
    isRemote: searchParams.get("isRemote") === "true",
  });

  // 2. Handle immediate state updates for the UI
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // 3. Sync state to the URL with a Debounce
  useEffect(() => {
    // Wait 300ms after the user stops typing/clicking before pushing to the URL
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.searchQuery) params.set("searchQuery", filters.searchQuery);
      else params.delete("searchQuery");

      if (filters.category !== "All") params.set("category", filters.category);
      else params.delete("category");

      if (filters.jobType !== "All") params.set("jobType", filters.jobType);
      else params.delete("jobType");

      if (filters.isRemote) params.set("isRemote", "true");
      else params.delete("isRemote");

      // Update URL without refreshing the page or scrolling to the top
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Interactive Filter Bar */}
      <JobFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Grid - We just map over whatever the server gives us now! */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
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