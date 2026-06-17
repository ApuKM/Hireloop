import type { ElementType } from "react";
import {
  Bars,
  CloudArrowUpIn,
  Envelope,
  Gear,
  House,
  PersonWorker,
  Person,
  Briefcase,
  FileText,
  CreditCard,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { PiBookmarkSimple, PiSquaresFour } from "react-icons/pi";
import { getUserSession } from "@/utils/sessions/sessions";

export async function Sidebar() {
  const user = await getUserSession();

  // 1. Changed icon type to ElementType to accommodate different icon libraries
  const recruiterNavItems: {
    icon: ElementType;
    label: string;
    href: string;
  }[] = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: PersonWorker, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: CloudArrowUpIn,
      href: "/dashboard/recruiter/jobs/new",
      label: "Add a Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Info",
    },
    {
      icon: Envelope,
      href: "/dashboard/recruiter/company/register",
      label: "Register company",
    },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const seekerNavItems: {
    icon: ElementType;
    label: string;
    href: string;
  }[] = [
    {
      icon: PiSquaresFour,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    {
      icon: Briefcase,
      href: "/dashboard/seeker/jobs",
      label: "Jobs",
    },
    {
      icon: PiBookmarkSimple,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    {
      icon: CreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },
    {
      icon: Gear,
      href: "/dashboard/seeker/settings",
      label: "Settings",
    },
  ];

  const navLinksMap = {
    recruiter: recruiterNavItems,
    seeker: seekerNavItems,
  };

  // 2. Strongly typed the role to match the keys of navLinksMap
  // type RoleType = keyof typeof navLinksMap;
  const roleKey = user?.role === "recruiter" ? "recruiter" : "seeker";
  const navItems = navLinksMap[roleKey];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <button
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors w-full hover:bg-default"
            type="button"
          >
            {/* 3. The icon renders normally with the updated type */}
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden lg:border-r lg:block lg:h-full">{navContent}</div>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <Bars />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}