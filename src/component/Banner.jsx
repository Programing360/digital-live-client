"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";

// Clean UI Design System Icons
const SparkleIcon = () => (
  <svg
    className="w-4 h-4 text-[#6366F1]"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l2.4 7.2L22 11.6l-6.4 4.8L18 24l-6-4.8L6 24l2.4-7.6L2 11.6l7.6-2.4L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-4 h-4 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    className="w-4 h-4 text-default-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);

export default function HeroSection() {
  // Animation Variants for Left Content Block
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Premium continuous infinite smooth float configuration
  const floatAnimation = (delay = 0) => ({
    y: ["0px", "-14px", "0px"],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-white via-slate-50 to-purple-50/40 py-16 px-6 md:px-12 lg:px-16">
      {/* Background Decorative Gradient Radial Bloom */}
      <div className="absolute right-[-10%] top-[5%] w-[65%] h-[85%] opacity-70 pointer-events-none z-0 hidden md:block">
        <div className="w-full h-full bg-gradient-to-br from-purple-200/40 via-indigo-100/50 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Column: Context Branding Titles */}
        <motion.div
          className="md:col-span-6 flex flex-col items-start gap-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag Wrapper Pill */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 bg-[#F1F5F9] border border-slate-200 px-3 py-1.5 rounded-full shadow-sm"
          >
            <SparkleIcon />
            <span className="text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
              Share. Reflect. Grow.
            </span>
          </motion.div>

          {/* Core App Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12]"
          >
            Life teaches. <br />
            <span className="bg-gradient-to-r from-[#5850EC] to-[#6366F1] bg-clip-text text-transparent">
              We help you remember.
            </span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-600 font-medium max-w-md leading-relaxed"
          >
            Capture your life lessons, inspire others, and grow together as a
            community.
          </motion.p>

          {/* Hero Action Trigger Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 w-full sm:w-auto pt-2"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#5850EC] to-[#6366F1] text-white font-semibold px-8 shadow-lg shadow-indigo-100 hover:opacity-95 transition-opacity"
              radius="full"
            >
              Start Sharing
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-slate-200 bg-white hover:bg-slate-50 font-semibold px-8 text-slate-700 shadow-sm"
              radius="full"
            >
              Explore Lessons
            </Button>
          </motion.div>

          {/* Platform Performance Metrics Block */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/40 grid grid-cols-4 gap-2 mt-8 text-center"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#5850EC]">
                12K+
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Lessons Shared
              </p>
            </div>
            <div className="border-l border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#5850EC]">
                2.5K+
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Contributors
              </p>
            </div>
            <div className="border-l border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#5850EC]">
                25K+
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Lessons Saved
              </p>
            </div>
            <div className="border-l border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold text-[#5850EC]">
                95%
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                Positive Impact
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Staggered Floating Cards Workspace */}
        <div className="md:col-span-6 relative flex items-center justify-center h-[450px] sm:h-[520px] w-full mt-8 md:mt-0">
          {/* Card Module 1: Sarah Ahmed Quote Card */}
          <motion.div
            animate={floatAnimation(0)}
            className="absolute top-6 left-4 sm:left-10 w-[250px] sm:w-[285px] bg-white rounded-2xl p-4 shadow-xl shadow-indigo-100/50 border border-slate-100/80 z-20"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Ahmed profile photo illustration asset"
                width={40}
                height={40}
                className="w-9 h-9 rounded-full object-cover border border-slate-50"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Sarah Ahmed
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold">
                  2 hours ago
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-snug">
              The best investment you can make is in yourself.
            </p>
            <div className="flex items-center justify-between mt-4 pt-1">
              <div className="flex items-center gap-1">
                <HeartIcon />
                <span className="text-[11px] font-bold text-slate-500">
                  342
                </span>
              </div>
              <BookmarkIcon />
            </div>
          </motion.div>

          {/* Card Module 2: Riad Hasan Quote Card */}
          <motion.div
            animate={floatAnimation(1.8)}
            className="absolute bottom-6 right-2 sm:right-6 w-[250px] sm:w-[285px] bg-white rounded-2xl p-4 shadow-xl shadow-indigo-100/50 border border-slate-100/80 z-20"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
                alt="Riad Hasan profile photo illustration asset"
                width={40}
                height={40}
                className="w-9 h-9 rounded-full object-cover border border-slate-50"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Riad Hasan</h4>
                <p className="text-[10px] text-slate-400 font-semibold">
                  1 day ago
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-snug">
              Discipline today leads to freedom tomorrow .
            </p>
            <div className="flex items-center justify-between mt-4 pt-1">
              <div className="flex items-center gap-1">
                <HeartIcon />
                <span className="text-[11px] font-bold text-slate-500">
                  521
                </span>
              </div>
              <BookmarkIcon />
            </div>
          </motion.div>

          {/* Center-Right: Nature Landscape Photo Thumbnail */}
          <motion.div
            animate={floatAnimation(0.9)}
            className="absolute top-[28%] right-4 sm:right-12 w-[170px] sm:w-[200px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10 hidden sm:block"
          >
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80"
              alt="Mountain nature background view scenery"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Accent Element: Blue Floating Account Circle Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], y: ["0px", "6px", "0px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-1%] top-[46%] bg-[#5850EC] text-white p-2.5 rounded-full shadow-xl z-30"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </motion.div>

          {/* Decorative Vector Sparkle Star */}
          <div className="absolute right-[24%] bottom-[26%] text-purple-300 opacity-50 pointer-events-none hidden sm:block">
            <svg
              className="w-8 h-8 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
