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
} from "lucide-react";

const toneColorMap = {
  Motivational: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  emotionalTone: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Peaceful: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Neutral: "bg-neutral-500/10 text-default-500 border-default-500/20",
};

export default function AuthorProfile({ user: author, lessonData = [] }) {
  
  function getInitials(name = "") {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div className="min-h-screen bg-default-50/30 dark:bg-black/10 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Action Header */}
        <div className="flex items-center justify-between">
          <Link href="/publicLessons">
            <Button
              size="sm"
              variant="light"
              className="font-bold text-default-500 hover:text-indigo-600 dark:hover:text-violet-400 gap-1.5 px-2"
            >
              <ArrowLeft size={16} /> Back to Lessons
            </Button>
          </Link>
          <Chip
            size="sm"
            color="secondary"
            variant="flat"
            className="font-bold text-xs uppercase bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
          >
            Verified Creator
          </Chip>
        </div>

        {/* AUTHOR BRIEF CARD PROFILE DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border border-slate-100 dark:border-zinc-800/60 rounded-[32px] bg-white dark:bg-zinc-900/40 backdrop-blur-md shadow-sm p-6 sm:p-8">
            {/* Ambient Background Blur Graphics */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 relative z-10">
              <Avatar 
                src={author?.image} 
                name={author?.name}
                fallback={getInitials(author?.name)}
                className="w-20 h-20 text-md font-bold ring-4 ring-indigo-500/10 shadow-md bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-zinc-200 shrink-0" 
              />
              
              <div className="space-y-2 flex-grow min-w-0">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                    <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white truncate">
                      {author?.name}
                    </h1>
                    <Chip
                      size="sm"
                      className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold self-center sm:self-auto text-[10px] h-5"
                    >
                      {author?.role || "Contributor"}
                    </Chip>
                  </div>
                  <p className="text-xs text-default-400 dark:text-zinc-500 font-medium mt-1 max-w-xl leading-relaxed mx-auto sm:mx-0">
                    {author?.bio}
                  </p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5 bg-default-100/70 dark:bg-zinc-800/40 px-3 py-1.5 rounded-xl">
                    <BookOpen size={14} className="text-indigo-500" />
                    <span>{lessonData.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-default-100/70 dark:bg-zinc-800/40 px-3 py-1.5 rounded-xl">
                    <Award size={14} className="text-amber-500" />
                    <span>Top Author</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* DYNAMIC SUBMITTED LESSON LIST & EMPTY STATE CONTROLLER */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-3 bg-indigo-600 dark:bg-violet-500 rounded-full" />
            <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
              Published Lessons
            </h3>
          </div>

          {lessonData.length === 0 ? (
            // DYNAMIC EMPTY STATE CARD
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border border-dashed border-default-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/10 rounded-[28px] p-12 text-center shadow-none flex flex-col items-center justify-center min-h-[260px]">
                <div className="p-4 bg-default-100 dark:bg-zinc-800/50 rounded-2xl text-default-400 dark:text-zinc-600 mb-4">
                  <Inbox size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-bold text-slate-700 dark:text-zinc-300 tracking-tight">
                  No Lessons Published Yet
                </h4>
                <p className="text-xs text-default-400 max-w-xs mt-1.5 leading-relaxed">
                  This creator hasn&apos;t shared any digital life lessons or frameworks inside this hub cluster. Check back soon!
                </p>
              </Card>
            </motion.div>
          ) : (
            // STANDARD GRID LESSON LIST RENDER
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lessonData.map((lesson, index) => (
                <motion.div
                  key={lesson.id || lesson._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-slate-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/20 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="p-6 flex flex-col justify-between h-full space-y-4">
                      <div className="space-y-2">
                        {/* Top Filters/Tone Row */}
                        <div className="flex items-center justify-between">
                          <Chip
                            size="sm"
                            variant="flat"
                            className={`text-[10px] font-bold border ${toneColorMap[lesson.emotionalTone] || "bg-neutral-100 dark:bg-zinc-800 text-default-500"}`}
                          >
                            {lesson.emotionalTone || "Standard"} Tone
                          </Chip>
                          <div className="flex items-center gap-1 text-[10px] text-default-400 font-bold">
                            <Calendar size={12} />
                            <span>
                              {lesson.createAt || lesson.createdAt ? (
                                new Date(lesson.createAt || lesson.createdAt).toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              ) : (
                                "Recent"
                              )}
                            </span>
                          </div>
                        </div>

                        <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 tracking-tight leading-snug line-clamp-1">
                          {lesson.title}
                        </h2>

                        <p className="text-xs text-default-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                          {lesson.description}
                        </p>
                      </div>

                      {/* Bottom Metadata Category Trigger bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-default-100 dark:border-zinc-800/40">
                        <Chip
                          size="sm"
                          className="bg-default-100 dark:bg-zinc-800 text-default-600 dark:text-zinc-400 font-bold text-[10px] capitalize px-2.5"
                        >
                          {lesson.category}
                        </Chip>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-default-400 text-xs font-semibold mr-1">
                            <Heart
                              size={12}
                              className="text-rose-500 fill-rose-500/10"
                            />
                            <span className="text-[11px]">
                              {lesson.likesCount || 0}
                            </span>
                          </div>
                          <Link href={`/publicLessons/${lesson._id || lesson.id}`}>
                            <Button
                              size="sm"
                              radius="full"
                              variant="flat"
                              color="secondary"
                              className="h-7 text-xs font-bold px-3 dark:bg-purple-500/10 dark:text-purple-400"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}