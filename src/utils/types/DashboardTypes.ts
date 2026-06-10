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
  benefits: string;
  status?: string | undefined;
}

export interface CompanyData {
    formName: string;
    formIndustry: string;
      formLocation: string;
      formWebsite: string;
      formEmployeeCount: string;
      formDescription: string;
      companyLogo: string | null;
}

