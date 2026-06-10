import { CompanyData } from "@/utils/types/DashboardTypes";
import { MutateData } from "./server";

export const createCompany = async (newCompanyData: CompanyData) => {
  return MutateData("/api/company", newCompanyData);
};
