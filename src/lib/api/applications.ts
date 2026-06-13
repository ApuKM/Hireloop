"use server"

import { JobApplicationPayload } from "@/utils/types/JobTypes";
import { MutateData } from "./server";

export const submitApplication = async (payload: JobApplicationPayload) => {
  return MutateData("/api/applications", payload);
};