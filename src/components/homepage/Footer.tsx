"use client";

import Link from "next/link";
import Image from "next/image";

import {
  LogoFacebook,
  LogoLinkedin,
} from "@gravity-ui/icons";
import { RiPinterestLine } from "react-icons/ri";

// ─────────────────────────────────────────────
// HireLoop Footer
// Dark #0f0f10 · synchronized with Navbar
// Replace <LogoSlot /> with your actual <Image> or SVG logo
// ─────────────────────────────────────────────

const LINKS = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/company" },
    { label: "Salary data", href: "/salary" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

const SOCIALS = [
  { icon: LogoFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: RiPinterestLine, href: "https://pinterest.com", label: "Pinterest" },
  { icon: LogoLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];


export default function Footer() {
  return (
    <footer className="bg-[#0f0f10] border-t border-white/6">

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto_auto]">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4 max-w-55">
            {/* Logo — swap LogoSlot with your actual logo */}
            <Link href="/" aria-label="HireLoop home">
              <Image src="/logo/logo.png" alt="HireLoop" width={130} height={32} />
            </Link>

            <p className="text-[0.82rem] text-[#6b6b75] leading-relaxed">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>
          </div>

          {/* ── Link columns ── */}
          {(Object.entries(LINKS) as [string, { label: string; href: string }[]][]).map(
            ([heading, items]) => (
              <div key={heading} className="flex flex-col gap-4">
                <h3 className="text-[0.8rem] font-semibold text-[#5b5ef5] tracking-wide uppercase">
                  {heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-[0.85rem] text-[#8a8a95] hover:text-white
                          transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
            py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={[
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "text-[#8a8a95] hover:text-white",
                  "bg-white/5 hover:bg-white/10",
                  "transition-all duration-200",
                  // Pinterest gets the brand purple pill like in the reference
                  label === "Pinterest"
                    ? "!bg-[#5b5ef5]/80 !text-white hover:!bg-[#5b5ef5]"
                    : "",
                ].join(" ")}
              >
                <Icon width={15} height={15} />
              </a>
            ))}
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1">
            <span className="text-[0.75rem] text-[#6b6b75] hover:underline">
              Copyright Hireloop {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-3 text-[0.75rem] text-[#6b6b75]">
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms &amp; Policy
              </Link>
              <span className="text-[#2e2e38]">—</span>
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}