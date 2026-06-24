"use client";

import React, { useEffect } from "react";
import { Avatar, Button, Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Terminal 
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AuthorDashboardPage({ lessonData = [], totalLessons = [] }) {
  // প্রথম ইনডেক্স থেকে সেফলি অথর ডাটা এক্সট্র্যাক্ট করা
  const fallbackUser = Array.isArray(lessonData) ? lessonData[0]?.author : lessonData?.author;
  const authorId = fallbackUser?._id || lessonData?._id || "123";

  const author = {
    name: fallbackUser?.name || "Anonymous Creator",
    image: fallbackUser?.image || "",
    bio: fallbackUser?.bio || "Passionate web developer who loves sharing real life lessons and coding knowledge.",
    id: fallbackUser?.authorId || authorId,
  };

  // AOS স্ক্রোল অ্যানিমেশন ইনিশিয়ালাইজেশন
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-quad",
    });
  }, []);

  return (
    /* লাইট মোডে মডার্ন স্লিজ এবং ডার্ক মোডে স্ক্রিনশটের মতো গভীর রয়েল পার্পল গ্রেডিয়েন্ট */
    <div className="min-h-screen bg-slate-50/60 dark:bg-gradient-to-br dark:from-[#2b0a57] dark:to-[#110226] py-16 px-4 sm:px-6 md:px-8 transition-colors duration-500 relative overflow-hidden">
      
      {/* Background Ambient Cyber Glow (ইমেজের গ্রাফিক্স ভাইব) */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-[linear-gradient(to_top,rgba(0,229,180,0.02),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* AUTHOR PROFILE CONTROLLER ELEMENT (AOS Fade Down + Framer Interaction) */}
        <div data-aos="fade-down">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="p-6 md:p-8 rounded-[32px] border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/50 backdrop-blur-xl shadow-sm hover:shadow-xl dark:hover:border-purple-500/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                
                {/* প্রোফাইল অ্যাভাটার উইথ নিয়ন গ্লো রিং */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-[#00e5b4] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
                  <Avatar
                    src={author?.image}
                    name={author?.name}
                    className="w-24 h-24 md:w-28 md:h-28 text-2xl font-black relative border-2 border-white dark:border-[#1a0a33]"
                  />
                </div>

                {/* প্রোফাইল মেটা এনভায়রনমেন্ট */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-2 justify-center md:justify-start">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                      {author?.name}
                    </h2>
                    <Chip 
                      size="sm" 
                      className="bg-indigo-500/10 text-indigo-600 dark:bg-[#00e5b4]/10 dark:text-[#00e5b4] font-bold px-2 h-5 border dark:border-[#00e5b4]/20 rounded-md"
                      startContent={<ShieldCheck size={11} />}
                    >
                      PRO
                    </Chip>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-purple-200/60 max-w-xl font-medium leading-relaxed">
                    {author?.bio}
                  </p>

                  {/* ইন্টারেক্টিভ মেটা ট্যাগস */}
                  <div className="flex flex-wrap gap-2.5 pt-1 justify-center md:justify-start">
                    <Chip 
                      variant="flat" 
                      className="font-bold text-xs bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-purple-200 border dark:border-white/[0.05] rounded-xl px-3 h-7"
                      startContent={<BookOpen size={13} className="text-indigo-500 dark:text-[#00e5b4]" />}
                    >
                      {totalLessons?.length || 0} Publications
                    </Chip>

                    <Chip 
                      variant="flat" 
                      className="font-bold text-xs bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-purple-200 border dark:border-white/[0.05] rounded-xl px-3 h-7"
                      startContent={<Award size={13} className="text-amber-500" />}
                    >
                      Top Elite Creator
                    </Chip>
                  </div>

                  {/* কল-টু-অ্যাকশন বাটন: ইমেজের বুক ডেমো বাটনের মত সলিড নিয়ন ভাইব */}
                  <div className="pt-3">
                    <Link href={`/author/${authorId}/lessons`}>
                      <Button
                        className="w-full sm:w-auto font-bold text-sm h-11 px-6 rounded-xl bg-indigo-600 text-white dark:bg-[#00e5b4] dark:text-slate-950 shadow-md shadow-indigo-600/10 dark:shadow-[#00e5b4]/20 transition-all duration-300 gap-2"
                        endContent={
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          >
                            <ArrowRight size={16} />
                          </motion.span>
                        }
                      >
                        View Public Stream
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </Card>
          </motion.div>
        </div>

        {/* EXTRA INTERACTIVE MATRIX: KNOWLEDGE BASE CARD (Professional Layout Growth) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="100">
          <Card className="p-5 border border-slate-200/60 dark:border-white/[0.05] bg-white dark:bg-[#1a0a33]/30 backdrop-blur-md rounded-2xl flex flex-row items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-purple-500/10 text-indigo-600 dark:text-purple-400 rounded-xl shrink-0">
              <Compass size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-purple-300/40 uppercase tracking-wider">Engineering Focus</h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-purple-100 mt-1">Architecture & Deployment Systems</p>
            </div>
          </Card>

          <Card className="p-5 border border-slate-200/60 dark:border-white/[0.05] bg-white dark:bg-[#1a0a33]/30 backdrop-blur-md rounded-2xl flex flex-row items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-[#00e5b4]/10 text-indigo-600 dark:text-[#00e5b4] rounded-xl shrink-0">
              <Terminal size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-purple-300/40 uppercase tracking-wider">Tech Spectrum</h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-purple-100 mt-1">Production Ready Frameworks</p>
            </div>
          </Card>
        </div>

        {/* GUIDELINES DESCRIPTION GRID BLOCK */}
        <div className="space-y-3" data-aos="fade-up" data-aos-delay="150">
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={14} className="text-indigo-500 dark:text-[#00e5b4]" />
            <h2 className="text-xs font-black text-slate-400 dark:text-purple-300/50 uppercase tracking-widest">
              Creator Guidelines & Focus
            </h2>
          </div>

          <Card className="p-5 md:p-6 text-xs md:text-sm text-slate-600 dark:text-purple-200/60 leading-relaxed border border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-[#1a0a33]/40 backdrop-blur-xl rounded-[24px] shadow-sm">
            This educator orchestrates dynamic, practical curriculum frameworks surrounding production-ready web engineering technologies, architectural system deployment models, and personal mindset growth patterns. Select the library index block to examine their active documentation guides.
          </Card>
        </div>

      </div>
    </div>
  );
}