import { requireRole } from "@/utils/sessions/sessions";
import React from "react";

export default async function AdminDashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");
  return children;
}
