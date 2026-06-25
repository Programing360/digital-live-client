"use client";

import React from "react";
import { Card, Chip, Avatar, Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  ArrowLeft,
  Heart,
  Award,
  Sparkles,
  Inbox,
  Crown,
  ShieldCheck,
} from "lucide-react";

const toneColorMap = {
  Motivational:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  emotionalTone:
    "bg-emerald-500/10 text-emerald-600 dark:text-[#00e5b4] border-emerald-500/20",
  Peaceful:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Neutral:
    "bg-neutral-500/10 text-slate-500 dark:text-purple-300/60 border-neutral-500/20",
};

// SIMULATED USER DATA (Pass isPlan: true / false dynamic from parent context)
export default function AuthorProfile({
  user = {
    name: "Sarah Ahmed",
    role: "Elite Thinker",
    bio: "Architecting micro lifestyle data pipelines into macro compound frameworks. Sharing human wisdom wrapped in enterprise clean code.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    isPlan: true, // Set to true to activate premium visuals
  },
  lessonData = [
    {
      id: 1,
      title: "Atomic Headspaces",
      description:
        "How to safely close background apps running in your subconscious mind.",
      emotionalTone: "emotionalTone",
      category: "Mindfulness",
      likesCount: 420,
    },
  ],
}) {
  const author = user;

  function getInitials(name = "") {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  // Motion Animation Presets (AOS Core Styles)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#2a0e65] dark:via-[#21094a] dark:to-[#17053c] text-slate-900 dark:text-white py-16 px-4 sm:px-6 transition-colors duration-700 relative overflow-hidden select-none">
      {/* Premium Ambient Background Mesh */}
      <div className="absolute right-[-10%] top-[-5%] w-[60%] h-[60%] opacity-20 pointer-events-none z-0 hidden dark:block">
        <div className="w-full h-full bg-gradient-to-br from-[#00e5b4] via-purple-600 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10 dark:bg-[#250b54] p-7 rounded-2xl">
        {/* ─── NAVIGATION ACTION HEADER ─── */}
        <div className="flex items-center justify-between">
          <Link href="/publicLessons">
            <Button
              size="sm"
              variant="light"
              className="font-bold text-slate-500 dark:text-purple-200/60 hover:text-indigo-600 dark:hover:text-[#00e5b4] gap-1.5 px-2 bg-transparent transition-all"
            >
              <ArrowLeft size={14} strokeWidth={2.5} /> Back to Lessons
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {/* Conditional Premium Shimmer Badge */}
            {author?.isPlan && (
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                <Crown size={10} className="fill-current" /> Premium
              </motion.div>
            )}

            <Chip
              size="sm"
              variant="flat"
              className="font-black text-[9px] uppercase tracking-widest bg-purple-50 dark:bg-white/[0.04] text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-white/[0.08]"
            >
              Verified Creator
            </Chip>
          </div>
        </div>

        {/* ─── PREMIUM CARD PROFILE SECTION ─── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <Card
            className={`relative overflow-hidden rounded-[32px] p-6 sm:p-8 border bg-white/80 dark:bg-purple-950/10 backdrop-blur-xl transition-all duration-500 ${
              author?.isPlan
                ? "border-amber-400/40 dark:border-amber-400/20 shadow-[0_20px_50px_rgba(245,158,11,0.05)] dark:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
                : "border-slate-200/60 dark:border-purple-500/10 shadow-xl dark:shadow-none"
            }`}
          >
            {/* Background Luxury Floating Dusts Particles (Only for Premium Creators) */}
            {author?.isPlan && (
              <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden z-0">
                <motion.div
                  animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-8 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[1px]"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute bottom-12 right-1/3 w-2 h-2 rounded-full bg-yellow-300 blur-[1px]"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 relative z-10">
              {/* Premium Rotating Border Avatar Container */}
              <div className="relative shrink-0 select-none">
                {author?.isPlan && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                    className="absolute -inset-1 rounded-[22px] bg-gradient-to-tr from-amber-400 via-transparent to-yellow-500 blur-[2px] opacity-70"
                  />
                )}
                <Avatar>
                  <Avatar.Image
                    src={author?.image}
                    name={author?.name ? getInitials(author.name) : "U"}
                    className={`w-20 h-20 text-lg font-black bg-indigo-50 dark:bg-purple-900 text-indigo-600 dark:text-purple-100 ring-4 shadow-md rounded-[20px] relative z-10 ${
                      author?.isPlan
                        ? "ring-amber-400/20"
                        : "ring-indigo-500/10"
                    }`}
                  />
                  <Avatar.Fallback className="bg-indigo-50 dark:bg-[#31106a] font-bold text-xs text-indigo-600 dark:text-purple-200">
                    {user.name?.slice(0, 2).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </div>

              {/* Identity & Bio Info */}
              <div className="space-y-3 flex-grow min-w-0 w-full">
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5 truncate">
                      {author?.name}
                      {author?.isPlan && (
                        <ShieldCheck
                          size={18}
                          className="text-amber-400 fill-amber-400/10 shrink-0"
                        />
                      )}
                    </h1>
                    <Chip
                      size="sm"
                      className={`font-black self-center sm:self-auto text-[9px] h-5 uppercase tracking-wider rounded-md ${
                        author?.isPlan
                          ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md"
                          : "bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-[#17053c]"
                      }`}
                    >
                      {author?.role || "Contributor"}
                    </Chip>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-purple-200/50 font-medium max-w-xl leading-relaxed mx-auto sm:mx-0">
                    {author?.bio}
                  </p>
                </div>

                {/* Micro Metadata Ribbon */}
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-bold text-slate-600 dark:text-purple-200">
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-purple-900/30 border border-slate-200/40 dark:border-purple-500/10 px-3 py-1.5 rounded-xl">
                    <BookOpen
                      size={14}
                      className="text-indigo-600 dark:text-[#00e5b4]"
                    />
                    <span>{lessonData.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-purple-900/30 border border-slate-200/40 dark:border-purple-500/10 px-3 py-1.5 rounded-xl">
                    <Award size={14} className="text-amber-500" />
                    <span>Top Author</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ─── DYNAMIC SUBMITTED LESSON LIST GRID ─── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-3.5 bg-indigo-600 dark:bg-[#00e5b4] rounded-full" />
            <h3 className="text-xs font-black text-slate-400 dark:text-purple-300/40 uppercase tracking-widest">
              Published Frameworks
            </h3>
          </div>

          {lessonData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border border-dashed border-slate-200 dark:border-purple-500/10 bg-white/40 dark:bg-purple-950/5 rounded-[24px] p-12 text-center shadow-none flex flex-col items-center justify-center min-h-[260px]">
                <div className="p-4 bg-slate-100 dark:bg-purple-950/40 text-slate-400 dark:text-purple-400/40 rounded-2xl mb-4">
                  <Inbox size={28} />
                </div>
                <h4 className="text-sm font-black text-slate-800 dark:text-purple-100">
                  No Lessons Published Yet
                </h4>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {lessonData.map((lesson, index) => (
                <motion.div
                  key={lesson.id || lesson._id || index}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                >
                  <Card
                    className={`h-full border bg-white dark:bg-purple-950/10 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                      author?.isPlan
                        ? "border-amber-400/10 dark:hover:border-amber-400/30"
                        : "border-slate-200/60 dark:border-purple-500/10 dark:hover:border-[#00e5b4]/20"
                    }`}
                  >
                    <div className="p-6 flex flex-col justify-between h-full space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Chip
                            size="sm"
                            variant="flat"
                            className={`text-[9px] font-black uppercase tracking-wider border ${toneColorMap[lesson.emotionalTone] || "bg-slate-100 dark:bg-purple-900/30 text-slate-500"}`}
                          >
                            {lesson.emotionalTone || "Standard"} Tone
                          </Chip>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-purple-300/30 font-bold">
                            <Calendar size={12} />
                            <span>Recent</span>
                          </div>
                        </div>

                        <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-1">
                          {lesson.title}
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-purple-200/50 leading-relaxed font-medium line-clamp-3">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-purple-500/10">
                        <Chip
                          size="sm"
                          className="bg-slate-100 dark:bg-purple-900/30 text-slate-600 dark:text-purple-200 font-bold text-[9px] uppercase tracking-wider px-2.5 rounded-md"
                        >
                          {lesson.category || "General"}
                        </Chip>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mr-1">
                            <Heart
                              size={12}
                              className="text-rose-500 fill-rose-500"
                            />
                            <span className="text-[11px] font-black dark:text-purple-300">
                              {lesson.likesCount || 0}
                            </span>
                          </div>

                          <Link
                            href={`/publicLessons/${lesson._id || lesson.id}`}
                          >
                            <Button
                              size="sm"
                              radius="xl"
                              className={`h-8 text-xs font-black px-4 transition-all ${
                                author?.isPlan
                                  ? "bg-amber-400/10 text-amber-500 hover:bg-amber-400/20"
                                  : "bg-indigo-50 dark:bg-[#00e5b4]/10 text-indigo-600 dark:text-[#00e5b4] hover:bg-indigo-100 dark:hover:bg-[#00e5b4]/20"
                              }`}
                            >
                              Read Lesson
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
