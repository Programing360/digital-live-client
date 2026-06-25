"use client";

import React, { useState, memo } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, Sparkles } from "lucide-react";
import Sidebar from "@/component/Dashboard/Sidebar";

// ─── ANIMATION SPRING DEFINITIONS ───
const SPRING_TRANSITION = { type: "spring", stiffness: 180, damping: 24 };

const layoutVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING_TRANSITION },
};

export default function DashboardLayout({ children, user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#09021a] text-slate-800 dark:text-purple-100 antialiased flex transition-colors duration-500 relative overflow-x-hidden selection:bg-[#00e5b4]/30">
      
      {/* Immersive Structural Background Engineering */}
      <BackgroundGlowNodes />

      {/* Mobile Top Interactive Navigation Shell */}
      <MobileHeader 
        isMobileMenuOpen={isMobileMenuOpen} 
        onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* Dynamic Native Sidebar Module */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
      />

      {/* Primary Global Viewport Workspace */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-10 pt-24 lg:pt-10 transition-all duration-300 max-w-7xl mx-auto w-full relative z-10 flex flex-col min-w-0">
        <motion.div
          variants={layoutVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

// ─── COMPONENT: ISOLATED METRIC BACKGROUND GLOWS ───
const BackgroundGlowNodes = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
    {/* Micro Mesh Subtle Grid Vector Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
    
    {/* Upper Radial Structural Aura */}
    <div className="absolute right-[-5%] top-[-5%] w-[600px] h-[600px] opacity-25 dark:opacity-20 pointer-events-none hidden sm:block">
      <div className="w-full h-full bg-gradient-to-br from-[#00e5b4] via-purple-600 to-transparent blur-[140px] rounded-full animate-pulse [animation-duration:8s]" />
    </div>
    
    {/* Left Secondary Balancing Aura */}
    <div className="absolute left-[-10%] bottom-[-5%] w-[400px] h-[400px] opacity-10 dark:opacity-[0.07] pointer-events-none hidden lg:block">
      <div className="w-full h-full bg-indigo-500 blur-[100px] rounded-full" />
    </div>
  </div>
));
BackgroundGlowNodes.displayName = "BackgroundGlowNodes";

// ─── COMPONENT: ISOLATED MOBILE HEADER PIPELINE ───
const MobileHeader = memo(({ isMobileMenuOpen, onToggleMenu }) => (
  <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/75 dark:bg-[#09021a]/75 backdrop-blur-xl border-b border-slate-200/50 dark:border-purple-500/10 flex items-center justify-between px-6 z-50 transition-colors duration-500">
    <div className="flex items-center gap-3">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 bg-indigo-600/5 dark:bg-[#00e5b4]/10 rounded-xl border border-indigo-500/10 dark:border-[#00e5b4]/20 flex items-center justify-center shadow-inner"
      >
        <BookOpen className="text-indigo-600 dark:text-[#00e5b4]" size={16} />
      </motion.div>
      <span className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5">
        Frameworks 
        <Sparkles size={11} className="text-amber-400 fill-amber-400/20 animate-pulse" />
      </span>
    </div>

    <Button
      isIconOnly
      variant="light"
      radius="xl"
      aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      className="text-slate-700 dark:text-purple-200 bg-slate-100/60 dark:bg-purple-950/40 border border-slate-200/40 dark:border-purple-500/10 hover:bg-slate-200/50 dark:hover:bg-purple-900/40 h-9 w-9 min-w-9 transition-all"
      onClick={onToggleMenu}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isMobileMenuOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -30, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.85 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {isMobileMenuOpen ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
        </motion.div>
      </AnimatePresence>
    </Button>
  </header>
));
MobileHeader.displayName = "MobileHeader";