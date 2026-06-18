"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

// Clean UI Home Navigation Icon Component
const HomeIcon = () => (
  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// Clean UI Refresh/Back Navigation Icon Component
const ArrowLeftIcon = () => (
  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default function NotFoundPage() {
  // Staggered Container Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  // Item Fade Up Slide Transition Setup
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 14 }
    }
  };

  // Continuous background float script configuration
  const floatAnimation = (delay = 0) => ({
    y: ["0px", "-15px", "0px"],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-tr from-white via-slate-50 to-purple-50/40 py-16 px-6 overflow-hidden select-none">
      
      {/* Background Decorative Radial Blobs */}
      <div className="absolute left-[-10%] bottom-[-10%] w-[50%] h-[60%] opacity-60 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-tr from-purple-200/30 via-indigo-100/40 to-transparent blur-[120px] rounded-full" />
      </div>
      <div className="absolute right-[-5%] top-[-5%] w-[45%] h-[55%] opacity-60 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-indigo-200/30 via-purple-100/40 to-transparent blur-[120px] rounded-full" />
      </div>

      {/* Main Core Content Layout Block */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center max-w-2xl mx-auto z-10"
      >
        
        {/* Floating Decorative Elements Wrapper Frame */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
          {/* Top Left Floating Lesson Card Mini Badge */}
          <motion.div 
            animate={floatAnimation(0)}
            className="absolute -top-12 -left-20 bg-white/80 backdrop-blur-sm border border-slate-100 px-3.5 py-2 rounded-2xl shadow-xl shadow-indigo-100/30 text-xs font-bold text-slate-700 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Page Lost
          </motion.div>

          {/* Bottom Right Floating Star Element */}
          <motion.div 
            animate={floatAnimation(1.5)}
            className="absolute -bottom-6 -right-16 bg-white/80 backdrop-blur-sm border border-slate-100 px-4 py-2.5 rounded-2xl shadow-xl shadow-purple-100/30 text-xs font-bold text-indigo-600 flex items-center gap-1.5"
          >
            ✨ Keep Growing
          </motion.div>
        </div>

        {/* 404 Large Visual Title Graphic Layer */}
        <motion.div variants={itemVariants} className="relative select-none">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-black tracking-tighter bg-gradient-to-b from-indigo-600 to-[#5850EC] bg-clip-text text-transparent leading-none drop-shadow-sm">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent blur-sm pointer-events-none" />
        </motion.div>

        {/* Error Typography Information Block */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            This page left no lesson behind.
          </h2>
          <p className="text-base font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            The story you are looking for does not exist, or has been moved to a different public space archive.
          </p>
        </motion.div>

        {/* Action Navigation Controls Wrapper */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-10"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#5850EC] to-[#6366F1] text-white font-semibold px-8 py-6 w-full sm:w-auto shadow-lg shadow-indigo-100 hover:opacity-95 transition-opacity active:scale-98"
            radius="full"
            onClick={() => window.location.href = "/"}
          >
            <HomeIcon />
            Back to Home
          </Button>

          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 bg-white hover:bg-slate-50 font-semibold px-8 py-6 w-full sm:w-auto text-slate-700 shadow-sm active:scale-98"
            radius="full"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon />
            Go Back
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}