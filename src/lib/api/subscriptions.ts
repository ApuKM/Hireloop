import { SubInfo } from "@/utils/types/PricingTypes";
import { MutateData } from "./server";


export const createSubscription = async (subInfo: SubInfo) => {
  return MutateData("/api/subscription", subInfo);
};