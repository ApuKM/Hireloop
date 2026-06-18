import { getAllCompany } from "@/lib/api/company";
import { getUserSession } from "@/utils/sessions/sessions";
import { BetterAuthUser, CompanyData } from "@/utils/types/DashboardTypes";
import { Button } from "@heroui/react";
import { FiFilter, FiPlus } from "react-icons/fi";
import { CompanyRegistrationsTable } from "./CompanyRegistrationsTable";

export default async function CompanyRegistrationsPage() {
  const companies: CompanyData[] = await getAllCompany();
  const user: BetterAuthUser | null = await getUserSession();


  return (
    <div className="min-h-screen bg-black text-white p-8 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-6 mb-8 border-b border-zinc-800 pb-8 px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-zinc-50 dark:text-zinc-100">
            Company Registrations
          </h1>
          <p className="text-lg font-normal text-zinc-400 dark:text-zinc-500">
            Review and manage corporate entity access requests for the HireLoop
            ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="rounded-lg text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
            size="lg"
          >
            <FiFilter size={20} />
          </Button>
          <Button
            size="lg"
            className="rounded-lg bg-zinc-100 text-black font-semibold px-6"
          >
            Register New
            <FiPlus size={20} />
          </Button>
        </div>
      </div>

      <div className="border border-dashed border-sky-600 rounded-xl p-4">
        {" "}
        {/* Dashed border for reference, just like image */}
        <CompanyRegistrationsTable
          companies={companies}
          user={user}
        />
      </div>
    </div>
  );
}
