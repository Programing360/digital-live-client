"use client";

import React, { useMemo, useState } from "react";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BookOpen,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  Settings2,
} from "lucide-react";
import GrowthChart from "./GrowthChart";

// Global Spring Physics Config for Premium Snappy UX
const premiumSpring = { type: "spring", stiffness: 180, damping: 24 };

const mockTodayLessons = [
  {
    title: "The Power of Positive Thinking",
    time: "10 mins ago",
    category: "Mindset",
    tone: "Motivational",
  },
  {
    title: "Small Steps Every Day",
    time: "1 hour ago",
    category: "Growth",
    tone: "Grateful",
  },
  {
    title: "Letting Go is Sometimes Best",
    time: "3 hours ago",
    category: "Life",
    tone: "Peaceful",
  },
];

// Modular Reusable Sparkline component with Performance Optimization
const Sparkline = React.memo(({ points, isDanger }) => (
  <svg
    className="w-full h-14 opacity-40 dark:opacity-30 absolute bottom-0 inset-x-0"
    viewBox="0 0 100 30"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient
        id={isDanger ? "grad-rose" : "grad-indigo"}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor={isDanger ? "#f43f5e" : "#6366f1"}
          stopOpacity="0.3"
        />
        <stop
          offset="100%"
          stopColor={isDanger ? "#f43f5e" : "#6366f1"}
          stopOpacity="0"
        />
      </linearGradient>
    </defs>
    <path
      d={`M 0 30 L ${points} L 100 30 Z`}
      fill={isDanger ? "url(#grad-rose)" : "url(#grad-indigo)"}
    />
    <motion.polyline
      fill="none"
      stroke={isDanger ? "#f43f5e" : "#6366f1"}
      strokeWidth="2"
      points={points}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    />
  </svg>
));
Sparkline.displayName = "Sparkline";

// Card-Level Mouse Ambient Glow Tracker Component
const GlowCard = ({ children, className = "" }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={premiumSpring}
      className={`relative overflow-hidden border border-slate-200/60 dark:border-white/[0.06] rounded-[24px] bg-white/70 dark:bg-[#0d0720]/40 backdrop-blur-xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`
            : "",
        }}
      />
      {children}
    </motion.div>
  );
};

