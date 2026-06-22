
"use client";

import Link from 'next/link';
import { BiHome } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import { LuShieldAlert } from 'react-icons/lu';


export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-zinc-900 px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8 bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
        
        {/* Animated Icon Container */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-400 animate-pulse">
            <LuShieldAlert size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            403
          </h1>
          <h2 className="text-xl font-semibold text-slate-200">
            Access Denied
          </h2>
          <p className="text-base text-slate-400">
            Sorry, you dont have permission to access this page. It looks like you have reached a restricted area.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-slate-800" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all duration-200 border border-slate-700 shadow-sm"
          >
            <BsArrowLeft size={18} />
            Go Back
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
          >
            <BiHome size={18} />
            Return Home
          </Link>
        </div>

      </div>
    </div>
  )
}