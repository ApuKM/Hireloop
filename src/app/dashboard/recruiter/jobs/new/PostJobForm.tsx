"use client";

import { CompanyData, JobFormValues } from "@/utils/types/DashboardTypes";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiCheck,
} from "react-icons/fi";

const MOCK_COMPANY = {
  name: "Acme Corp",
  status: "approved",
  plan: "Growth",
  activeJobs: 4,
  jobLimit: 10,
};

export default function PostJobForm({company}: {company: CompanyData}) {
  console.log("company from postjobform", company)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormValues>({
    defaultValues: {
      isRemote: false,
      currency: "USD",
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API Call
      // console.log("Submitting Job with status: active", {
      //   ...data,
      //   companyId: "mock-company-id",
      // });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // alert("Job posted successfully!");
      const res: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            companyId: "mock",
            status: "active",
            location: data.isRemote ? "Remote" : data.location,
          }),
        },
      );
      if (res.ok) {
        toast.success("Job posted successfully!");
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLimitReached = MOCK_COMPANY.activeJobs >= MOCK_COMPANY.jobLimit;

  // Reusable generic input style classes
  const inputBaseStyles =
    "w-full bg-zinc-900 border text-sm text-zinc-100 rounded-md px-3 py-2.5 outline-none transition-colors placeholder:text-zinc-500 focus:border-[#5b5ef5] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Post a New Job</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Fill out the details below to publish your job opening on HireLoop.
          </p>
        </div>

        {/* Company Limits Banner */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl mb-8 p-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-800/50 rounded-lg">
              <FiBriefcase className="text-zinc-300 text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Posting as{" "}
                <span className="font-bold">{MOCK_COMPANY.name}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <FiCheck size={12} /> Approved
                </span>
                <span className="text-xs text-zinc-400">
                  {MOCK_COMPANY.plan} Plan ({MOCK_COMPANY.activeJobs}/
                  {MOCK_COMPANY.jobLimit} jobs used)
                </span>
              </div>
            </div>
          </div>
          {isLimitReached && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
              Limit Reached
            </span>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Job Info Section */}
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h2 className="text-lg font-medium text-white">
                Job Information
              </h2>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Job Title
                  </label>
                  <input
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={`${inputBaseStyles} ${errors.title ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Job Category
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`${inputBaseStyles} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:1.25rem_1.25rem] pr-10 ${errors.category ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select category
                    </option>
                    <option value="technology" className="bg-zinc-900">
                      Technology
                    </option>
                    <option value="design" className="bg-zinc-900">
                      Design
                    </option>
                    <option value="marketing" className="bg-zinc-900">
                      Marketing
                    </option>
                    <option value="sales" className="bg-zinc-900">
                      Sales
                    </option>
                  </select>
                  {errors.category && (
                    <span className="text-xs text-red-500">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Job Type
                  </label>
                  <select
                    {...register("jobType", {
                      required: "Job type is required",
                    })}
                    className={`${inputBaseStyles} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:1.25rem_1.25rem] pr-10 ${errors.jobType ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select job type
                    </option>
                    <option value="full-time" className="bg-zinc-900">
                      Full-time
                    </option>
                    <option value="part-time" className="bg-zinc-900">
                      Part-time
                    </option>
                    <option value="contract" className="bg-zinc-900">
                      Contract
                    </option>
                    <option value="internship" className="bg-zinc-900">
                      Internship
                    </option>
                  </select>
                  {errors.jobType && (
                    <span className="text-xs text-red-500">
                      {errors.jobType.message}
                    </span>
                  )}
                </div>

                {/* Deadline */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Application Deadline
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-zinc-500" />
                    </div>
                    <input
                      type="date"
                      {...register("deadline", {
                        required: "Deadline is required",
                      })}
                      className={`${inputBaseStyles} pl-10 [color-scheme:dark] ${errors.deadline ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                    />
                  </div>
                  {errors.deadline && (
                    <span className="text-xs text-red-500">
                      {errors.deadline.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Currency */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Currency
                  </label>
                  <select
                    {...register("currency")}
                    className={`${inputBaseStyles} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:1.25rem_1.25rem] pr-10 border-zinc-700`}
                  >
                    <option value="USD" className="bg-zinc-900">
                      USD ($)
                    </option>
                    <option value="EUR" className="bg-zinc-900">
                      EUR (€)
                    </option>
                    <option value="GBP" className="bg-zinc-900">
                      GBP (£)
                    </option>
                  </select>
                </div>

                {/* Min Salary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Min Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-zinc-500" />
                    </div>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      {...register("salaryMin")}
                      className={`${inputBaseStyles} pl-10 border-zinc-700`}
                    />
                  </div>
                </div>

                {/* Max Salary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Max Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-zinc-500" />
                    </div>
                    <input
                      type="number"
                      placeholder="e.g. 80000"
                      {...register("salaryMax")}
                      className={`${inputBaseStyles} pl-10 border-zinc-700`}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800 my-2"></div>

              {/* Remote & Location */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Remote Position
                    </p>
                    <p className="text-xs text-zinc-400">
                      Can this role be performed fully remotely?
                    </p>
                  </div>

                  {/* Custom Tailwind Switch */}
                  <Controller
                    name="isRemote"
                    control={control}
                    render={({ field }) => (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            setIsRemote(e.target.checked);
                          }}
                        />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    )}
                  />
                </div>

                {!isRemote && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-zinc-500" />
                      </div>
                      <input
                        {...register("location", {
                          required: !isRemote ? "Location is required" : false,
                        })}
                        placeholder="City, Country"
                        className={`${inputBaseStyles} pl-10 ${errors.location ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                      />
                    </div>
                    {errors.location && (
                      <span className="text-xs text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h2 className="text-lg font-medium text-white">
                Job Description
              </h2>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Responsibilities */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">
                  Responsibilities
                </label>
                <textarea
                  {...register("responsibilities", {
                    required: "Responsibilities are required",
                  })}
                  rows={4}
                  placeholder="List the day-to-day tasks and expectations..."
                  className={`${inputBaseStyles} resize-y min-h-[100px] ${errors.responsibilities ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                />
                {errors.responsibilities && (
                  <span className="text-xs text-red-500">
                    {errors.responsibilities.message}
                  </span>
                )}
              </div>

              {/* Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">
                  Requirements
                </label>
                <textarea
                  {...register("requirements", {
                    required: "Requirements are required",
                  })}
                  rows={4}
                  placeholder="Write all requirements..."
                  className={`${inputBaseStyles} resize-y min-h-[100px] ${errors.requirements ? "border-red-500 focus:border-red-500" : "border-zinc-700"}`}
                />
                {errors.requirements && (
                  <span className="text-xs text-red-500">
                    {errors.requirements.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium rounded-md text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLimitReached || isSubmitting}
              className="flex items-center justify-center bg-[#5b5ef5] hover:bg-[#4a4de0] text-white font-semibold text-sm px-6 py-2.5 
                 rounded-md hover:shadow-[0_0_28px_rgba(91,94,245,0.4)] disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </div>
              ) : (
                "Publish Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
