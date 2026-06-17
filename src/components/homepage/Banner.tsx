
import Image from 'next/image';
import { FiSearch, FiMapPin, FiStar } from 'react-icons/fi';
import { BsBuildings, BsBriefcase, BsPersonBoundingBox } from 'react-icons/bs';
import Statistics from "@/components/homepage/Stats"
import { StatCard } from '@/utils/types/HomePageTypes';

export default function HeroSection() {
  const stats: StatCard[] = [
    {
      id: 1,
      icon: <BsBriefcase className="text-gray-400 text-lg" />,
      value: '50K',
      label: 'Active Jobs',
    },
    {
      id: 2,
      icon: <BsBuildings className="text-gray-400 text-lg" />,
      value: '12K',
      label: 'Companies',
    },
    {
      id: 3,
      icon: <BsPersonBoundingBox className="text-gray-400 text-lg" />,
      value: '2M',
      label: 'Job Seekers',
    },
    {
      id: 4,
      icon: <FiStar className="text-gray-400 text-lg" />,
      value: '97%',
      label: 'Satisfaction Rate',
    },
  ];

  const trendingTags: string[] = ['Product Designer', 'AI Engineering', 'Dev-ops Engineer'];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center py-16 px-4 font-sans">
      
      {/* --- Top Text Content --- */}
      <div className="flex flex-col items-center z-10 w-full max-w-4xl text-center">
        
        {/* Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-linear-to-r from-transparent to-gray-500 rounded-full"></div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111] border border-white/10 text-xs font-semibold tracking-wider text-gray-300">
            <span>💼</span> 50,000+ NEW JOBS THIS MONTH
          </div>
          <div className="h-px w-8 bg-linear-to-l from-transparent to-gray-500 rounded-full"></div>
        </div>

        {/* Headings */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Find Your Dream Job Today
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <form className="w-full max-w-3xl flex flex-col sm:flex-row items-center bg-[#0a0a0a] border border-white/10 rounded-full p-1 shadow-2xl mb-6 ">
          
          <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0 w-full">
            <FiSearch className="text-gray-400 text-xl" />
            <input 
              type="text" 
              placeholder="Job title, skill or company" 
              className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500"
            />
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/10"></div>

          <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0 w-full">
            <FiMapPin className="text-gray-400 text-xl" />
            <input 
              type="text" 
              placeholder="Location or Remote" 
              className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full sm:w-auto bg-[#5a45ff] hover:bg-[#4936e0] transition-colors p-3 rounded-full flex items-center justify-center mt-2 sm:mt-0"
          >
            <FiSearch className="text-white text-lg" />
          </button>
        </form>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-gray-400">Trending Position</span>
          {trendingTags.map((tag) => (
            <button 
              key={tag} 
              className="px-3 py-1 rounded-full bg-[#111] hover:bg-[#222] border border-white/5 text-gray-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* --- Globe & Stats Section --- */}
      <div className="relative w-full max-w-6xl mt-10 flex flex-col items-center">
        
        {/* Overlaid Globe Text */}
        <div className="absolute top-12 z-20 text-center w-full px-4">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300">
            Assisting over <span className="font-semibold text-white">15,000</span> job seekers <br /> 
            find their dream positions.
          </h2>
        </div>

        {/* Globe Image Area */}
        <div className="relative w-full aspect-2/1 max-w-4xl opacity-80 pointer-events-none">
          {/* REPLACE WITH YOUR GLOBE IMAGE */}
          <Image 
            src="/logo/globe.png" 
            alt="World Globe" 
            fill 
            className="object-cover object-center mask-image-b"
            priority
          />
          {/* Optional: Radial gradient fallback behind the image to simulate glow */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
        </div>

        {/* Stats Cards */}
       <Statistics stats={stats}/>

      </div>

    </section>
  );
}