import { GetJobsFilters } from "@/utils/types/JobTypes";
import { ServerFetch } from "./server"

export const getCompanyjobs = async(companyId: string | number, status = "active") => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?companyId=${companyId}&status=${status}`)
    return await res.json()
}


export const getJobs = async (filters: GetJobsFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.searchQuery) params.append("searchQuery", filters.searchQuery);
  if (filters.category && filters.category !== "All") params.append("category", filters.category);
  if (filters.jobType && filters.jobType !== "All") params.append("jobType", filters.jobType);
  if (filters.isRemote) params.append("isRemote", "true");
  
  // NEW: Append Pagination Parameters
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("perPage", filters.limit.toString());

  const queryString = params.toString();
  
  // Cleaned up the URL construction 
  const url = queryString ? `/api/jobs?${queryString}` : "/api/jobs";

  return ServerFetch(url);
};

export const getJobById = async(id: string) => {
    return ServerFetch(`/api/jobs/${id}`)
}