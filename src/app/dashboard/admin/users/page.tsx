import { UsersListTable } from "@/components/dashboard/UsersListTable";
import { getUsersList } from "@/lib/api/users";

export default async function UsersListPage() {
  const data = await getUsersList();
  const users = data?.users ?? [];

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Users List
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Manage users, roles, and account status.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300">
            Total users: <span className="font-semibold text-zinc-100">{users.length}</span>
          </div>
        </div>

        <UsersListTable users={users} />
      </div>
    </div>
  );
}