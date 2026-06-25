"use client";

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { BookOpen, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from '@/component/Dashboard/Sidebar';

// High-fidelity spring physics config
const premiumSpring = { type: "spring", stiffness: 220, damping: 26 };

export default function DashboardLayoutAdmin({ children, user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070214] flex text-slate-800 dark:text-zinc-100 antialiased transition-colors duration-500 relative overflow-hidden">
      
      {/* 🔮 Immersive Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* ================= PREMIUM MOBILE HEADER BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-[#0d0720]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/[0.05] flex items-center justify-between px-4 z-50 shadow-sm transition-colors duration-500">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl border border-indigo-500/20">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" size={20} />
          </div>
          <span className="font-black text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r reduction from-slate-900 to-slate-700 dark:from-white dark:to-zinc-400">
            Digital Life Lessons
          </span>
        </div>
        
        <Button 
          isIconOnly 
          variant="light" 
          radius="lg"
          className="text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div
            key={isMobileMenuOpen ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </Button>
      </div>

      {/* ================= NAVIGATION SHELL (SIDEBAR) ================= */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        user={user} 
      />

      {/* ================= VIEWPORT CANVAS CONTAINER ================= */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...premiumSpring, delay: 0.1 }}
        className="flex-1 lg:ml-64 p-4 sm:p-8 lg:p-12 pt-24 lg:pt-12 transition-all duration-300 max-w-[1700px] mx-auto w-full min-h-screen relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
}