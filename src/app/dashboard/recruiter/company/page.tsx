"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { Button, Chip, Avatar, Separator } from "@heroui/react";
import { FiBriefcase, FiMapPin, FiUsers, FiGlobe, FiEdit2 } from "react-icons/fi";
import Link from "next/link";

// --- Types ---
type CompanyStatus = "Pending" | "Approved" | "Rejected";

interface CompanyDetails {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  employeeCount: string;
  description: string;
  logoUrl?: string;
  status: CompanyStatus;
}

export default function CompanyProfilePage() {
  // State to simulate whether a company exists.
  // Change to null to see the empty state UI.
  const [company, setCompany] = useState<CompanyDetails | null>({
    id: "acme-123",
    name: "Acme Corporation",
    industry: "Technology",
    website: "acme.com",
    location: "San Francisco, USA",
    employeeCount: "51-200 employees",
    description: "Leading the way in digital innovation and cloud solutions.",
    status: "Approved",
    logoUrl: "https://placehold.co/100?text=ACME",
  });

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans p-6 md:p-10">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5a45ff]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">My Company Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your business information and branding on HireLoop.
          </p>
        </div>

        {!company ? (
          /* EMPTY STATE UI */
          <div className="dark bg-[#0a0a0a] border border-white/5 rounded-3xl p-16 flex flex-col items-center justify-center text-center h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#5a45ff]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="h-20 w-20 bg-[#111] rounded-2xl flex items-center justify-center mb-8 border border-white/5">
              <FiBriefcase className="text-3xl text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No Company Registered Yet</h3>
            <p className="text-gray-400 text-sm max-w-md mb-10 leading-relaxed">
              Your business is not registered on HireLoop. Register your company
              profile to start posting jobs, browsing candidates, and managing applications.
            </p>
            {/* Navigates to the separate form page */}
            <Link   href="company/register">
            <Button
             
              variant="tertiary"
              className="bg-white text-black font-bold px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
            >
              Register My Company
            </Button>
            </Link>
          </div>
        ) : (
          /* POPULATED STATE UI */
          <div className="dark bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-6">
                <Avatar size="md">
                  <Avatar.Image
                    src={company.logoUrl}
                    className="w-24 h-24 text-xl font-bold bg-[#111] border-2 border-white/5 shadow-inner"
                  />
                  <Avatar.Fallback>{company.name}</Avatar.Fallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-bold tracking-tight">{company.name}</h2>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        company.status === "Approved"
                          ? "success"
                          : company.status === "Pending"
                          ? "warning"
                          : "danger"
                      }
                      className="border-white/10 text-xs font-semibold px-2.5 h-6"
                    >
                      {company.status}
                    </Chip>
                  </div>
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#5a45ff] hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <FiGlobe /> {company.website}
                  </a>
                </div>
              </div>

              {/* Navigates to the separate form page (could also be /company/edit) */}
              <Link  href="company/register">
            <Button
             
              variant="tertiary"
              className="bg-white text-black font-bold px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
            >
              Edit Details
            </Button>
            </Link>
            </div>

            <Separator className="bg-white/5 mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 p-6 bg-[#111] rounded-2xl border border-white/5">
              <div className="flex items-start gap-4">
                <FiBriefcase className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Industry</p>
                  <p className="text-base font-semibold text-white">{company.industry}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiMapPin className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Location</p>
                  <p className="text-base font-semibold text-white">{company.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiUsers className="text-xl text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Company Size</p>
                  <p className="text-base font-semibold text-white">{company.employeeCount}</p>
                </div>
              </div>
            </div>

            <div className="max-w-5xl">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">About the Company</p>
              <p className="text-sm text-gray-300 leading-relaxed font-normal">{company.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}