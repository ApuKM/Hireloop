// Replace with your actual DB call

import JobsClientWrapper from "@/components/jobs/JobsClientWrapper";
import { getJobs } from "@/lib/api/jobs";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

// Next.js 15 requires awaiting searchParams
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  // Extract params with safe defaults
  const searchQuery = (resolvedParams.searchQuery as string) || "";
  const category = (resolvedParams.category as string) || "All";
  const jobType = (resolvedParams.jobType as string) || "All";
  const isRemote = resolvedParams.isRemote === "true";

  // Fetch from your database using the URL filters
  // Ensure your DB query uses LIMIT (e.g., limit to 20) for pagination later
  const jobs = await getJobs({
    searchQuery,
    category,
    jobType,
    isRemote,
  });

  return (
    <div className="min-h-screen bg-[#09090b] ">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-18 ">
        <div className="mb-8  text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Open Positions
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Explore current opportunities and find your next tech role.
          </p>
        </div>
        
        <Suspense fallback={<Spinner className="h-[60vh]" />}>
          <JobsClientWrapper jobs={jobs} />
        </Suspense>
      </main>
    </div>
  );
}
