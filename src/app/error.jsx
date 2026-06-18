"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

// Clean UI Action Icon Components
const AlertCircleIcon = () => (
  <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
  </svg>
);

export default function ErrorPage() {
  
  // Staggered Container Animation Schema
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        type: "spring",
        stiffness: 60,
        damping: 15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 py-16 px-6 overflow-hidden select-none">
      
      {/* Background Decorative Polygons & Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none" />

      {/* Main Glassmorphism Card Frame Panel */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-xl bg-white border border-slate-100/80 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.06)] text-center backdrop-blur-md z-10"
      >
        
        {/* Animated Alert Header Orb */}
        <motion.div 
          variants={itemVariants}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        >
          <AlertCircleIcon />
        </motion.div>

        {/* Heading Titles */}
        <motion.h1 
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          Something Went Wrong
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-sm font-medium text-slate-500 max-w-sm mx-auto leading-relaxed mt-3"
        >
          An unexpected systematic disruption occurred while parsing this workspace resource. Let's try reloading the archive space.
        </motion.p>

        {/* Error Code Diagnostic Indicator */}
        <motion.div 
          variants={itemVariants}
          className="inline-block mt-5 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest select-all"
        >
          Diagnostic Reference: ERR_CONNECTION_FAILED
        </motion.div>

        {/* Control Button Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-10 w-full"
        >
          <Button
            size="lg"
            className="bg-slate-900 text-white font-semibold px-7 w-full sm:w-auto shadow-md hover:bg-slate-800 transition-colors active:scale-98"
            radius="xl"
            onClick={() => window.location.reload()}
          >
            <RefreshIcon />
            Reload Page
          </Button>

          <Button
            size="lg"
            variant="bordered"
            className="border-slate-200 hover:bg-slate-50 font-semibold px-7 w-full sm:w-auto text-slate-700 active:scale-98"
            radius="xl"
            onClick={() => window.location.href = "/"}
          >
            <HomeIcon />
            Return Home
          </Button>
        </motion.div>

      </motion.div>
    </section>
  );
}