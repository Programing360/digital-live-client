"use client";

import React from "react";
import { Button, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Mail,
  MessageCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function FeatureShowcase() {
  // Framer Motion: AOS-style scroll animation presets for content
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  // Orbital rotation configurations for the interactive visual ring
  const orbitRotation = {
    animate: {
      rotate: 360,
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const counterRotation = {
    animate: {
      rotate: -360,
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="w-full min-h-[700px] flex items-center justify-center bg-gradient-to-b from-white to-slate-50/50 dark:from-[#2a0e65] dark:to-[#17053c] text-slate-900 dark:text-white py-16 px-6 sm:px-12 lg:px-16 overflow-hidden relative select-none transition-colors duration-500">
      {/* Dark Mode Exclusive Bottom-Left Wave Asset (from your 1st design) */}
      <div className="absolute bottom-0 left-0 w-full max-w-[500px] opacity-15 pointer-events-none hidden dark:block">
        <svg
          viewBox="0 0 500 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0,120 Q125,60 250,120 T500,120"
            stroke="#00e5b4"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            d="M0,130 Q125,80 250,130 T500,130"
            stroke="#8b5cf6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* ================= LEFT CONTENT: SAAS COPYWRITING & CTA ================= */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="lg:col-span-5 flex flex-col items-start space-y-6"
        >
          <motion.div
            variants={textItemVariants}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-[#00e5b4]/10 border border-indigo-100 dark:border-[#00e5b4]/20 rounded-full"
          >
            <Sparkles
              size={12}
              className="text-indigo-600 dark:text-[#00e5b4]"
            />
            <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] uppercase tracking-widest">
              Platform Showcase
            </span>
          </motion.div>

          <motion.h2
            variants={textItemVariants}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] max-w-md"
          >
            DIGITAL{" "}
            <span className="text-indigo-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-purple-200 block sm:inline">
              LIFE
            </span>{" "}
            LESSONS
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="text-sm font-medium leading-relaxed text-slate-500 dark:text-purple-200/50 max-w-sm"
          >
            Document the lessons life has taught you, discover inspiring stories
            from others, and build a personal library of wisdom that grows with
            every experience.
          </motion.p>

          <motion.div variants={textItemVariants} className="pt-2">
            <Link href={'/publicLessons'}>
              <Button
                size="lg"
                className="font-bold text-sm bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-[#17053c] shadow-lg shadow-indigo-600/20 dark:shadow-[0_0_25px_rgba(0,229,180,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl h-12 px-8"
              >
                Book a demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT CONTENT: ADVANCED ORBITAL GRAPHIC ================= */}
        <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[450px] sm:h-[500px]">
          {/* Outer Orbit Ring */}
          <motion.div
            variants={orbitRotation}
            animate="animate"
            className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-slate-200 dark:border-purple-500/10 flex items-center justify-center"
          >
            {/* Outer Orbit Avatars (Anchored symmetrically on the dashed line) */}
            <motion.div variants={counterRotation} className="absolute -top-4">
              <Avatar
                src="https://i.pravatar.cc/100?img=33"
                size="sm"
                isBordered
                className="border-white dark:border-purple-950"
              />
            </motion.div>
            <motion.div
              variants={counterRotation}
              className="absolute -bottom-4"
            >
              <Avatar
                src="https://i.pravatar.cc/100?img=12"
                size="sm"
                isBordered
                className="border-white dark:border-purple-950"
              />
            </motion.div>
            <motion.div variants={counterRotation} className="absolute -left-4">
              <Avatar
                src="https://i.pravatar.cc/100?img=60"
                size="sm"
                isBordered
                className="border-white dark:border-purple-950"
              />
            </motion.div>
            <motion.div
              variants={counterRotation}
              className="absolute -right-4"
            >
              <Avatar
                src="https://i.pravatar.cc/100?img=47"
                size="sm"
                isBordered
                className="border-white dark:border-purple-950"
              />
            </motion.div>
          </motion.div>

          {/* Inner Orbit Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-solid border-slate-100/80 dark:border-purple-500/5 flex items-center justify-center"
          >
            {/* Inner App Nodes / Core Communication Channels */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="absolute -top-5 p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20"
            >
              <Mail size={16} />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="absolute -bottom-5 p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-xl shadow-blue-500/20"
            >
              <MessageSquare size={16} />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="absolute -right-5 p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-500/20"
            >
              <MessageCircle size={16} />
            </motion.div>

            {/* Micro Dot Node Metrics on Path */}
            <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-indigo-500 dark:bg-[#00e5b4]" />
            <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-purple-400" />
          </motion.div>

          {/* Central Absolute Brand Core Node (The "cue" bubble replica) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute p-1 bg-white/40 dark:bg-purple-900/10 backdrop-blur-xl border border-white/60 dark:border-purple-500/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none z-20"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-purple-900 dark:to-indigo-950 flex flex-col items-center justify-center text-white border-4 border-white dark:border-[#2a0e65] shadow-inner relative group cursor-pointer">
              <span className="text-lg font-black tracking-tighter lowercase select-none">
                cue
              </span>
              <div className="absolute -bottom-1 right-5 p-1 bg-emerald-500 dark:bg-[#00e5b4] rounded-full border-2 border-white dark:border-[#2a0e65]">
                <Zap
                  size={8}
                  className="text-white dark:text-[#17053c] fill-current"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
