"use client";

import { JobFormDB } from "@/utils/types/DashboardTypes";
import { JobFilters } from "@/utils/types/JobTypes";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import JobFilterBar from "./JobFilter";
import JobCard from "./JobCard";
import { PaginationWithSummary } from "./Pagination";

// Extended interface to include 'page' in state
interface ExtendedJobFilters extends JobFilters {
  page: number;
}

interface JobsClientWrapperProps {
  jobs: JobFormDB[];
  total: number;
}

export default function JobsClientWrapper({ jobs, total }: JobsClientWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const [filters, setFilters] = useState<ExtendedJobFilters>({
    searchQuery: searchParams.get("searchQuery") || "",
    category: searchParams.get("category") || "All",
    jobType: searchParams.get("jobType") || "All",
    isRemote: searchParams.get("isRemote") === "true",
    page: parseInt(searchParams.get("page") || "1"),
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearchQuery = searchParams.get("searchQuery") || "";
    const newCategory = searchParams.get("category") || "All";
    const newJobType = searchParams.get("jobType") || "All";
    const newIsRemote = searchParams.get("isRemote") === "true";
    const newPage = parseInt(searchParams.get("page") || "1");

    setFilters((prev) => {
      if (
        prev.searchQuery === newSearchQuery &&
        prev.category === newCategory &&
        prev.jobType === newJobType &&
        prev.isRemote === newIsRemote &&
        prev.page === newPage
      ) {
        return prev;
      }
      return {
        searchQuery: newSearchQuery,
        category: newCategory,
        jobType: newJobType,
        isRemote: newIsRemote,
        page: newPage,
      };
    });
  }, [searchParams]);

  // When filters change, reset page to 1
  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  // Dedicated handler for pagination clicks
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();

      if (filters.searchQuery) params.set("searchQuery", filters.searchQuery);
      if (filters.category !== "All") params.set("category", filters.category);
      if (filters.jobType !== "All") params.set("jobType", filters.jobType);
      if (filters.isRemote) params.set("isRemote", "true");
      if (filters.page > 1) params.set("page", filters.page.toString()); // Only add page if > 1

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <JobFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {jobs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          
          <div className="mt-8">
            <PaginationWithSummary 
              totalItems={total} 
              currentPage={filters.page} 
              onPageChange={handlePageChange} 
            />
          </div>
        </>
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