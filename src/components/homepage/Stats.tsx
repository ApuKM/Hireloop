"use client"

import { StatCard } from '@/utils/types/homePageTypes';
import { motion, Variants } from "motion/react"

// 1. Container variants to stagger the child animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time in seconds between each card appearing
    },
  },
};

// 2. Card variants for the individual slide-up effect
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const Statistics = ({ stats }: { stats: StatCard[] }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }} // Triggers just as it enters the viewport
      className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 -mt-16 md:-mt-28 lg:-mt-40"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={cardVariants}
          whileHover={{ y: -5 }} // Subtle lift on hover
          className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col gap-8 shadow-xl transition-colors hover:bg-[#111]"
        >
          <div>{stat.icon}</div>
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-semibold tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Statistics;
