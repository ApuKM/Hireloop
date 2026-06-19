import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};

// Define a union type matching your roles exactly
type AppUserRole = "seeker" | "recruiter" | "admin";

export const updateUserRole = async (userId: string, role: AppUserRole) => {
  const data = await auth.api.setRole({
    body: {
      userId,
      role // This will now accept "seeker", "admin", or "recruiter" seamlessly!
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  
  revalidatePath("/dashboard/admin/users");
  return data;
};
