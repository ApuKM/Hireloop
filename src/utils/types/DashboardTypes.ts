import React from "react";

export interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

export interface StatSectionProps {
  stats: StatItem[];
  className?: string;
}

export interface JobFormValues {
  title: string;
  category: string;
  jobType: string;
  currency: string;
  salaryMin: string;
  salaryMax: string;
  location: string;
  isRemote: boolean;
  deadline: string;
  responsibilities: string;
  requirements: string;
  status?: string | undefined;
}

export interface JobFormDB extends JobFormValues {
  _id: string;
  createdAt: {
    $date: string;
  };
  companyName: string;
  companyId: string;
  companyLogo: string;
}

export type CompanyStatus = "approved" | "pending" | "rejected";

export interface CompanyData {
  _id: string;
  formName: string;
  formIndustry: string;
  formLocation: string;
  formWebsite: string;
  formEmployeeCount: string;
  formDescription: string;
  companyLogo: string | null;
  status: CompanyStatus;
  recruiterId: string | undefined;
}

export type CompanyInput = Omit<CompanyData, "_id">

export interface BetterAuthUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: string;
}

// If your variable can also be null, define it like this:
export type UserSession = BetterAuthUser | null;


// export interface CompanyDetails {
//   id: string;
//   name: string;
//   industry: string;
//   website: string;
//   location: string;
//   employeeCount: string;
//   description: string;
//   logoUrl?: string;
//   status: CompanyStatus;
// }