export default function AdminDashboardHome({
  allLesson = [],
  userCount = [],
  newLessons = 0,
  allReport = [],
  allGrowth = [],
  topContributors,
}) {
  const publicLessonCount = useMemo(
    () =>
      allLesson.filter(
        (lesson) => lesson?.visibility?.toLowerCase() === "public",
      ),
    [allLesson],
  );

  const statCards = useMemo(
    () => [
      {
        title: "Total Users",
        value: `${userCount?.length ?? 0}`,
        change: "+12.5%",
        icon: <Users size={20} className="text-blue-500" />,
        color: "bg-blue-500/10 border-blue-500/20",
        points: "0,25 20,20 40,15 60,22 80,10 100,5",
      },
      {
        title: "Public Lessons",
        value: `${publicLessonCount?.length ?? 0}`,
        change: "+8.2%",
        icon: <BookOpen size={20} className="text-violet-500" />,
        color: "bg-violet-500/10 border-violet-500/20",
        points: "0,28 20,22 40,25 60,15 80,8 100,2",
      },
      {
        title: "Flagged Lessons",
        value: `${allReport?.length ?? 0}`,
        change: "-4.1%",
        icon: <AlertTriangle size={20} className="text-rose-500" />,
        color: "bg-rose-500/10 border-rose-500/20",
        points: "0,5 20,12 40,8 60,18 80,22 100,25",
      },
      {
        title: "Today's Lessons",
        value: `${newLessons}`,
        change: "New Today",
        icon: <Sparkles size={20} className="text-amber-500" />,
        color: "bg-amber-500/10 border-amber-500/20",
        points: "0,20 20,18 40,22 60,12 80,5 100,1",
      },
    ],
    [userCount, publicLessonCount, allReport, newLessons],
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#070214] p-4 md:p-8 lg:p-12 space-y-8 max-w-[1700px] mx-auto relative transition-colors duration-500">
      <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={premiumSpring}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-200/60 dark:border-white/[0.05] pb-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Admin Overview
            </h1>
            <Chip
              size="sm"
              color="indigo"
              variant="dot"
              className="text-xs font-bold border-none text-indigo-500 animate-pulse"
            >
              Live Insights
            </Chip>
          </div>
          <p className="text-sm font-medium text-slate-400 dark:text-purple-300/30 mt-1">
            Core platform telemetry, analytics streams, and ledger security
            monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            size="md"
            variant="bordered"
            radius="xl"
            className="font-bold border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-zinc-300 bg-white dark:bg-white/[0.02] hover:bg-slate-50 flex-1 sm:flex-initial"
            startContent={<Download size={15} />}
          >
            Export Logs
          </Button>
          <Button
            size="md"
            radius="xl"
            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 text-white font-extrabold shadow-lg shadow-indigo-500/20 dark:shadow-indigo-500/10 flex-1 sm:flex-initial h-10"
            startContent={<Settings2 size={15} />}
          >
            Platform Settings
          </Button>
        </div>
      </motion.div>

      {/* ================= METRICS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...premiumSpring, delay: idx * 0.06 }}
          >
            <GlowCard className="p-6 h-44 flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[11px] font-extrabold text-slate-400 dark:text-purple-300/30 uppercase tracking-widest">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`p-2.5 rounded-2xl border ${stat.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {stat.icon}
                </div>
              </div>

              <Sparkline
                points={stat.points}
                isDanger={stat.title === "Flagged Lessons"}
              />

              <div className="flex items-center gap-2 z-10">
                <Chip
                  size="sm"
                  variant="flat"
                  color={
                    stat.change.startsWith("+")
                      ? "success"
                      : stat.change.startsWith("-")
                        ? "danger"
                        : "warning"
                  }
                  className="font-black text-[10px] rounded-lg h-5 px-1.5"
                >
                  {stat.change}
                </Chip>
                <span className="text-[10px] text-slate-400 dark:text-purple-300/20 font-bold uppercase tracking-wider">
                  vs last week
                </span>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* ================= CHART CORE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...premiumSpring, delay: 0.25 }}
      >
        <GlowCard className="p-6">
          <GrowthChart chartData={allGrowth} />
        </GlowCard>
      </motion.div>

      {/* ================= CONTENT OPERATIONS SPLIT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...premiumSpring, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <GlowCard className="p-6 flex flex-col justify-between h-full space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
                  Growth Operations
                </h3>
                <p className="text-xs text-slate-400 dark:text-purple-300/20 font-medium mt-0.5">
                  Visual mapping of user acquisition velocity against content
                  submission pipelines.
                </p>
              </div>
              <div className="flex gap-1.5 bg-slate-100 dark:bg-white/[0.03] p-1 rounded-xl border border-slate-200/40 dark:border-white/[0.04]">
                <Button
                  size="sm"
                  variant="light"
                  className="bg-white dark:bg-white/[0.05] shadow-sm text-xs font-bold px-4 text-slate-800 dark:text-white rounded-lg h-7"
                >
                  Growth
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="text-xs text-slate-400 dark:text-purple-300/30 font-bold px-4 rounded-lg h-7"
                >
                  History
                </Button>
              </div>
            </div>

            <div className="relative border-b border-l border-slate-200/60 dark:border-white/[0.05] h-64 w-full mt-4 flex items-end">
              <svg
                className="absolute inset-0 w-full h-full p-2 overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 0 90 Q 25 70 50 40 T 100 10"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
                <motion.path
                  d="M 0 95 Q 25 85 50 60 T 100 30"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.2 }}
                />
              </svg>

              <div className="absolute left-3 top-3 flex items-center gap-1.5 text-[10px] text-indigo-500 font-extrabold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md backdrop-blur-md">
                <TrendingUp size={11} /> USER VELOCITY OPTIMAL
              </div>
            </div>

            <div className="flex gap-6 pt-2 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                  User Growth
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                  Lesson Submissions
                </span>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Contributors Board */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...premiumSpring, delay: 0.35 }}
        >
          <GlowCard className="p-6 h-full flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
                    Top Contributors
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-purple-300/20 font-medium mt-0.5">
                    Highest publishing frequency metrics this week.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="light"
                  color="secondary"
                  className="font-bold text-xs text-indigo-500 hover:bg-indigo-500/5 rounded-lg"
                >
                  View All
                </Button>
              </div>

              <div
                className="space-y-3.5 max-h-[350px] overflow-y-auto scrollbar-none"
                data-scrollbar="none"
              >
                {topContributors.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-white/[0.02] bg-slate-50/50 dark:bg-white/[0.01] hover:bg-slate-100/70 dark:hover:bg-white/[0.03] transition-all duration-300 "
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xs text-slate-400 w-4 text-center">
                        {user.rank}
                      </span>
                      <Avatar>
                        <Avatar.Image
                          src={user.authorImage}
                          size="sm"
                          className="object-cover border border-slate-200 dark:border-white/10"
                        />
                        <Avatar.Fallback className="bg-indigo-50 dark:bg-[#31106a] font-bold text-xs text-indigo-600 dark:text-purple-200">
                          {user.authorName?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                          {user.authorName}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-purple-300/20 font-medium">
                          {user.totalLessons} Lessons Published
                        </p>
                      </div>
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={user.status === "Premium" ? "warning" : "default"}
                      className="font-extrabold text-[9px] uppercase tracking-wider rounded-md h-5 px-1.5"
                    >
                      {user.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 dark:border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-extrabold text-slate-600 dark:text-zinc-300 tracking-wider uppercase">
                  Data Layer Health
                </span>
              </div>
              <Chip
                size="sm"
                variant="flat"
                color="success"
                className="text-[10px] font-black h-5 rounded-md px-1.5 uppercase"
              >
                Operational
              </Chip>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* ================= DATA STREAM LAYOUT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <GlowCard className="p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
                Incoming Lessons Stream
              </h3>
              <p className="text-xs text-slate-400 dark:text-purple-300/20 font-medium mt-0.5">
                Realtime ingestion telemetry of global lifecycle entries.
              </p>
            </div>
            <Chip
              startContent={
                <Clock
                  size={12}
                  className="animate-spin text-emerald-500"
                  style={{ animationDuration: "4s" }}
                />
              }
              variant="flat"
              color="success"
              className="font-extrabold text-xs rounded-lg h-7 px-3 border border-emerald-500/10"
            >
              Live Feed Active
            </Chip>
          </div>

          <div className="overflow-x-auto w-full rounded-2xl border border-slate-100 dark:border-white/[0.03]">
            <table className="w-full min-w-[800px] text-left border-collapse bg-slate-50/30 dark:bg-transparent">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-white/[0.05] bg-slate-100/50 dark:bg-white/[0.01] text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-purple-300/20 uppercase">
                  <th className="p-4">Lesson Title</th>
                  <th className="p-4">Ingestion Time</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tone Identity</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
                <AnimatePresence>
                  {mockTodayLessons.map((lesson, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-100/40 dark:hover:bg-white/[0.02] transition-colors text-xs font-bold text-slate-700 dark:text-zinc-300"
                    >
                      <td className="p-4 text-slate-900 dark:text-zinc-100 font-extrabold max-w-xs truncate">
                        {lesson.title}
                      </td>
                      <td className="p-4 text-slate-400 dark:text-purple-300/20 font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                          {lesson.time}
                        </div>
                      </td>
                      <td className="p-4">
                        <Chip
                          size="sm"
                          variant="bordered"
                          className="text-[10px] font-extrabold border-slate-200 dark:border-white/10 uppercase tracking-wide h-5 rounded-md px-1.5"
                        >
                          {lesson.category}
                        </Chip>
                      </td>
                      <td className="p-4 text-slate-400 dark:text-purple-300/20 font-bold">
                        {lesson.tone}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            color="success"
                            variant="flat"
                            className="font-black text-[11px] h-7 min-w-0 px-3 rounded-lg border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all"
                            startContent={<CheckCircle2 size={12} />}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="light"
                            className="font-bold text-slate-400 dark:text-purple-300/20 hover:text-indigo-500 h-7 min-w-0 px-2 rounded-lg"
                          >
                            <ArrowUpRight size={14} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
