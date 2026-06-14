import { getUserSession } from "@/utils/sessions/sessions";
import { redirect } from "next/navigation";
import JobApplyForm from "./JobApplyForm";
import { Button, Card, Separator } from "@heroui/react";
import { JobFormDB } from "@/utils/types/DashboardTypes";
import { getJobById } from "@/lib/api/jobs";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { RawApplicantData } from "@/utils/types/JobTypes";
import Link from "next/link";

const ApplyJobPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const user = await getUserSession();

  const applications: RawApplicantData[] = await getApplicationsByApplicant(
    user?.id,
  );
  
  const plan = {
    name: "Free",
    maxApplicationsPerMonth: 3,
  };
  
  const job: JobFormDB = await getJobById(id);

  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${id}/apply`);
  }

  // 1. Better styling for the restricted state
  if (user.role !== "seeker") {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <Card className="max-w-lg border border-danger/20 bg-danger-50/30 shadow-md">
          <Card.Header className="flex-col items-start px-6 pt-6 pb-2">
            <h2 className="text-xl font-bold text-danger">
              Application Restricted
            </h2>
          </Card.Header>
          <Separator className="my-2 opacity-50" />
          <Card.Content className="px-6 pb-6 pt-2">
            <p className="text-default-600">
              Only job seekers can apply for jobs. Please switch to a seeker
              account to continue.
            </p>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const isLimitReached = applications.length >= plan.maxApplicationsPerMonth;

  return (
    <main className="min-h-screen bg-linear-to-b from-default-50 via-background to-default-100">
      <div className="container mx-auto px-4 py-10 lg:py-14">
        
        {/* Hero Section */}
        <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            Job Application
          </span>

          {/* Fallback title if job.title is missing, though it shouldn't be */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
            {job.title || "Apply for Position"}
          </h1>

          {/* Usage Tracker Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-default-200 bg-background px-4 py-2 text-sm font-medium shadow-sm">
            <span className="text-default-600">Monthly Applications:</span>
            <span className={isLimitReached ? "font-bold text-danger" : "font-bold text-primary"}>
              {applications.length} / {plan.maxApplicationsPerMonth}
            </span>
          </div>

          {!isLimitReached ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-default-500">
              Complete the form below to submit your application. Please ensure
              all information is accurate before applying.
            </p>
          ) : (
            /* Premium Upgrade CTA Block */
            <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-4 rounded-2xl border border-warning/30 bg-warning/5 p-6 text-center md:p-8">
              <h3 className="text-xl font-semibold text-warning-600">
                Application Limit Reached
              </h3>
              <p className="text-default-600">
                You have used all {plan.maxApplicationsPerMonth} of your free applications for this month. Upgrade your plan to unlock unlimited applications and land your dream job faster.
              </p>
              <Link href="/pricing">
              <Button
                variant="secondary"
                className="mt-2 font-medium text-orange-400"
              >
                Upgrade to Premium
              </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Form Card */}
        {!isLimitReached && (
          <Card className="mx-auto max-w-4xl border border-default-200/50 shadow-xl">
            <Card.Header className="flex flex-col items-start gap-1 px-6 pt-6 md:px-8 md:pt-8">
              <h2 className="text-2xl font-bold">Applicant Details</h2>
              <p className="text-sm text-default-500">
                Fill in the required information to apply for this role.
              </p>
            </Card.Header>

            <Separator className="my-4" />

            <Card.Content className="px-6 pb-6 pt-2 md:px-8 md:pb-8">
              <JobApplyForm applicant={user} job={job} />
            </Card.Content>
          </Card>
        )}
        
      </div>
    </main>
  );
};

export default ApplyJobPage;
