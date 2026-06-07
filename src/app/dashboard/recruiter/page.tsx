"use client";

import StatSection from "@/components/dashboard/StatSection";
import { authClient } from "@/lib/auth-client";
import { StatItem } from "@/utils/types/DashboardTypes";
import { Spinner } from "@heroui/react";
import { PiCheckCircleLight, PiFileTextLight, PiLightningLight, PiUsersLight } from "react-icons/pi";

const recruiterData: StatItem[] = [
  {
    icon: <PiFileTextLight className="h-6 w-6" />,
    label: 'Active Job Requisitions',
    value: 12,
  },
  {
    icon: <PiUsersLight className="h-6 w-6" />,
    label: 'Candidate Pipelines',
    value: 350,
  },
  {
    icon: <PiLightningLight className="h-6 w-6" />,
    label: 'Positions to Fill',
    value: 8,
  },
  {
    icon: <PiCheckCircleLight className="h-6 w-6" />,
    label: 'Time-to-Hire (Avg Days)',
    value: 28,
  },
];

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h1 className="text-white font-bold text-2xl text-center">
        Welcome Back, {session?.user?.name}
      </h1>
      <StatSection stats={recruiterData}/>
    </div>
  );
};

export default RecruiterDashboardHomePage;
