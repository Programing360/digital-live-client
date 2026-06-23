"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Icons
const SparkleIcon = () => (
  <svg className="w-4 h-4 text-indigo-600 dark:text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L22 11.6l-6.4 4.8L18 24l-6-4.8L6 24l2.4-7.6L2 11.6l7.6-2.4L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const UserGroupIcon = () => (
  <div className="w-10 h-10 rounded-full bg-cyan-500 dark:bg-cyan-400 flex items-center justify-center border border-white/20 shadow-lg text-slate-900">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

// Data Set
const digitalLessons = [
  {
    id: 1,
    tag: "Tech & Human Wisdom",
    heading: "Life teaches. We help you remember.",
    description: "Capture your life lessons, inspire others, and grow together as a community.",
    accentText: "from-indigo-600 to-purple-600 dark:from-cyan-300 dark:to-teal-200",
    card1: {
      name: "Sarah Ahmed",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      text: "The best investment you can make is in yourself.",
      likes: 342,
    },
    card2: {
      name: "Riad Hasan",
      time: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      text: "Discipline today leads to freedom tomorrow.",
      likes: 521,
    },
    bgImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80",
    variantLeft: {
      initial: { opacity: 0, y: 25 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    },
    variantCard1: {
      initial: { opacity: 0, scale: 0.9, y: -15 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 75 } },
      exit: { opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.3 } }
    },
    variantCard2: {
      initial: { opacity: 0, scale: 0.9, y: 25 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 65, delay: 0.05 } },
      exit: { opacity: 0, scale: 0.9, y: -25, transition: { duration: 0.3 } }
    }
  },
  {
    id: 2,
    tag: "Digital Mindfulness",
    heading: "Disconnect to truly reconnect.",
    description: "Master the art of closing tabs that no longer serve your mental headspace and focus.",
    accentText: "from-teal-600 to-emerald-600 dark:from-amber-300 dark:to-yellow-200",
    card1: {
      name: "Ayesha Rahman",
      time: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      text: "Consistency beats intensity every single time.",
      likes: 618,
    },
    card2: {
      name: "Zayn Malik",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      text: "Failures are just data points for redirection.",
      likes: 429,
    },
    bgImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=80",
    variantLeft: {
      initial: { opacity: 0, x: -25 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
    },
    variantCard1: {
      initial: { opacity: 0, scale: 0.85, x: 30 },
      animate: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 80 } },
      exit: { opacity: 0, scale: 1.1, transition: { duration: 0.3 } }
    },
    variantCard2: {
      initial: { opacity: 0, scale: 0.85, x: -30 },
      animate: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 75 } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
    }
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % digitalLessons.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = digitalLessons[currentIndex];

  return (
    // image_09bd6c.jpg এর কালার প্যালেট ভিত্তিক লাইট ও ডার্ক মোড ডিজাইন
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#31106a] dark:via-[#21094a] dark:to-[#12032e] text-slate-900 dark:text-white py-12 px-6 md:px-12 lg:px-16 select-none transition-colors duration-700">
      
      {/* Background Subtle Radial Glow (Dark Mode Only) */}
      <div className="absolute right-[-10%] top-[-10%] w-[65%] h-[85%] opacity-40 pointer-events-none z-0 hidden dark:block transition-all duration-1000">
        <div className="w-full h-full bg-gradient-to-br from-fuchsia-600/20 via-purple-500/10 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* ─── LEFT COLUMN: TEXTS BLOCK ─── */}
        <div className="lg:col-span-6 flex flex-col items-start min-h-[420px] justify-center text-left relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={slide.variantLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6 w-full"
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm">
                <SparkleIcon />
                <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-300 uppercase tracking-widest">
                  Share. Reflect. Grow.
                </span>
              </div>

              {/* Title Header */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {slide.heading.split(".")[0]}.
                <span className={`block bg-gradient-to-r ${slide.accentText} bg-clip-text text-transparent transition-all duration-700`}>
                  {slide.heading.split(".")[1]}
                </span>
              </h1>

              {/* Subtitle Info */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-purple-200/70 font-medium max-w-md leading-relaxed">
                {slide.description}
              </p>

              {/* Action Buttons (image_09bd6c.jpg Neon Teal Button Look) */}
              <div className="flex items-center gap-4 pt-2">
                <Button className="bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 font-bold px-8 shadow-xl shadow-indigo-600/20 dark:shadow-[#00e5b4]/20 transition-all hover:opacity-90" radius="full">
                  Start Sharing
                </Button>
                <Link href={'/publicLessons'}>
                  <Button variant="bordered" className="border-slate-200 dark:border-white/[0.15] bg-white dark:bg-white/[0.02] text-slate-700 dark:text-purple-100 hover:bg-slate-50 dark:hover:bg-white/[0.06] font-semibold px-8 shadow-sm" radius="full">
                    Explore Lessons
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Metrics Counter Box */}
          <div className="w-full max-w-lg bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-slate-100 dark:border-white/[0.06] rounded-2xl p-5 shadow-xl dark:shadow-2xl mt-12 grid grid-cols-4 gap-2 text-center transition-all">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-indigo-600 dark:text-cyan-400">12K+</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-purple-300/60 mt-0.5">Lessons Shared</p>
            </div>
            <div className="border-l border-slate-100 dark:border-white/[0.06]">
              <h3 className="text-lg sm:text-xl font-black text-indigo-600 dark:text-cyan-400">2.5K+</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-purple-300/60 mt-0.5">Contributors</p>
            </div>
            <div className="border-l border-slate-100 dark:border-white/[0.06]">
              <h3 className="text-lg sm:text-xl font-black text-indigo-600 dark:text-cyan-400">25K+</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-purple-300/60 mt-0.5">Lessons Saved</p>
            </div>
            <div className="border-l border-slate-100 dark:border-white/[0.06]">
              <h3 className="text-lg sm:text-xl font-black text-indigo-600 dark:text-cyan-400">95%</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-purple-300/60 mt-0.5">Positive Impact</p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: GRAPHIC CARDS ─── */}
        <div className="lg:col-span-6 relative w-full h-[480px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait">
            <div key={slide.id} className="relative w-full max-w-[500px] h-full flex items-center justify-center">
              
              {/* 1. TOP LEFT CARD */}
              <motion.div
                variants={slide.variantCard1}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-10 left-4 w-[240px] bg-white dark:bg-[#1a093c]/90 backdrop-blur-2xl rounded-2xl p-5 border border-slate-100 dark:border-white/[0.08] shadow-xl dark:shadow-2xl z-20 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Image src={slide.card1.avatar} alt={slide.card1.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-white/[0.05]" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-purple-100">{slide.card1.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-purple-300/50 font-medium">{slide.card1.time}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-purple-200 leading-relaxed mb-4">“{slide.card1.text}”</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-white/[0.04]">
                  <div className="flex items-center gap-1">
                    <HeartIcon />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-purple-300">{slide.card1.likes}</span>
                  </div>
                  <BookmarkIcon />
                </div>
              </motion.div>

              {/* 2. MIDDLE RIGHT IMAGE CARD */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: 0.1, duration: 0.5 } }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                className="absolute top-24 right-4 w-[200px] h-[130px] rounded-2xl overflow-hidden border border-slate-100 dark:border-white/[0.1] shadow-xl dark:shadow-2xl z-10"
              >
                <Image src={slide.bgImage} alt="Landscape Content" fill className="object-cover opacity-90 dark:opacity-70" />
              </motion.div>

              {/* 3. CENTER FLOATING ICON BADGE */}
              <div className="absolute left-0 top-[50%] transform -translate-y-1/2 z-30">
                <UserGroupIcon />
              </div>

              {/* 4. BOTTOM RIGHT CARD */}
              <motion.div
                variants={slide.variantCard2}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute bottom-10 right-6 w-[240px] bg-white dark:bg-[#1a093c]/90 backdrop-blur-2xl rounded-2xl p-5 border border-slate-100 dark:border-white/[0.08] shadow-xl dark:shadow-2xl z-20 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Image src={slide.card2.avatar} alt={slide.card2.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-white/[0.05]" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-purple-100">{slide.card2.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-purple-300/50 font-medium">{slide.card2.time}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-purple-200 leading-relaxed mb-4">“{slide.card2.text}”</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-white/[0.04]">
                  <div className="flex items-center gap-1">
                    <HeartIcon />
                    <span className="text-[10px] font-bold text-slate-500 dark:text-purple-300">{slide.card2.likes}</span>
                  </div>
                  <BookmarkIcon />
                </div>
              </motion.div>

            </div>
          </AnimatePresence>
        </div>

      </div>

      {/* ─── BOTTOM DECORATIVE WAVY LINES (image_09bd6c.jpg এর নিচের পার্ট ম্যাচিং) ─── */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 dark:opacity-20 pointer-events-none select-none">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96C120,85.3,240,64,360,58.7C480,53,600,64,720,74.7C840,85,960,96,1080,90.7C1200,85,1320,64,1380,53.3L1440,43V120H1380C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,0,120Z" fill="url(#wave-gradient)"/>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}