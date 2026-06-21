import JobsClientWrapper from "@/components/jobs/JobsClientWrapper";
import { getJobs } from "@/lib/api/jobs";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const searchQuery = (resolvedParams.searchQuery as string) || "";
  const category = (resolvedParams.category as string) || "All";
  const jobType = (resolvedParams.jobType as string) || "All";
  const isRemote = resolvedParams.isRemote === "true";
  
  // NEW: Extract page and define a limit
  const page = parseInt(resolvedParams.page as string) || 1;
  const limit = 12; // Keep this matched with the pagination component

  const { total, jobs } = await getJobs({
    searchQuery,
    category,
    jobType,
    isRemote,
    page,
    limit,
  });
  // console.log("jobs", jobs)

  return (
    <div className="min-h-screen bg-[#09090b] ">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-18 ">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Open Positions
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Explore current opportunities and find your next tech role.
          </p>
        </div>
        
        <Suspense fallback={<Spinner />}>
          <JobsClientWrapper jobs={jobs} total={total} />
        </Suspense>
      </main>
    </div>
  );
}