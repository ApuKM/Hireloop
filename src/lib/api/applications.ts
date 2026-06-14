"use server"

import { JobApplicationPayload } from "@/utils/types/JobTypes";
import { MutateData, ServerFetch } from "./server";

export const submitApplication = async (payload: JobApplicationPayload) => {
  return MutateData("/api/applications", payload);
};

export const getApplicationsByApplicant = async(applicantId: string | undefined) => {
  return ServerFetch(`/api/applications?applicantId=${applicantId}`)
}