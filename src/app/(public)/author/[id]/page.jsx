"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Chip, Avatar, Button, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, ArrowLeft, Heart, Award, Sparkles } from "lucide-react";

// Mock database to simulate live asynchronous API responses
const fakeAuthorsDatabase = {
  "1": {
    author: {
      name: "Ried Hessan",
      image: "https://i.pravatar.cc/150?u=ried",
      role: "Elite Contributor",
      bio: "Capturing deep perspectives on mental clarity, cognitive growth, and performance frameworks.",
    },
    lessons: [
      {
        id: "lesson-101",
        title: "The Power of Positive Thinking",
        description: "Discover how shift parameters and dynamic outlook controls optimize everyday lifestyle success frameworks and build long-term psychological resilience.",
        category: "Mindset",
        tone: "Motivational",
        createdAt: "June 12, 2026",
        likes: 345,
      },
      {
        id: "lesson-102",
        title: "Micro-Habits Blueprint",
        description: "Deconstructing massive personal transformations into daily 2-minute actionable execution cycles that stick past initial motivational bursts.",
        category: "Growth",
        tone: "Neutral",
        createdAt: "May 28, 2026",
        likes: 198,
      }
    ]
  },
  "2": {
    author: {
      name: "Nusrat Jahan",
      image: "https://i.pravatar.cc/150?u=nusrat",
      role: "Community Mentor",
      bio: "Documenting practical wisdom, career roadmaps, and balance parameters across human relationships.",
    },
    lessons: [
      {
        id: "lesson-201",
        title: "Small Steps Every Day",
        description: "An empirical deep-dive into compounding lifestyle growth, highlighting why persistent execution overrides occasional hyper-focused production sprints.",
        category: "Growth",
        tone: "Grateful",
        createdAt: "June 18, 2026",
        likes: 312,
      },
      {
        id: "lesson-202",
        title: "Setting Guardrails in Career Paths",
        description: "How to gracefully establish psychological boundaries at work to maximize long-term output and protect your creative sanity.",
        category: "Career",
        tone: "Motivational",
        createdAt: "April 14, 2026",
        likes: 421,
      }
    ]
  }
};

const toneColorMap = {
  Motivational: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Grateful: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Peaceful: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Neutral: "bg-neutral-500/10 text-default-500 border-default-500/20",
};

export default function AuthorLessonsPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulating network response delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Lookup profile fallback directly matching ID '1' or '2', defaults to '1' if unmatched
      const data = fakeAuthorsDatabase[id] || fakeAuthorsDatabase["1"];
      
      setAuthor(data.author);
      setLessons(data.lessons);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Loading Screen Wrapper State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Spinner color="secondary" size="lg" labelColor="secondary" />
        <p className="text-xs text-default-400 font-semibold tracking-wider uppercase animate-pulse">
          Fetching Profile Stream...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-default-50/30 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Action Header */}
        <div className="flex items-center justify-between">
          <Link href="/public">
            <Button
              size="sm"
              variant="light"
              className="font-bold text-default-500 hover:text-indigo-600 gap-1.5 px-2"
              startContent={<ArrowLeft size={16} />}
            >
              Back to Lessons
            </Button>
          </Link>
          <Chip size="sm" color="secondary" variant="flat" className="font-bold text-xs uppercase" startContent={<Sparkles size={12} />}>
            Verified Creator
          </Chip>
        </div>

        {/* AUTHOR BRIEF CARD PROFILE DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border border-slate-100 dark:border-zinc-800 rounded-[32px] bg-white dark:bg-zinc-900 shadow-sm p-6 sm:p-8">
            {/* Ambient Background Blur Graphics */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 relative z-10">
              <Avatar 
                src={author.image} 
                className="w-20 h-20 ring-4 ring-indigo-500/10 shadow-md" 
              />
              <div className="space-y-2 flex-grow">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                      {author.name}
                    </h1>
                    <Chip size="xs" className="bg-indigo-500/10 text-indigo-600 font-bold self-center sm:self-auto text-[10px]">
                      {author.role}
                    </Chip>
                  </div>
                  <p className="text-xs text-default-400 font-medium mt-1 max-w-xl leading-relaxed">
                    {author.bio}
                  </p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5 bg-default-100/70 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl">
                    <BookOpen size={14} className="text-indigo-500" />
                    <span>{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-default-100/70 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl">
                    <Award size={14} className="text-amber-500" />
                    <span>Top Author</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* DYNAMIC SUBMITTED LESSON LIST */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-3 bg-indigo-600 rounded-full" />
            <h3 className="text-base font-black text-slate-800 dark:text-zinc-200 uppercase tracking-wider">
              Published Lessons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 flex flex-col justify-between h-full space-y-4">
                    
                    <div className="space-y-2">
                      {/* Top Filters/Tone Row */}
                      <div className="flex items-center justify-between">
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          className={`text-[10px] font-bold border ${toneColorMap[lesson.tone] || "bg-neutral-100"}`}
                        >
                          {lesson.tone} Tone
                        </Chip>
                        <div className="flex items-center gap-1 text-[10px] text-default-400 font-bold">
                          <Calendar size={12} />
                          <span>{lesson.createdAt}</span>
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
                    <div className="flex items-center justify-between pt-2 border-t border-default-100 dark:border-zinc-800/60">
                      <Chip 
                        size="sm" 
                        className="bg-default-100/80 dark:bg-zinc-800 text-default-600 font-bold text-[10px] capitalize px-2.5"
                      >
                        {lesson.category}
                      </Chip>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-default-400 text-xs font-semibold mr-1">
                          <Heart size={12} className="text-rose-500 fill-rose-500/10" />
                          <span className="text-[11px]">{lesson.likes}</span>
                        </div>
                        <Link href={`/public/${lesson.id}`}>
                          <Button 
                            size="sm" 
                            radius="full" 
                            variant="flat" 
                            color="secondary" 
                            className="h-7 text-xs font-bold px-3"
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
        </div>

      </div>
    </div>
  );
}