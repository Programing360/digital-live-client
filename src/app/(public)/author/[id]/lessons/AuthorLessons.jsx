"use client";

import React, { useEffect } from "react";
import { Card, Button, Chip, Modal } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  ArrowUpRight,
  Sparkles,
  CalendarDays,
  Rocket,
  Award,
  Activity,
  Layers,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AuthorLessons({ totalLessons = [], params }) {
  const currentAuthor = totalLessons[0]?.author;
  const authorName = currentAuthor?.name || "Creator";
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  const totalDuration = totalLessons.reduce((acc, curr) => {
    const mins = parseInt(curr.duration) || 5;
    return acc + mins;
  }, 0);

  const uniqueCategories = new Set(totalLessons.map(l => l.category || "General")).size;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gradient-to-br dark:from-[#2b0a57] dark:to-[#110226] py-12 px-4 sm:px-6 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Ambient Glow (ইমেজের মতই প্রিমিয়াম ব্যাকগ্রাউন্ড ওয়েভ) */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-[linear-gradient(to_top,rgba(0,229,180,0.03),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* TOP NAVIGATION HEADER */}
        <div 
          data-aos="fade-down" 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/[0.08] pb-5"
        >
          <div className="space-y-1">
            <Button
              size="sm"
              variant="light"
              onPress={() => router.back()}
              className="p-0 h-auto text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-purple-300/60 dark:hover:text-[#00e5b4] gap-1 min-w-0 bg-transparent transition-colors mb-1"
            >
              <ArrowLeft size={12} />
              Back to profile
            </Button>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500 dark:text-[#00e5b4]" />
              <span>{authorName} Publications</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-purple-200/50 font-medium">
              Explore all lessons and documentation streams published by this author.
            </p>
          </div>

          <Chip
            variant="flat"
            className="w-fit font-black text-xs h-7 px-3 bg-indigo-500/10 text-indigo-600 dark:bg-[#00e5b4]/10 dark:text-[#00e5b4] border border-indigo-500/10 dark:border-[#00e5b4]/20 rounded-xl"
          >
            {totalLessons.length} Active Streams
          </Chip>
        </div>

        {/* 🌟 EXTRA RELEVANT CARDS: ANALYTICS & META OVERVIEW (Must be Professional & Pretty) */}
        {totalLessons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-aos="fade-up">
            
            {/* Card 1: Experience & Author Badge */}
            <Card className="border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/40 backdrop-blur-xl p-4 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-[#00e5b4]/10 text-indigo-600 dark:text-[#00e5b4]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-purple-300/40 tracking-wider">Creator Rank</p>
                <h4 className="text-sm font-black text-slate-800 dark:text-white">Verified Publisher</h4>
              </div>
            </Card>

            {/* Card 2: Combined Knowledge Base Duration */}
            <Card className="border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/40 backdrop-blur-xl p-4 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-purple-500/10 text-indigo-600 dark:text-purple-400">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-purple-300/40 tracking-wider">Knowledge Depth</p>
                <h4 className="text-sm font-black text-slate-800 dark:text-white">~ {totalDuration} Mins Content</h4>
              </div>
            </Card>

            {/* Card 3: Domain Variety count */}
            <Card className="border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/40 backdrop-blur-xl p-4 flex flex-row items-center gap-4 rounded-2xl shadow-sm">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-pink-500/10 text-indigo-600 dark:text-pink-400">
                <Layers size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-purple-300/40 tracking-wider">Domain Focus</p>
                <h4 className="text-sm font-black text-slate-800 dark:text-white">{uniqueCategories} Main Categories</h4>
              </div>
            </Card>

          </div>
        )}

        {/* POSTS GRID MATRIX CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {totalLessons.map((lesson, index) => (
            <div
              key={lesson.id || lesson._id || index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card className="group border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/50 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-[#00e5b4]/80 transition-all duration-300 rounded-[24px] p-5 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    
                    {/* Category Banner & ID Metrics */}
                    <div className="flex items-center justify-between">
                      <Chip
                        size="sm"
                        variant="flat"
                        className="font-bold text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-purple-200/70 rounded h-5 px-1.5 border dark:border-white/[0.05]"
                      >
                        {lesson.category || "General"}
                      </Chip>
                      <span className="text-[10px] text-slate-400 dark:text-purple-300/40 font-mono font-semibold">
                        ID: {lesson.author?.authorId || "N/A"}
                      </span>
                    </div>

                    {/* Core Lesson Body Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors line-clamp-2 leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-purple-200/50 leading-relaxed font-medium line-clamp-3">
                        {lesson.description || "No preview summary description provided for this catalog index card slot."}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Interactive Footer Blocks */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-purple-300/40 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {lesson.duration || "5 min read"}
                      </span>
                      {lesson.createdAt && (
                        <span className="flex items-center gap-1">
                          <CalendarDays size={11} />
                          {new Date(lesson.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Button Integration */}
                    <Modal>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-[11px] font-bold rounded-xl px-3 bg-indigo-50 dark:bg-white/[0.04] text-indigo-600 dark:text-purple-200 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-[#00e5b4] dark:group-hover:text-slate-950 transition-all duration-300 gap-1"
                      >
                        <span>Read Module</span>
                        <motion.span variants={{ hover: { x: 2, y: -2 } }} whileHover="hover">
                          <ArrowUpRight size={12} className="opacity-70" />
                        </motion.span>
                      </Button>
                      
                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="sm:max-w-[420px] bg-white dark:bg-[#16072b] border dark:border-white/[0.08] rounded-[24px]">
                            <Modal.CloseTrigger className="dark:text-purple-300 dark:hover:bg-white/5" />
                            <Modal.Header className="flex gap-2 items-center">
                              <Modal.Icon className="bg-indigo-50 dark:bg-[#00e5b4]/10 text-indigo-600 dark:text-[#00e5b4]">
                                <Rocket className="size-4" />
                              </Modal.Icon>
                              <Modal.Heading className="text-slate-900 dark:text-white font-black">{lesson.title}</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                              <p className="text-slate-600 dark:text-purple-200/70 text-xs leading-relaxed">{lesson.description}</p>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button className="w-full bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 font-bold text-xs" slot="close">
                                Continue
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>
                  </div>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {totalLessons.length === 0 && (
          <div data-aos="zoom-in" className="w-full">
            <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-slate-200 dark:border-white/[0.08] rounded-[32px] bg-white dark:bg-[#1a0a33]/20">
              <div className="p-3.5 bg-indigo-500/10 dark:bg-[#00e5b4]/10 text-indigo-500 dark:text-[#00e5b4] rounded-full mb-3 animate-pulse">
                <Sparkles size={24} />
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-white tracking-tight">
                No Published Artifacts Found
              </h3>
              <p className="text-xs text-slate-400 dark:text-purple-200/50 max-w-xs mt-1 leading-relaxed font-medium">
                This author has not shared any live learning modules on channels yet.
              </p>
              <Link href="/" className="mt-5">
                <Button
                  size="sm"
                  radius="xl"
                  className="font-bold text-xs px-5 bg-indigo-600 dark:bg-[#00e5b4] text-white dark:text-slate-950 shadow-md shadow-indigo-600/10 dark:shadow-[#00e5b4]/20"
                >
                  Return to Directory
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}