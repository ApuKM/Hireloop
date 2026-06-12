import type { ComponentType, SVGProps } from "react";

import {
  Bars,
  CloudArrowUpIn,
  Envelope,
  Gear,
  House,
  PersonWorker,
  Person,
  Briefcase,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function Sidebar() {
  const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
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
    { icon: Envelope, href: "/dashboard/recruiter/company/register", label: "Register company" },
    { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <button
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors w-full hover:bg-default"
            type="button"
          >
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
