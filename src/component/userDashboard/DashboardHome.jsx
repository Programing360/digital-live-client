"use client";

import React, { useState } from "react";
import { Card, Modal, Button, Table } from "@heroui/react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  BookOpen,
  Heart,
  Eye,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Activity,
} from "lucide-react";
import Image from "next/image";
import DashboardModal from "./ModalOpen";

const FADE_UP_ANIMATION = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay: i * 0.08,
    },
  }),
};

export default function DashboardHome({
  user,
  setActiveTab,
  lessonData = [],
  favorites = [],
  totalLikes = 0,
}) {
  // Controlled programmatic state setup for HeroUI Dot-Notation

  const stats = [
    {
      title: "My Lessons",
      val: `${(lessonData.length)}`,
      icon: <BookOpen size={18} />,
      styles:
        "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    },
    {
      title: "Favorites",
      val:`${favorites.length}`,
      icon: <Heart size={18} />,
      styles:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    },
    {
      title: "Total Views",
      val: "1.2K",
      icon: <Eye size={18} />,
      styles:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    },
    {
      title: "Total Likes",
      val: `${totalLikes.length}`,
      icon: <Heart size={18} className="fill-current" />,
      styles:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    },
  ];

  const chartData =
    lessonData.length > 0
      ? lessonData.slice(-7).map((lesson, idx) => ({
          name: lesson.date
            ? new Date(lesson.date).toLocaleDateString("en-US", {
                weekday: "short",
              })
            : `L${idx + 1}`,
          fullDate: lesson.date
            ? new Date(lesson.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : `Lesson ${idx + 1}`,
          Contributions: lesson.views || (idx + 2) * 15,
          Reflections: lesson.likes || (idx + 1) * 8,
        }))
      : [
          {
            name: "Mon",
            fullDate: "Monday Layout",
            Contributions: 30,
            Reflections: 10,
          },
          {
            name: "Tue",
            fullDate: "Tuesday Layout",
            Contributions: 45,
            Reflections: 23,
          },
          {
            name: "Wed",
            fullDate: "Wednesday Layout",
            Contributions: 35,
            Reflections: 17,
          },
          {
            name: "Thu",
            fullDate: "Thursday Layout",
            Contributions: 60,
            Reflections: 40,
          },
          {
            name: "Fri",
            fullDate: "Friday Layout",
            Contributions: 49,
            Reflections: 28,
          },
          {
            name: "Sat",
            fullDate: "Saturday Layout",
            Contributions: 70,
            Reflections: 55,
          },
          {
            name: "Sun",
            fullDate: "Sunday Layout",
            Contributions: 90,
            Reflections: 68,
          },
        ];

  const recents = [
    {
      title: "The Power of Positive Thinking",
      date: "May 12, 2024",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=150",
    },
    {
      title: "Small Steps Every Day",
      date: "May 11, 2024",
      img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=150",
    },
    {
      title: "Letting Go is Okay",
      date: "May 10, 2024",
      img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=150",
    },
  ];

  return (
    <div className="space-y-8 max-w-full relative z-10 selection:bg-[#00e5b4]/20">
      {/* ─── DYNAMIC BANNER HEADER ─── */}
      <motion.div
        variants={FADE_UP_ANIMATION}
        initial="hidden"
        animate="visible"
        custom={0}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight dark:text-white flex items-center gap-2">
            Dashboard{" "}
            <Sparkles size={18} className="text-[#00e5b4] animate-pulse" />
          </h2>
          <p className="text-slate-500 dark:text-purple-300/40 font-medium mt-1">
            Welcome back,{" "}
            <span className="font-bold text-slate-800 dark:text-white">
              {user?.name || "User"}
            </span>{" "}
            👋 Here's your framework overview.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-white dark:bg-purple-950/40 text-slate-800 dark:text-purple-200 border border-slate-200/60 dark:border-purple-500/10 shadow-sm font-bold rounded-xl h-9"
        >
          This Week
        </Button>
      </motion.div>

      {/* ─── METRIC COUNTERS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={FADE_UP_ANIMATION}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            <Card className="border border-slate-200/50 dark:border-purple-500/10 p-5 shadow-sm rounded-[24px] bg-white/70 dark:bg-purple-950/10 backdrop-blur-md hover:scale-[1.02] transition-transform duration-300">
              <div className="flex flex-row items-center gap-4 p-0 overflow-hidden">
                <div
                  className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${stat.styles}`}
                >
                  {stat.icon}
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {stat.val}
                  </p>
                  <p className="text-xs font-bold text-slate-400 dark:text-purple-300/30 mt-1.5 uppercase tracking-wider">
                    {stat.title}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ─── ANALYTICS AND FEED ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Chart Module Container */}
        <motion.div
          className="lg:col-span-2"
          variants={FADE_UP_ANIMATION}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <Card className="border border-slate-200/50 dark:border-purple-500/10 p-6 shadow-sm rounded-[28px] bg-white/70 dark:bg-purple-950/10 backdrop-blur-md h-full flex flex-col justify-between">
            <Card.Header className="flex justify-between items-center p-0 mb-6 w-full bg-transparent">
              <Card.Title className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                Lessons Overview
              </Card.Title>
              {/* <Button
                size="sm"
                variant="secondary"
                className="font-bold text-xs text-indigo-600 dark:text-[#00e5b4]"
                endContent={<ArrowUpRight size={14} />}
                onClick={() => setIsModalOpen(true)}
              >
                View Details
              </Button> */}
              <DashboardModal chartData={chartData}></DashboardModal>
            </Card.Header>

            <div className="p-0 h-64 w-full overflow-hidden flex items-end">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorContributions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorReflections"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00e5b4" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00e5b4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="currentColor"
                    className="text-slate-400 dark:text-purple-300/20 font-bold text-[10px]"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="currentColor"
                    className="text-slate-400 dark:text-purple-300/20 font-bold text-[10px]"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(9, 2, 26, 0.8)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                      borderRadius: "16px",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Contributions"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorContributions)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Reflections"
                    stroke="#00e5b4"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorReflections)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Side Mini Quick-Feed Widget */}
        <motion.div
          variants={FADE_UP_ANIMATION}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <Card className="border border-slate-200/50 dark:border-purple-500/10 p-6 shadow-sm rounded-[28px] bg-white/70 dark:bg-purple-950/10 backdrop-blur-md">
            <Card.Header className="p-0 mb-6 bg-transparent">
              <Card.Title className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                Recent Lessons
              </Card.Title>
            </Card.Header>
            <div className="p-0 space-y-4 overflow-hidden">
              {recents.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 p-2 hover:bg-slate-100/60 dark:hover:bg-purple-950/40 rounded-2xl transition-all duration-200 group cursor-pointer"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200/40 dark:border-purple-500/10">
                    <Image
                      src={item.img}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.title}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-purple-100 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 dark:text-purple-300/30 mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                variant="bordered"
                className="w-full mt-2 font-bold rounded-xl border-slate-200 dark:border-purple-500/20 text-slate-700 dark:text-purple-200 hover:bg-slate-50 dark:hover:bg-purple-950/40 transition-colors"
                onClick={() => setActiveTab("my-lessons")}
              >
                View All Items
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

     
    </div>
  );
}
