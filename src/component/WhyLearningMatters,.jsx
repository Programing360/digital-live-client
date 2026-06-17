"use client";

import { motion } from "framer-motion";

// Custom SVG Icons extracted and matched from image_36cd81.png
const HeartIcon = () => (
  <svg className="w-5 h-5 text-purple-500 fill-current" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SproutIcon = () => (
  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3.333-2-5-6-5 0 4 1.667 6 6 6zm0 0c0-3.333 2-5 6-5 0 4-1.667 6-6 6zm0 0v9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6" />
  </svg>
);

const SmileyIcon = () => (
  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M9 10h.01M15 10h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14.5c1 1.5 2.5 2 4 2s3-.5 4-2" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5L21 3m-3.5 14.5L21 21M6.5 17.5L3 21M6.5 6.5L3 3" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0zm6 10v-2a4 4 0 00-3-3.87m4-12a4 4 0 010 7.75" />
  </svg>
);

const featureData = [
  {
    id: 1,
    title: "Personal Growth",
    description: "Learn from experiences and become a better version of yourself.",
    icon: <SproutIcon />,
    iconBg: "bg-emerald-50",
  },
  {
    id: 2,
    title: "Emotional Wellbeing",
    description: "Reflect, heal, and build emotional strength through lessons.",
    icon: <SmileyIcon />,
    iconBg: "bg-amber-50",
  },
  {
    id: 3,
    title: "Better Decisions",
    description: "Past lessons guide you towards wiser choices in the future.",
    icon: <TargetIcon />,
    iconBg: "bg-indigo-50",
  },
  {
    id: 4,
    title: "Inspire Others",
    description: "Your story can be the light someone else needs to see.",
    icon: <UsersIcon />,
    iconBg: "bg-purple-50",
  },
];

export default function WhyLearningMatters() {
  // AOS-style Reveal Configuration Variants
  const headerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12 // Progressively reveals cards one by one
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white select-none overflow-hidden">
      
      {/* Title Header with Scroll-triggered Reveal */}
      <motion.div 
        variants={headerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-2 mb-10"
      >
        <HeartIcon />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Why Learning From Life Matters
        </h2>
      </motion.div>

      {/* Grid container with continuous staggered viewport observation */}
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
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-start bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-12px_rgba(99,102,241,0.08)] transition-all duration-300 group cursor-pointer"
          >
            {/* Box Icon Wrapper */}
            <div className={`p-2.5 rounded-xl ${feature.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}>
              {feature.icon}
            </div>

            {/* Content Details */}
            <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight group-hover:text-purple-600 transition-colors duration-200">
              {feature.title}
            </h3>
            
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}