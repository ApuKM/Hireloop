"use server";

import { CompanyInput, CompanyStatus } from "@/utils/types/DashboardTypes";
import { MutateData, ServerFetch } from "./server";
import { getUserSession } from "@/utils/sessions/sessions";
import { revalidatePath } from "next/cache";

export const getAllCompany = async () => {
  return ServerFetch("/api/companies");
};

export const createCompany = async (newCompanyData: CompanyInput) => {
  return MutateData("/api/company", newCompanyData);
};

export const updateCompany = async (
  id: string,
  updateData: { status: CompanyStatus },
) => {
  const result = MutateData(`/api/companies/${id}`, updateData, "PATCH");
  revalidatePath("/dashboard/admin/companies");
  return result;
};

export const getRecruiterCompany = async (recruiterId: string | undefined) => {
  if (!recruiterId) return [];
  return ServerFetch(`/api/my/company?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
