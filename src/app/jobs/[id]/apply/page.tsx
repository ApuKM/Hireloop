import { getUserSession } from "@/utils/sessions/sessions";
import { redirect } from "next/navigation";
import React from "react";
import JobApplyForm from "./JobApplyForm";
import {
  Card,
  Separator,
} from "@heroui/react";
import { JobFormDB } from "@/utils/types/DashboardTypes";
import { getJobById } from "@/lib/api/jobs";

const ApplyJobPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  const user = await getUserSession();
  const job: JobFormDB = await getJobById(id);

  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <Card className="max-w-lg border border-danger/20">
          <Card.Header>
            <h2 className="text-xl font-semibold text-danger">
              Application Restricted
            </h2>
          </Card.Header>

          <Separator />

          <Card.Content>
            <p className="text-default-600">
              Only job seekers can apply for jobs.
              Please switch to a seeker account to continue.
            </p>
          </Card.Content>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-default-50 via-background to-default-100">
      <div className="container mx-auto px-4 py-10 lg:py-14">
        {/* Hero Section */}
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Job Application
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Apply for this Position
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Complete the form below and submit your application.
            Make sure your information is accurate before applying.
          </p>
        </div>

        {/* Form Card */}
        <Card className="mx-auto max-w-4xl shadow-xl">
          <Card.Header className="flex flex-col items-start gap-1">
            <h2 className="text-xl font-semibold">
              Application Details
            </h2>
            <p className="text-sm text-default-500">
              Fill in the required information to apply.
            </p>
          </Card.Header>

          <Separator />

          <Card.Content className="p-6 md:p-8">
            <JobApplyForm applicant={user} job={job} />
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default ApplyJobPage;