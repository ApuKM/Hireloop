"use server";

import { CompanyData } from "@/utils/types/DashboardTypes";
import { MutateData, ServerFetch } from "./server";
import { getUserSession } from "@/utils/sessions/sessions";

export const createCompany = async (newCompanyData: CompanyData) => {
  return MutateData("/api/company", newCompanyData);
};

export const getRecruiterCompany = async (recruiterId: string | undefined) => {
  if (!recruiterId) return [];
  return ServerFetch(`/api/my/company?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
