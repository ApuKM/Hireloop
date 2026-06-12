import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";
import { JobFormDB } from "@/utils/types/DashboardTypes";


export default async function JobCardContainerPage() {
    const jobs = await getJobs();
  // Defensive check: If no jobs are provided or array is empty, show a fallback
  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-zinc-400">
        <p className="text-lg font-medium">No job openings found.</p>
        <p className="text-sm">Check back later or try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-18 mt-10">
      {/* Container Header */}
      <div className="mb-8  text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
          Open Positions
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Explore current opportunities and find your next tech role.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {jobs.map((job: JobFormDB) => (
          <JobCard 
            key={job._id} 
            job={job} 
          />
        ))}
      </div>
    </div>
  );
}