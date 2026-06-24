"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Premium Neon-Optimized SVG Icons mapped directly for Enterprise look
const HeartIcon = () => (
  <svg className="w-5 h-5 text-purple-500 dark:text-[#00e5b4] fill-current animate-pulse" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SproutIcon = () => (
  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3.333-2-5-6-5 0 4 1.667 6 6 6zm0 0c0-3.333 2-5 6-5 0 4-1.667 6-6 6zm0 0v9M9 17h6" />
  </svg>
);

const SmileyIcon = () => (
  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M9 10h.01M15 10h.01M8 14.5c1 1.5 2.5 2 4 2s3-.5 4-2" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0zm6 10v-2a4 4 0 00-3-3.87m4-12a4 4 0 010 7.75" />
  </svg>
);

const featureData = [
  {
    id: 1,
    title: "Personal Growth",
    description: "Learn from experiences and actively design a superior architectural version of yourself.",
    icon: <SproutIcon />,
    badgeColor: "text-emerald-600 dark:text-emerald-400",
    glowBg: "group-hover:bg-emerald-500/10",
    borderGlow: "hover:border-emerald-500/30",
  },
  {
    id: 2,
    title: "Emotional Wellbeing",
    description: "Reflect, master internally, and build systemic resilience through curated mental models.",
    icon: <SmileyIcon />,
    badgeColor: "text-amber-600 dark:text-amber-400",
    glowBg: "group-hover:bg-amber-500/10",
    borderGlow: "hover:border-amber-500/30",
  },
  {
    id: 3,
    title: "Better Decisions",
    description: "Convert previous performance logs into crystal clear, calculated choices for future vectors.",
    icon: <TargetIcon />,
    badgeColor: "text-indigo-600 dark:text-indigo-400",
    glowBg: "group-hover:bg-indigo-500/10",
    borderGlow: "hover:border-indigo-500/30",
  },
  {
    id: 4,
    title: "Inspire Others",
    description: "Deploy your historical framework to serve as an open-source beacon for peer networks.",
    icon: <UsersIcon />,
    badgeColor: "text-purple-600 dark:text-purple-400",
    glowBg: "group-hover:bg-purple-500/10",
    borderGlow: "hover:border-purple-500/30",
  },
];

export default function WhyLearningMatters() {
  const headerVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 18 } 
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-transparent select-none overflow-hidden relative">
      
      {/* Structural Minimalist Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-5 border-b border-slate-200/60 dark:border-white/[0.05]">
        <motion.div 
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <HeartIcon />
            <span className="text-xs font-black text-purple-600 dark:text-[#00e5b4] tracking-widest uppercase">
              Core Philosophies
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Learning From Life Matters
          </h2>
        </motion.div>
        
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-purple-300/30">
          <Sparkles size={14} className="text-indigo-500 dark:text-[#00e5b4]" />
          <span>Automated Matrix Evaluation</span>
        </div>
      </div>

      {/* Grid Architecture with Glassmorphism & Adaptive Hover States */}
      <motion.div 
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {featureData.map((feature) => (
          <motion.div
            key={feature.id}
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className={`flex flex-col items-start bg-white/70 dark:bg-[#1f0c41]/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/[0.05] ${feature.borderGlow} rounded-[28px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.01)] transition-all duration-300 group cursor-pointer relative overflow-hidden`}
          >
            {/* Subtle Gradient Spot Background Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/[0.02] dark:to-[#00e5b4]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Box Icon Wrapper with Dynamic Adaptive BG Colors */}
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] ${feature.glowBg} ${feature.badgeColor} mb-5 transition-all duration-300 border border-slate-100 dark:border-white/[0.03] shadow-inner`}>
              {feature.icon}
            </div>

            {/* Content Specifications */}
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-2.5 tracking-tight group-hover:text-purple-600 dark:group-hover:text-[#00e5b4] transition-colors duration-200">
              {feature.title}
            </h3>
            
            <p className="text-xs font-medium text-slate-500 dark:text-purple-200/60 leading-[1.6]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}