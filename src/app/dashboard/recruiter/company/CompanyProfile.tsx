"use client";

import React, { useState } from "react";
import { Button, Avatar, Separator } from "@heroui/react";
import { FiBriefcase, FiMapPin, FiUsers, FiGlobe } from "react-icons/fi";
import Link from "next/link";
import { CompanyData } from "@/utils/types/DashboardTypes";

interface CompanyProfileProps {
  recruiterCompany: CompanyData | null;
}

export default function CompanyProfile({
  recruiterCompany,
}: CompanyProfileProps) {
  // State to simulate whether a company exists
  const [company, setCompany] = useState<CompanyData | null>(recruiterCompany);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans p-6 md:p-10 relative overflow-x-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5a45ff]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            My Company Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your business information and branding on HireLoop.
          </p>
        </div>

        {!company?._id ? (
          /* EMPTY STATE UI */
          <div className="dark bg-[#0a0a0a] border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center text-center h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#5a45ff]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="h-20 w-20 bg-[#111] rounded-2xl flex items-center justify-center mb-8 border border-white/5">
              <FiBriefcase className="text-3xl text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">
              No Company Registered Yet
            </h3>
            <p className="text-gray-400 text-sm max-w-md mb-10 leading-relaxed">
              Your business is not registered on HireLoop. Register your company
              profile to start posting jobs, browsing candidates, and managing
              applications.
            </p>
            <Link href="company/register">
              <Button className="bg-white text-black font-bold px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                Register My Company
              </Button>
            </Link>
          </div>
        ) : (
          /* POPULATED STATE UI */
          <div className="dark bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                {/* Updated to use companyLogo and formName */}
                <Avatar>
                  <Avatar.Image
                    src={company?.companyLogo || undefined}
                    alt={company?.formName}
                    className="w-24 h-24 text-xl font-bold bg-[#111] border-2 border-white/5 shadow-inner"
                  />
                  <Avatar.Fallback>{company?.formName}</Avatar.Fallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                      {company?.formName}
                    </h2>
                  </div>
                  {/* Updated to use formWebsite */}
                  <a
                    href={
                      company?.formWebsite?.startsWith("http")
                        ? company?.formWebsite
                        : `https://${company?.formWebsite}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#5a45ff] hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <FiGlobe /> {company?.formWebsite}
                  </a>
                </div>
              </div>

              <Link href="company/register">
                <Button className="bg-white text-black font-bold px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                  Edit Details
                </Button>
              </Link>
            </div>

            <Separator className="bg-white/5 mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 p-6 bg-[#111] rounded-2xl border border-white/5">
              <div className="flex items-start gap-4">
                <FiBriefcase className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                    Industry
                  </p>
                  {/* Updated to use formIndustry */}
                  <p className="text-base font-semibold text-white">
                    {company?.formIndustry}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiMapPin className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                    Location
                  </p>
                  {/* Updated to use formLocation */}
                  <p className="text-base font-semibold text-white">
                    {company?.formLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiUsers className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                    Company Size
                  </p>
                  {/* Updated to use formEmployeeCount */}
                  <p className="text-base font-semibold text-white">
                    {company?.formEmployeeCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-5xl">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
                About the Company
              </p>
              {/* Updated to use formDescription */}
              <p className="text-sm text-gray-300 leading-relaxed font-normal whitespace-pre-wrap">
                {company?.formDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
