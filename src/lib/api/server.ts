import { CompanyData } from "@/utils/types/DashboardTypes";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const MutateData = async (path: string, data: CompanyData) => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
