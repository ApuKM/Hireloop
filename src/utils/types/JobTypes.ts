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

export interface MongoOid {
  $oid: string;
}

export interface MongoDate {
  $date: string;
}

export interface RawApplicantData {
  _id: MongoOid;
  jobId: string; // Stored as a plain string ID in this document
  applicantId: string; // Stored as a plain string ID in this document
  applicantEmail: string;
  resumeUrl: string;
  portfolioUrl: string;
  linkedinUrl: string;
  coverLetter: string;
  createdAt: MongoDate;
}