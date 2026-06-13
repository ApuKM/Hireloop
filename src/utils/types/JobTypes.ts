// types/filters.ts
export interface JobFilters {
  searchQuery: string;
  category: string;
  jobType: string;
  isRemote: boolean;
}

export interface JobApplicationPayload {
  jobId: string;
  applicantId: string;
  applicantEmail: string;
  resumeUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
}