"use client";

import { motion } from "framer-motion";

// Professional abstract geometric brand icon matching your design aesthetic
const LoadingBrandLogo = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export default function LoadingPage() {
  
  // Outer infinite rotation animation setup
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1.8
  };

  // Stagger configurations for text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0.3, y: 0 },
    visible: {
      opacity: 1,
      y: [0, -4, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="fixed inset-0 w-full h-screen z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Soft Premium Background Ambient Glow Layout */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-transparent blur-[80px] rounded-full" 
        />
      </div>

      {/* Main Core Loading Core Panel Wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Double-Ring Core Loader & Icon Container */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          
          {/* Outer Segmented Accent Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={spinTransition}
            className="absolute inset-0 rounded-full border-3 border-transparent border-t-indigo-600 border-b-purple-500"
          />

          {/* Inner Counter-Rotating Track Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ ...spinTransition, duration: 1.2 }}
            className="absolute inset-2 rounded-full border border-dashed border-slate-200/80"
          />

          {/* Static Centered Content Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-white p-2 rounded-full shadow-sm"
          >
            <LoadingBrandLogo />
          </motion.div>
        </div>

        {/* Clean Typographic Branding Header */}
        <h2 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase mb-1">
          Digital Life Lessons
        </h2>

        {/* Professional Staggered Status Text Loader */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-0.5 text-xs font-semibold text-slate-400 tracking-wide"
        >
          {["L", "o", "a", "d", "i", "n", "g", " ", "a", "r", "c", "h", "i", "v", "e", "s"].map((char, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              className={char === " " ? "mx-0.5" : ""}
            >
              {char}
            </motion.span>
          ))}
          
          {/* Animated Appending Dot Matrix */}
          <span className="flex ml-0.5 text-indigo-500 font-bold">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0 }} >.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} >.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} >.</motion.span>
          </span>
        </motion.div>

      </div>
    </section>
  );
}