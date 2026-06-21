"use client";

import React from "react";
import { Card, Button, Chip, Avatar, Modal } from "@heroui/react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthorLessons({ totalLessons = [], params }) {
  // Extract author meta fields safely from dataset references if available
  const currentAuthor = totalLessons[0]?.author;
  const authorName = currentAuthor?.name || "Creator";
  const router = useRouter();
  return (
    <div className="min-h-screen bg-default-50/30 dark:bg-zinc-950 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* TOP INTERACTIVE NAVIGATION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-default-100 dark:border-zinc-800/60 pb-5">
          <div className="space-y-1">
            <Button
              size="sm"
              variant="light"
              onPress={() => router.back()}
              className="p-0 h-auto text-xs font-bold text-default-400 hover:text-indigo-500 gap-1 min-w-0 bg-transparent transition-colors mb-1 dark:text-white"
            >
              <ArrowLeft size={12} />
              Back to profile
            </Button>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500" />
              <span>{authorName} Publications</span>
            </h1>
            <p className="text-xs text-default-400 font-medium dark:text-white">
              Explore all lessons and documentation streams published by this
              author.
            </p>
          </div>

          <Chip
            variant="flat"
            className="w-fit font-black text-xs h-7 px-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 rounded-xl"
          >
            {totalLessons.length} Total Lessons
          </Chip>
        </div>

        {/* POSTS GRID MATRIX CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {totalLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id || lesson._id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Card className="group border border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-indigo-500/20 transition-all rounded-[24px] p-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  {/* Category Banner & ID Metrics */}
                  <div className="flex items-center justify-between">
                    <Chip
                      size="sm"
                      variant="flat"
                      className="font-bold text-[10px] uppercase tracking-wider bg-default-100 dark:bg-zinc-800 text-default-600 dark:text-zinc-400 rounded h-5 px-1.5"
                    >
                      {lesson.category || "General"}
                    </Chip>
                    <span className="text-[10px] text-default-400 font-mono font-semibold">
                      ID: {lesson.author.authorId || "N/A"}
                    </span>
                  </div>

                  {/* Core Lesson Body Description Text Context */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black text-slate-800 dark:text-zinc-200 tracking-tight group-hover:text-indigo-500 transition-colors line-clamp-2 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-default-400 dark:text-zinc-400 leading-relaxed font-medium line-clamp-3">
                      {lesson.description ||
                        "No preview summary description provided for this catalog index card slot target marker entry location context."}
                    </p>
                  </div>
                </div>

                {/* Card Action Interactive Footer Blocks */}
                <div className="pt-3 border-t border-default-100/70 dark:border-zinc-800/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-default-400 font-semibold font-sans">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {lesson.duration || "5 min read"}
                    </span>
                    {lesson.createdAt && (
                      <span className="flex items-center gap-1">
                        <CalendarDays size={11} />{" "}
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <Modal>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 text-[11px] font-bold rounded-xl px-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all gap-1"
                    >
                      <span>Read Module</span>
                      <ArrowUpRight size={12} className="opacity-70" />
                    </Button>
                    <Modal.Backdrop>
                      <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[360px]">
                          <Modal.CloseTrigger />
                          <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                              <Rocket className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>{lesson.title}</Modal.Heading>
                          </Modal.Header>
                          <Modal.Body>
                            <p>{lesson.description}</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button className="w-full" slot="close">
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
          ))}
        </div>

        <div></div>

        {/* HIGH-ACCESSIBILITY EMPTY QUEUE METRIC WARNING PLACEHOLDER */}
        {totalLessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-default-200 dark:border-zinc-800 rounded-[32px] bg-white/50 dark:bg-zinc-900/30"
          >
            <div className="p-3.5 bg-indigo-500/15 text-indigo-500 rounded-full mb-3 animate-bounce">
              <Sparkles size={24} />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 tracking-tight">
              No Published Artifacts Found
            </h3>
            <p className="text-xs text-default-400 max-w-xs mt-1 leading-relaxed font-medium">
              This author has not shared any live learning modules or coding
              documentations on the index map stack channels yet.
            </p>
            <Link href="/" className="mt-5">
              <Button
                size="sm"
                color="primary"
                radius="xl"
                className="font-bold text-xs px-5 bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              >
                Return to Directory
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
