import { requireRole } from "@/utils/sessions/sessions";
import React from "react";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  return children;
}
