import React from "react";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiArrowRight,
} from "react-icons/fi";
import { Card } from "@heroui/react"; // Adjust this import based on your exact Hero UI setup
import { JobFormDB } from "@/utils/types/DashboardTypes";
import Image from "next/image";

export default function JobCard({ job }: { job: JobFormDB }) {
  // Format salary to look clean (e.g., "$40,000 - $44,998")
  const formatSalary = (min: string, max: string, currency: string) => {
    const symbol =
      currency === "USD" ? "$" : currency === "EUR" ? "€" : currency;
    const minFormatted = Number(min).toLocaleString();
    const maxFormatted = Number(max).toLocaleString();
    return `${symbol}${minFormatted} - ${symbol}${maxFormatted}/yr`;
  };

  // Format job type to remove dashes and capitalize (e.g., "full-time" -> "Full time")
  const formatJobType = (type: string) => {
    return type
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Card className="w-full max-w-md bg-[#18181b] border-none rounded-2xl p-6 text-white shadow-lg font-sans">
      <Card.Header className="flex flex-col items-start gap-4 pb-4">
        {/* Logo, Company Name, and Title Container */}
        <div className="flex items-center gap-4">
          {job.companyLogo && (
            <Image
              width={48}
              height={48}
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              className="w-12 h-12 rounded-xl object-cover bg-white p-1 border border-zinc-800"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-300 mb-1">
              {job.companyName}
            </span>
            <Card.Title className="text-2xl font-semibold tracking-tight text-white leading-none">
              {job.title}
            </Card.Title>
          </div>
        </div>

        {/* Description with Highlighted Category */}
        <Card.Description className="text-sm text-zinc-400 leading-relaxed mt-2">
          Join the team to build amazing digital experiences. We are looking for
          top talent in the {" "}
          <span className="text-[#f472b6] font-medium ">
            {job.category}
          </span> {" "}
          sector.
        </Card.Description>
      </Card.Header>

      <Card.Content className="flex flex-wrap gap-3 py-2">
        {/* Location Badge */}
        <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium">
          <FiMapPin className="text-[#f472b6]" size={14} />
          <span>{job.isRemote ? "Remote" : job.location}</span>
        </div>

        {/* Job Type Badge */}
        <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium">
          <FiBriefcase className="text-[#f472b6]" size={14} />
          <span>{formatJobType(job.jobType)}</span>
        </div>

        {/* Salary Badge */}
        <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium">
          <FiDollarSign className="text-[#f472b6]" size={14} />
          <span>
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
        </div>
      </Card.Content>

      <Card.Footer className="pt-6">
        <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group">
          Apply Now
          <FiArrowRight
            className="group-hover:translate-x-1 transition-transform"
            size={16}
          />
        </button>
      </Card.Footer>
    </Card>
  );
}
