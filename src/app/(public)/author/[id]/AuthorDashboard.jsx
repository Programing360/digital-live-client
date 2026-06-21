"use client";

import React from "react";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Layers, Award, Sparkles, ArrowRight } from "lucide-react";

export default function AuthorDashboardPage({ lessonData, totalLessons }) {
  // Extract user author node data safely from the first item structure inside the lesson array stream
  const fallbackUser = lessonData?.author;

  const author = {
    name: fallbackUser?.name || "Anonymous Creator",
    image: fallbackUser?.image || "",
    bio:
      fallbackUser?.bio ||
      "Passionate web developer who loves sharing real life lessons and coding knowledge.",
    totalLessons: lessonData?.length || 0,
    id: fallbackUser?.authorId || fallbackUser?._id || "123",
  };

  return (
    <div className="min-h-screen bg-default-50/30 dark:bg-zinc-950 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* AUTHOR PROFILE CONTROLLER ELEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 rounded-3xl border border-default-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              <Avatar
                src={author?.image}
                name={author?.name}
                className="w-20 h-20 md:w-24 md:h-24 text-xl font-bold"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{author?.name}</h2>

                <p className="text-default-500 mt-1">{author?.bio}</p>

                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <Chip variant="flat" startContent={<BookOpen size={14} />}>
                    {totalLessons?.length || 0} Lessons
                  </Chip>

                  <Chip variant="flat" startContent={<Award size={14} />}>
                    Creator
                  </Chip>
                </div>

                <Link href={`/author/${lessonData._id}/lessons`}>
                  <Button
                    color="primary"
                    className="mt-5"
                    endContent={<ArrowRight size={16} />}
                  >
                    View All Lessons
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SECURE BLOCK: ABOUT THE CREATOR DEEP EXPLANATION GRID */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <BookOpen size={15} className="text-indigo-500" />
            <h2 className="text-xs font-black text-slate-800 dark:text-zinc-200 uppercase tracking-widest">
              Creator Guidelines & Focus
            </h2>
          </div>

          <Card className="p-5 md:p-6 text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 rounded-[24px] shadow-sm">
            This educator orchestrates dynamic, practical curriculum frameworks
            surrounding production-ready web engineering technologies,
            architectural system deployment models, and personal mindset growth
            patterns. Select the library index block to examine their active
            documentation guides.
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
