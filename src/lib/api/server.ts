import { CompanyData } from "@/utils/types/DashboardTypes";
import { JobApplicationPayload } from "@/utils/types/JobTypes";
import { SubInfo } from "@/utils/types/PricingTypes";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const MutateData = async (
  path: string,
  data: CompanyData | JobApplicationPayload | SubInfo,
) => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const ServerFetch = async (path: string) => {
  // console.log("URL check:", serverUrl)
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};
