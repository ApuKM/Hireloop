import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

// --- Helper Functions ---
const formatSalary = (min: string, max: string, currency: string) => {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency;
  return `${symbol}${Number(min).toLocaleString()} - ${symbol}${Number(max).toLocaleString()}/yr`;
};

const formatJobType = (type: string) => {
  return type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const JobDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Job not found.
      </div>
    );
  }

  // Handle literal "null" strings from database
  const hasRequirements = job.requirements && job.requirements !== "null";
  const hasResponsibilities =
    job.responsibilities && job.responsibilities !== "null";

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-12 mt-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* --- 1. Header Section --- */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f472b6] opacity-5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            {/* Logo & Titles */}
            <div className="flex items-center gap-5">
              {job.companyLogo && (
                <Image
                  width={80}
                  height={80}
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  className="w-20 h-20 rounded-2xl object-cover bg-white p-1.5 border border-zinc-700 shadow-md"
                />
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="font-medium text-zinc-300">
                    {job.companyName}
                  </span>
                  <span>•</span>
                  <span className="text-[#f472b6] bg-[#f472b6]/10 px-2 py-0.5 rounded-md text-sm font-medium">
                    {formatJobType(job.category)}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-[#f472b6] hover:bg-[#ec4899] text-zinc-950 font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(244,114,182,0.3)] hover:shadow-[0_0_25px_rgba(244,114,182,0.5)] transform hover:-translate-y-0.5">
                Apply Now
              </button>
              <p className="text-center md:text-right mt-3 text-xs text-zinc-500 flex items-center justify-center md:justify-end gap-1">
                <FiClock /> Posted{" "}
                {formatDate(job.createdAt.$date || job.createdAt)}
              </p>
            </div>
          </div>

          {/* --- 2. Quick Info Badges --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-8 border-t border-zinc-800/80">
            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiMapPin className="text-[#f472b6]" /> Location
              </div>
              <div className="font-medium">
                {job.isRemote ? "Remote" : job.location}
              </div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiBriefcase className="text-[#f472b6]" /> Job Type
              </div>
              <div className="font-medium">{formatJobType(job.jobType)}</div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiDollarSign className="text-[#f472b6]" /> Salary
              </div>
              <div className="font-medium">
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiCalendar className="text-[#f472b6]" /> Deadline
              </div>
              <div className="font-medium">{formatDate(job.deadline)}</div>
            </div>
          </div>
        </div>

        {/* --- 3. Main Content Area --- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Left Column (Main Details) */}
          <div className="md:col-span-2 space-y-8 flex flex-col ">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#f472b6] rounded-full"></div>
                Responsibilities
              </h2>
              {hasResponsibilities ? (
                <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap bg-[#18181b] p-6 rounded-2xl border border-zinc-800">
                  {job.responsibilities}
                </div>
              ) : (
                <p className="text-zinc-500 italic bg-[#18181b] p-6 rounded-2xl border border-zinc-800 border-dashed">
                  Specific responsibilities have not been provided for this
                  role. Expect standard duties for a {job.title} position.
                </p>
              )}
            </section>

            <section className="mt-auto">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#f472b6] rounded-full"></div>
                Requirements
              </h2>
              {hasRequirements ? (
                <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap bg-[#18181b] p-6 rounded-2xl border border-zinc-800">
                  {job.requirements}
                </div>
              ) : (
                <p className="text-zinc-500 italic bg-[#18181b] p-6 rounded-2xl border border-zinc-800 border-dashed">
                  No specific requirements were listed.
                </p>
              )}
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">
                Why join {job.companyName}?
              </h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-[#f472b6] mt-0.5 shrink-0" />
                  <span>
                    Competitive salary of up to{" "}
                    {
                      formatSalary(
                        job.salaryMin,
                        job.salaryMax,
                        job.currency,
                      ).split("- ")[1]
                    }
                  </span>
                </li>
                {job.isRemote && (
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#f472b6] mt-0.5 shrink-0" />
                    <span>100% Remote flexibility</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="text-[#f472b6] mt-0.5 shrink-0" />
                  <span>Work in the dynamic {job.category} sector</span>
                </li>
              </ul>
            </div>

            {/* Status Card */}
            <div className="bg-[#27272a]/30 border border-[#f472b6]/20 rounded-2xl p-3 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Job Status</span>
              <span className="flex items-center gap-2 text-sm font-medium  px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {job.status === "active" ? "Actively Hiring" : job.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
