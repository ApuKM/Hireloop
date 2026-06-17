import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};


export const requireRole = async (role: "seeker" | "recruiter") => {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};
