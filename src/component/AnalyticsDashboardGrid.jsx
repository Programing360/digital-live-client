"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

// Custom Star/Arrow Badge Button for Contributors
const ArrowUpRightIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

// Bookmark Ribbon Icon matching layout aesthetics 
const BookmarkActiveIcon = () => (
  <svg className="w-4 h-4 text-indigo-600 fill-indigo-100" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const contributorsData = [
  { id: 1, rank: 1, name: "Riad Hasan", lessons: 24, bg: "bg-amber-50/60 border-amber-100/50", rankColor: "text-amber-600 bg-amber-100" },
  { id: 2, rank: 2, name: "Nusrat Jahan", lessons: 18, bg: "bg-slate-50/60 border-slate-100", rankColor: "text-indigo-600 bg-indigo-100" },
  { id: 3, rank: 3, name: "Meher Afroz", lessons: 16, bg: "bg-orange-50/40 border-orange-100/40", rankColor: "text-orange-600 bg-orange-100" },
  { id: 4, rank: 4, name: "Tanvir Rahman", lessons: 12, bg: "bg-white border-slate-100", rankColor: "text-slate-500 bg-slate-100" },
  { id: 5, rank: 5, name: "Sadia Islam", lessons: 10, bg: "bg-white border-slate-100", rankColor: "text-slate-500 bg-slate-100" },
];

const savedLessonsData = [
  { id: 1, title: "The Power of Positive Thinking", meta: "Saved by 1.2K people", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=150&q=80" },
  { id: 2, title: "Discipline Today Day", meta: "Saved by 987 people", img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=150&q=80" },
  { id: 3, title: "Letting Go is Okay", meta: "Saved by 876 people", img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=150&q=80" },
  { id: 4, title: "Small Steps Every Day", meta: "Saved by 754 people", img: "https://images.unsplash.com/photo-1530603768230-3759979bad90?w=150&q=80" },
  { id: 5, title: "Believe in Your Journey", meta: "Saved by 642 people", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=150&q=80" },
];

export default function AnalyticsDashboardGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 14 } 
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white select-none overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* ================= COMPONENT 1: TOP CONTRIBUTORS ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Top Contributors of the Week
            </h3>
            <Button size="sm" variant="light" className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 min-w-0 h-8 rounded-lg">
              View All
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            {contributorsData.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${user.bg}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${user.rankColor}`}>
                    {user.rank}
                  </span>
                  
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100"
                  />
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{user.name}</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">{user.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {[1, 2, 3, 4].map((i) => (
                      <img 
                        key={i}
                        className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover opacity-85" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" 
                        alt="Mini contributor graphic" 
                      />
                    ))}
                  </div>
                  <button className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-indigo-50 flex items-center justify-center group transition-colors border border-slate-100">
                    <ArrowUpRightIcon />
                  </button>
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
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Most Saved Lessons
            </h3>
            <Button size="sm" variant="light" className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 min-w-0 h-8 rounded-lg">
              View All
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            {savedLessonsData.map((lesson) => (
              <motion.div
                key={lesson.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-50 bg-white shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <img 
                    src={lesson.img} 
                    alt={lesson.title} 
                    className="w-12 h-9 rounded-lg object-cover bg-slate-100"
                  />
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 tracking-tight line-clamp-1">{lesson.title}</span>
                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">{lesson.meta}</span>
                  </div>
                </div>

                <button className="w-7 h-7 rounded-lg bg-indigo-50/40 hover:bg-indigo-50 flex items-center justify-center border border-indigo-100/30 transition-colors mr-1">
                  <BookmarkActiveIcon />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}