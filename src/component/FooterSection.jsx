"use client";

import React from "react";
import { Link, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Mail, Shield, Activity, Heart } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function FooterSection() {
  
  // AOS-style Spring Stagger Animation Configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 110, damping: 16 } 
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-slate-50/40 to-slate-100/80 dark:from-[#2a0e65] dark:to-[#17053c] border-t border-slate-200/80 dark:border-purple-500/20 text-slate-500 dark:text-purple-200/60 font-sans relative overflow-hidden select-none">
      
      {/* Premium Light Mode Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-indigo-200/15 rounded-full blur-[140px] pointer-events-none dark:hidden" />
      <div className="absolute -bottom-10 right-1/4 w-[400px] h-[300px] bg-purple-200/10 rounded-full blur-[120px] pointer-events-none dark:hidden" />

      {/* Image-Inspired Wave Line Graphics (Bottom-Left Decorative Accent) */}
      <div className="absolute bottom-0 left-0 w-full max-w-[600px] opacity-20 pointer-events-none hidden dark:block">
        <svg viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,120 Q125,60 250,120 T500,120" stroke="#00e5b4" strokeWidth="0.75" fill="none" />
          <path d="M0,130 Q125,80 250,130 T500,130" stroke="#8b5cf6" strokeWidth="0.5" fill="none" />
          <path d="M0,140 Q125,100 250,140 T500,140" stroke="#00e5b4" strokeWidth="0.25" fill="none" />
        </svg>
      </div>

      {/* Main Core Layout Workspace */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-6 relative z-10"
      >
        
        {/* Column 1: Core SaaS App Identity Block */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-[#00e5b4]/10 dark:to-[#00e5b4]/20 border border-indigo-200 dark:border-[#00e5b4]/30 rounded-2xl text-white dark:text-[#00e5b4] shadow-md shadow-indigo-500/10 dark:shadow-[0_0_20px_rgba(0,229,180,0.15)]">
              <Sparkles size={18} className="animate-pulse" />
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:to-purple-100">
              Digital Life Lessons
            </span>
          </div>
          <p className="text-xs font-semibold leading-relaxed max-w-xs text-slate-500/90 dark:text-purple-200/40 pr-4">
            An advanced cognitive ledger system designed to map, optimize, and catalog critical life metrics into actionable blueprints.
          </p>
        </motion.div>

        {/* Column 2: Navigation Matrices */}
        <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] uppercase tracking-widest">Explore</h4>
          <ul className="flex flex-col gap-3 text-xs font-bold">
            {["Home", "Public Lessons", "Pricing", "About Us"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-purple-200/70 dark:hover:text-[#00e5b4] transition-colors duration-200 font-bold flex items-center gap-0.5 group/link">
                  {link}
                  <ArrowUpRight size={11} className="opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Trust & Governance */}
        <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] uppercase tracking-widest">Support</h4>
          <ul className="flex flex-col gap-3 text-xs font-bold">
            {["Help Center", "Terms & Conditions", "Privacy Policy", "Contact Us"].map((link) => (
              <li key={link}>
                <Link href="#" className="text-slate-600 hover:text-indigo-600 dark:text-purple-200/70 dark:hover:text-[#00e5b4] transition-colors duration-200 font-bold flex items-center gap-0.5 group/link">
                  {link}
                  <ArrowUpRight size={11} className="opacity-0 -translate-y-0.5 -translate-x-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Cryptographic Social & Contact Mesh */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col items-start gap-4">
          <h4 className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] uppercase tracking-widest">Connect Hub</h4>
          
          {/* Social Vector Grid */}
          <div className="flex items-center gap-2">
            {[
              { icon: <FaXTwitter size={13} />, href: "#" },
              { icon: <FaFacebookF size={13} />, href: "#" },
              { icon: <FaInstagram size={14} />, href: "#" },
              { icon: <FaLinkedinIn size={14} />, href: "#" }
            ].map((social, index) => (
              <Button
                key={index}
                isIconOnly
                radius="xl"
                variant="flat"
                className="w-8 h-8 bg-white dark:bg-purple-950/40 border border-slate-200 dark:border-purple-500/20 shadow-sm dark:shadow-none text-slate-600 dark:text-purple-200 hover:text-indigo-600 dark:hover:text-[#00e5b4] hover:border-indigo-500/30 dark:hover:border-[#00e5b4]/40 hover:bg-slate-50 dark:hover:bg-purple-900/30 transition-all duration-300"
              >
                {social.icon}
              </Button>
            ))}
          </div>

          {/* Luxury Email Node Component */}
          <div className="flex flex-col gap-1 mt-1 p-3 bg-white/80 dark:bg-purple-950/20 border border-slate-200 dark:border-purple-500/10 backdrop-blur-md rounded-2xl w-full max-w-xs shadow-sm dark:shadow-none">
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 dark:text-[#00e5b4]/50 font-black uppercase tracking-widest">
              <Mail size={10} />
              <span>Communications Layer</span>
            </div>
            <a href="mailto:support@digitallifelessons.com" className="text-xs font-black text-slate-800 dark:text-purple-100 hover:text-indigo-600 dark:hover:text-[#00e5b4] transition-colors mt-0.5 break-all">
              support@digitallifelessons.com
            </a>
          </div>
        </motion.div>

      </motion.div>

      {/* Bottom Sub-Strip Area */}
      <div className="w-full border-t border-slate-200/60 dark:border-purple-500/10 bg-slate-100/40 dark:bg-[#120330]/60 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-slate-400 dark:text-purple-300/30">
          <div className="flex items-center gap-1">
            <span>© 2026 Digital Life Lessons. Built with</span>
            <Heart size={10} className="text-rose-500 fill-current" />
            <span>and precision.</span>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-slate-600 dark:hover:text-[#00e5b4] transition-colors">
              <Shield size={11} /> Security Stack
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 dark:text-purple-300/30">
              <Activity size={11} className="text-[#00e5b4] animate-pulse" /> 
              <span className="text-slate-600 dark:text-purple-200/60">Node Online</span>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}