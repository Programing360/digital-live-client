"use client";

import React from "react";
import { Button, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Trophy, Star } from "lucide-react";
import Image from "next/image";

const contributorsData = [
  { id: 1, rank: 1, name: "Riad Hasan", lessons: 24, glow: "hover:border-amber-500/30", rankColor: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: 2, rank: 2, name: "Nusrat Jahan", lessons: 18, glow: "hover:border-[#00e5b4]/30", rankColor: "text-indigo-600 dark:text-[#00e5b4] bg-indigo-500/10 dark:bg-[#00e5b4]/10 border-indigo-500/20 dark:border-[#00e5b4]/20" },
  { id: 3, rank: 3, name: "Meher Afroz", lessons: 16, glow: "hover:border-purple-500/30", rankColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { id: 4, rank: 4, name: "Tanvir Rahman", lessons: 12, glow: "hover:border-slate-400/30", rankColor: "text-slate-500 dark:text-slate-400 bg-slate-500/10 border-slate-500/20" },
  { id: 5, rank: 5, name: "Sadia Islam", lessons: 10, glow: "hover:border-slate-400/30", rankColor: "text-slate-500 dark:text-slate-400 bg-slate-500/10 border-slate-500/20" },
];

const savedLessonsData = [
  { id: 1, title: "The Power of Positive Thinking", meta: "1.2K Sync Operations", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=150&q=80" },
  { id: 2, title: "Discipline Today Day", meta: "987 Active Saves", img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=150&q=80" },
  { id: 3, title: "Letting Go is Okay", meta: "876 Knowledge Pulls", img: "https://images.unsplash.com/photo-1530603768230-3759979bad90?w=150&q=80" },
  { id: 4, title: "Small Steps Every Day", meta: "754 Index Deployments", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&q=80" },
  { id: 5, title: "Believe in Your Journey", meta: "642 Base Commits", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" },
];

export default function AnalyticsDashboardGrid() {
  // AOS-style Spring Reveal Configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 16 } 
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-transparent rounded-[32px] border border-slate-200/40 dark:border-none select-none overflow-hidden relative mb-10">
      
      {/* Subtle Light-Mode Decorative Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none dark:hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative z-10">
        
        {/* ================= COMPONENT 1: TOP CONTRIBUTORS ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col space-y-5"
        >
          <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200 dark:border-white/[0.05]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-amber-500 dark:text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] tracking-widest uppercase">Performance Leaderboard</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Top Contributors of the Week
              </h3>
            </div>
            <Button 
              size="sm" 
              variant="flat" 
              className="text-xs font-bold text-indigo-600 dark:text-purple-200 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.05] shadow-sm dark:shadow-none rounded-xl px-4 h-9"
            >
              View All
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {contributorsData.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                whileHover={{ x: 6, y: -2 }}
                className={`flex items-center justify-between p-3.5 bg-white dark:bg-[#1f0c41]/20 border border-slate-200/80 dark:border-white/[0.05] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none transition-all duration-300 group cursor-pointer ${user.glow}`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black border ${user.rankColor}`}>
                    {user.rank}
                  </span>
                  
                  <Avatar 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                    className="w-9 h-9 border border-slate-100 dark:border-none"
                    isBordered
                    color="secondary"
                  />
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 dark:text-purple-50 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 mt-0.5 uppercase tracking-wider">
                      {user.lessons} Knowledge Modules
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Shared Assets Stack */}
                  <div className="hidden sm:flex -space-x-2 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3].map((i) => (
                      <Image 
                        key={i}
                        className="inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-[#12032e] object-cover" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" 
                        alt="Network user" 
                        width={400}
                        height={400}
                      />
                    ))}
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="bg-slate-50 dark:bg-white/[0.03] hover:bg-indigo-50 dark:hover:bg-[#00e5b4]/10 border border-slate-200 dark:border-white/[0.05] text-slate-400 dark:text-purple-300/40 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] rounded-xl"
                  >
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= COMPONENT 2: MOST SAVED LESSONS ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col space-y-5"
        >
          <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200 dark:border-white/[0.05]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-indigo-600 dark:text-[#00e5b4]" />
                <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] tracking-widest uppercase">Popular Assets</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Most Saved Lessons
              </h3>
            </div>
            <Button 
              size="sm" 
              variant="flat" 
              className="text-xs font-bold text-indigo-600 dark:text-purple-200 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.05] rounded-xl px-4 h-9 shadow-sm dark:shadow-none"
            >
              View All
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {savedLessonsData.map((lesson) => (
              <motion.div
                key={lesson.id}
                variants={itemVariants}
                whileHover={{ x: 6, y: -2 }}
                className="flex items-center justify-between p-2.5 bg-white dark:bg-[#1f0c41]/20 border border-slate-200/80 dark:border-white/[0.05] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none hover:border-indigo-500/30 dark:hover:border-[#00e5b4]/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-slate-900/10 border border-slate-200/40 dark:border-white/10">
                    <Image 
                      src={lesson.img} 
                      alt={lesson.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={40}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 dark:text-purple-50 tracking-tight line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors">
                      {lesson.title}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 mt-0.5">
                      {lesson.meta}
                    </span>
                  </div>
                </div>

                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-indigo-50 dark:bg-[#00e5b4]/5 text-indigo-600 dark:text-[#00e5b4] border border-indigo-100 dark:border-[#00e5b4]/10 rounded-xl mr-1 shadow-sm"
                >
                  <Bookmark size={13} className="fill-current" strokeWidth={2.5} />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}