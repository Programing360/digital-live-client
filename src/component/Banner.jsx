"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Custom UI Vector Icons
const SparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-indigo-600 dark:text-[#00e5b4]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L22 11.6l-6.4 4.8L18 24l-6-4.8L6 24l2.4-7.6L2 11.6l7.6-2.4L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-3.5 h-3.5 text-neutral-400 dark:text-purple-300/40" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const UserGroupIcon = () => (
  <div className="w-10 h-10 rounded-2xl bg-indigo-600 dark:bg-[#00e5b4] flex items-center justify-center border border-white/20 shadow-lg dark:shadow-[0_0_20px_rgba(0,229,180,0.25)] text-white dark:text-[#17053c]">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

// 3 Dynamic Slides with Platforms Meaningful Data
const digitalLessons = [
  {
    id: 1,
    tag: "Tech & Human Wisdom",
    heading: "Life teaches. We help you remember.",
    description: "Capture your life insights, structure core experiences, and index personal breakthroughs systematically inside a trusted enterprise framework.",
    accentText: "from-indigo-600 to-purple-600 dark:from-[#00e5b4] dark:to-teal-300",
    card1: {
      name: "Sarah Ahmed",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      text: "The absolute best cryptographic investment you can ever make is in your own atomic habits.",
      likes: 342,
    },
    card2: {
      name: "Riad Hasan",
      time: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      text: "Rigorous digital discipline today transforms directly into operational freedom tomorrow.",
      likes: 521,
    },
    bgImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80",
    variantLeft: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }
  },
  {
    id: 2,
    tag: "Digital Mindfulness",
    heading: "Disconnect tabs. Reconnect focus.",
    description: "Master the architecture of cognitive filtering. Close ambient headspaces that no longer serve your core execution metrics.",
    accentText: "from-teal-600 to-emerald-600 dark:from-[#00e5b4] dark:to-cyan-200",
    card1: {
      name: "Ayesha Rahman",
      time: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      text: "Architectural consistency beats single-burst intensity every single execution phase.",
      likes: 618,
    },
    card2: {
      name: "Zayn Malik",
      time: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      text: "System anomalies and failures are just clean data vectors deployed for directional correction.",
      likes: 429,
    },
    bgImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=80",
    variantLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, x: 30, transition: { duration: 0.3 } }
    }
  },
  {
    id: 3,
    tag: "Atomic Scaling",
    heading: "Micro steps. Macro compounding.",
    description: "Systematically scale from your atomic lifestyle data. Map daily compound behaviors into macro career and wellness transformations.",
    accentText: "from-purple-600 to-pink-600 dark:from-purple-300 dark:to-fuchsia-300",
    card1: {
      name: "Tanvir Saim",
      time: "10 mins ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      text: "Small daily structural iterations aggregate into massive competitive plateaus.",
      likes: 812,
    },
    card2: {
      name: "Nabila Karim",
      time: "12 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      text: "Optimize your workflow stack early. Protect your energy channels fiercely from noise.",
      likes: 934,
    },
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80",
    variantLeft: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
    }
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance loop for slider mechanics
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % digitalLessons.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = digitalLessons[currentIndex];

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#2a0e65] dark:via-[#21094a] dark:to-[#17053c] text-slate-900 dark:text-white py-16 px-6 md:px-12 lg:px-16 select-none transition-colors duration-700">
      
      {/* High-Fidelity Ambient Mesh Glows */}
      <div className="absolute right-[-10%] top-[-10%] w-[65%] h-[85%] opacity-30 pointer-events-none z-0 hidden dark:block transition-all duration-1000">
        <div className="w-full h-full bg-gradient-to-br from-[#00e5b4]/20 via-purple-500/10 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* ================= LEFT COLUMN: TEXTS BLOCK ================= */}
        <div className="lg:col-span-6 flex flex-col items-start min-h-[440px] justify-center text-left relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              variants={slide.variantLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6 w-full"
            >
              {/* Badge Pillar Component */}
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-purple-950/40 border border-slate-200 dark:border-purple-500/20 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm">
                <SparkleIcon />
                <span className="text-[9px] font-black text-indigo-600 dark:text-[#00e5b4] uppercase tracking-widest">
                  {slide.tag}
                </span>
              </div>

              {/* Header Title with String Split Mapping */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {slide.heading.split(".")[0]}.
                <span className={`block bg-gradient-to-r ${slide.accentText} bg-clip-text text-transparent transition-all duration-700 mt-1`}>
                  {slide.heading.split(".")[1]}
                </span>
              </h1>

              {/* Subtext Body */}
              <p className="text-xs sm:text-sm text-slate-500 dark:text-purple-200/50 font-semibold max-w-md leading-relaxed">
                {slide.description}
              </p>

              {/* Interactive Action Node Triggers */}
              <div className="flex items-center gap-3.5 pt-2">
                <Button className="bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-[#17053c] font-black px-8 shadow-xl shadow-indigo-600/10 dark:shadow-[0_0_25px_rgba(0,229,180,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]" radius="xl">
                  Start Sharing
                </Button>
                <Link href='/publicLessons'>
                  <Button variant="bordered" className="border-slate-200 dark:border-purple-500/20 bg-white dark:bg-purple-950/20 text-slate-700 dark:text-purple-100 hover:bg-slate-50 dark:hover:bg-purple-900/40 font-bold md:px-8 shadow-sm transition-all" radius="xl">
                    Explore Lessons
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sider Dots Indicator System */}
          <div className="flex items-center gap-2 mt-8">
            {digitalLessons.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-6 bg-indigo-600 dark:bg-[#00e5b4]" 
                    : "w-1.5 bg-slate-200 dark:bg-purple-500/20"
                }`}
              />
            ))}
          </div>

          {/* Metric Dashboard Box */}
          <div className="w-full max-w-lg bg-white/80 dark:bg-purple-950/10 backdrop-blur-xl border border-slate-200/60 dark:border-purple-500/10 rounded-2xl p-5 shadow-sm dark:shadow-none mt-8 grid grid-cols-4 gap-2 text-center transition-all">
            {[
              { val: "12K+", lab: "Lessons Shared" },
              { val: "2.5K+", lab: "Contributors" },
              { val: "25K+", lab: "Lessons Saved" },
              { val: "95%", lab: "Positive Impact" }
            ].map((stat, idx) => (
              <div key={idx} className={idx !== 0 ? "border-l border-slate-200/60 dark:border-purple-500/10" : ""}>
                <h3 className="text-base sm:text-lg font-black text-indigo-600 dark:text-[#00e5b4]">{stat.val}</h3>
                <p className="text-[9px] font-black text-slate-400 dark:text-purple-300/30 mt-0.5 uppercase tracking-wider">{stat.lab}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: GRAPHIC CARDS ================= */}
        <div className="lg:col-span-6 relative w-full h-[480px] flex items-center justify-center [perspective:1200px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={slide.id} 
              initial={{ opacity: 0, rotateY: 15 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -15 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="relative w-full max-w-[500px] h-full flex items-center justify-center"
            >
              
              {/* Card 1: Floating Profile Element */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                className="absolute top-10 left-4 w-[240px] bg-white/90 dark:bg-purple-950/40 backdrop-blur-2xl rounded-2xl p-5 border border-slate-200/80 dark:border-purple-500/20 shadow-xl dark:shadow-none z-20 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Image src={slide.card1.avatar} alt={slide.card1.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-purple-500/30" />
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-purple-100">{slide.card1.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-purple-300/40 font-semibold">{slide.card1.time}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-purple-200 leading-relaxed mb-4">“{slide.card1.text}”</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-purple-500/10">
                  <div className="flex items-center gap-1">
                    <HeartIcon />
                    <span className="text-[10px] font-black text-slate-400 dark:text-purple-300">{slide.card1.likes}</span>
                  </div>
                  <BookmarkIcon />
                </div>
              </motion.div>

              {/* Card 2: Midground Visual Vector Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -40 }}
                transition={{ type: "spring", stiffness: 85, delay: 0.15 }}
                className="absolute top-24 right-4 w-[210px] h-[140px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-purple-500/20 shadow-xl dark:shadow-none z-10"
              >
                <Image src={slide.bgImage} alt="Platform Node Visual" fill className="object-cover opacity-95 dark:opacity-60" priority />
              </motion.div>

              {/* Absolute Center Micro Anchor Badge */}
              <div className="absolute left-0 top-[50%] transform -translate-y-1/2 z-30">
                <UserGroupIcon />
              </div>

              {/* Card 3: Lower Stack Floating Element */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -30, y: -30 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="absolute bottom-10 right-6 w-[240px] bg-white/90 dark:bg-purple-950/40 backdrop-blur-2xl rounded-2xl p-5 border border-slate-200/80 dark:border-purple-500/20 shadow-xl dark:shadow-none z-20 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Image src={slide.card2.avatar} alt={slide.card2.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-purple-500/30" />
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-purple-100">{slide.card2.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-purple-300/40 font-semibold">{slide.card2.time}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-purple-200 leading-relaxed mb-4">“{slide.card2.text}”</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-purple-500/10">
                  <div className="flex items-center gap-1">
                    <HeartIcon />
                    <span className="text-[10px] font-black text-slate-400 dark:text-purple-300">{slide.card2.likes}</span>
                  </div>
                  <BookmarkIcon />
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative Bottom Grid/Wave Asset */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 dark:opacity-20 pointer-events-none select-none">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96C120,85.3,240,64,360,58.7C480,53,600,64,720,74.7C840,85,960,96,1080,90.7C1200,85,1320,64,1380,53.3L1440,43V120H1380C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,0,120Z" fill="url(#hero-wave-gradient)"/>
          <defs>
            <linearGradient id="hero-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#00e5b4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}