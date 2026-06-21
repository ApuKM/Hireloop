"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// -----------------------------------------------------------
// HireLoop Navbar
// Dark theme · matches design reference
// Role-aware: renders different links for guest / seeker /
// recruiter / admin via the `role` prop (or "guest" by default)
// -----------------------------------------------------------

type Role = "guest" | "seeker" | "recruiter" | "admin";


const NAV_LINKS: Record<Role, { label: string; href: string }[]> = {
  guest: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ],
  seeker: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "My Applications", href: "/applications" },
    { label: "My Dashboard", href: "/dashboard/seeker" },
    { label: "Pricing", href: "/pricing" },
  ],
  recruiter: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Applicants", href: "/applicants" },
    { label: "My Dashboard", href: "/dashboard/recruiter" },
    { label: "Pricing", href: "/pricing" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin" },
    { label: "Users", href: "/dashboard/admin/users" },
    { label: "Jobs", href: "/jobs" },
    { label: "Reports", href: "/dashboard/admin/reports" },
  ],
};

export default function Navbar() {
  const {data: session, isPending } = authClient.useSession()

  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const user = session?.user;
  const userRole = (user?.role as Role) || "guest"
  const links = NAV_LINKS[userRole];
  // const isLoggedIn = role !== "guest";

  const handleLogOut = async() => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        }
      }
    })
  }


  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0f0f10]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-[#0f0f10]",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-0 shrink-0 group">
          {/* "hire" in white */}
          <span className="text-[1.45rem] font-extrabold tracking-tight text-white leading-none">
            Hirel
          </span>
          {/* animated loop icon */}
          <span className="relative inline-flex items-center">
            <svg
              width="34"
              height="22"
              viewBox="0 0 34 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-500 group-hover:rotate-360"
              aria-hidden
            >
              {/* orange circle (left) */}
              <circle cx="11" cy="11" r="9" fill="#F97316" />
              {/* blue circle (right, overlapping) */}
              <circle cx="23" cy="11" r="9" fill="#3B82F6" />
              {/* overlap blend — faked with a path in brand teal */}
              <path
                d="M17 4.5a6.5 6.5 0 0 1 0 13 6.5 6.5 0 0 1 0-13Z"
                fill="#0F0F10"
                opacity="0.5"
              />
            </svg>
          </span>
          {/* "op" in white */}
          <span className="text-[1.45rem] font-extrabold tracking-tight text-white leading-none -ml-0.5">
            p
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-1 text-[0.9rem]">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative px-3 py-1.5 text-[#b3b3b8] hover:text-white transition-colors duration-200 rounded-md
                  after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full
                  after:bg-[#F97316] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop Auth Buttons ── */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {/* Avatar / profile shortcut */}
              <button
              className="text-xs font-medium mr-4"
              >
                Hi, {user?.name?.split(" ")[0]}
              </button>
              <Button
                variant="danger-soft"
                className="text-[#b3b3b8] hover:text-white text-sm font-medium"
                size="sm"
                onClick={handleLogOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-[#7c7cf5] hover:text-white font-semibold text-sm transition-colors duration-200"
                size="sm"
              >
                Sign In
              </Button>
              </Link>
              <Link href="/auth/register">
              <Button
                className="bg-[#5b5ef5] hover:bg-[#4a4de0] text-white font-semibold text-sm px-5
                  rounded-md hover:shadow-[0_0_28px_rgba(91,94,245,0.5)]
                  transition-all duration-200"
                size="sm"
              >
                Get Started
              </Button>
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.25 group"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={[
              "block h-0.5 w-6 bg-[#b3b3b8] rounded-full transition-all duration-300",
              menuOpen ? "rotate-45 translate-y-1.75" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-[#b3b3b8] rounded-full transition-all duration-300",
              menuOpen ? "opacity-0 scale-x-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-0.5 w-6 bg-[#b3b3b8] rounded-full transition-all duration-300",
              menuOpen ? "-rotate-45 -translate-y-1.75" : "",
            ].join(" ")}
          />
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 bg-[#0f0f10] border-t border-white/6",
          menuOpen ? "max-h-110 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col px-4 py-3 gap-1">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-3 py-2.5 rounded-lg text-[#b3b3b8] hover:text-white hover:border-white/5
                  text-sm font-medium transition-colors duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 px-4 pb-4">
          {user ? (
            <>
            <button
              className="text-xs font-medium mb-4"
              >
                Hi, {user?.name?.split(" ")[0]}
              </button>
            <Button
              variant="danger-soft"
              className="border-white/10 text-[#b3b3b8] w-full"
              size="sm"
              onClick={handleLogOut}
            >
              Sign Out
            </Button>
            </>
          ) : (
            <>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="border-[#5b5ef5]/50 text-[#7c7cf5] w-full"
                size="sm"
              >
                Sign In
              </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  className="bg-[#5b5ef5] text-white w-full font-semibold"
                  size="sm"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
