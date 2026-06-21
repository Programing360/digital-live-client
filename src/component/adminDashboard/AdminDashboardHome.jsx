"use client";

import React, { useMemo } from "react";
import { Card, Avatar, Chip, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2,
  Clock
} from "lucide-react";

// Mock Data for Charts & Active lists
const mockContributors = [
  { name: "Ried Hessan", lessons: 24, rank: 1, avatar: "https://i.pravatar.cc/150?u=1", status: "Premium" },
  { name: "Nusrat Jahan", lessons: 18, rank: 2, avatar: "https://i.pravatar.cc/150?u=2", status: "Premium" },
  { name: "Meher Afroz", lessons: 16, rank: 3, avatar: "https://i.pravatar.cc/150?u=3", status: "Free" },
  { name: "Tanvir Rahman", lessons: 12, rank: 4, avatar: "https://i.pravatar.cc/150?u=4", status: "Premium" },
];

const mockTodayLessons = [
  { title: "The Power of Positive Thinking", time: "10 mins ago", category: "Mindset", tone: "Motivational" },
  { title: "Small Steps Every Day", time: "1 hour ago", category: "Growth", tone: "Grateful" },
  { title: "Letting Go is Sometimes Best", time: "3 hours ago", category: "Life", tone: "Peaceful" },
];

// Pure CSS SVG Sparkline Graph generator for lightweight beautiful metrics without huge external canvas packages
const Sparkline = ({ points, colorClass }) => (
  <svg className="w-full h-16 opacity-80" viewBox="0 0 100 30" preserveAspectRatio="none">
    <motion.polyline
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      points={points}
      className={colorClass}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  </svg>
);

export default function AdminDashboardHome({allLesson, userCount, newLessons}) {
  
  const publicLessonCount = allLesson.filter(lesson => lesson?.visibility?.toLowerCase() === 'public')


  // Dynamic top analytics metrics definition 
  const statCards = [
    { title: "Total Users", value: `${userCount.length}`, change: "+12.5%", icon: <Users size={22} />, color: "text-blue-500 bg-blue-500/10", points: "0,25 20,20 40,15 60,22 80,10 100,5" },
    { title: "Public Lessons", value: `${publicLessonCount.length}`, change: "+8.2%", icon: <BookOpen size={22} />, color: "text-violet-500 bg-violet-500/10", points: "0,28 20,22 40,25 60,15 80,8 100,2" },
    { title: "Flagged Lessons", value: "14", change: "-4.1%", icon: <AlertTriangle size={22} />, color: "text-rose-500 bg-rose-500/10", points: "0,5 20,12 40,8 60,18 80,22 100,25" },
    { title: "Today's Lessons", value: `${newLessons}`, change: "New Today", icon: <Sparkles size={22} />, color: "text-amber-500 bg-amber-500/10", points: "0,20 20,18 40,22 60,12 80,5 100,1" },
  ];

  return (
    <div className="min-h-screen bg-default-50/40 p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      
      {/* 1. Header Hero Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-default-100 pb-5"
      >
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Admin Overview</h1>
          <p className="text-sm text-default-400 mt-1">Platform metrics health monitoring analytics dashboard.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="flat" color="default" radius="lg" className="font-semibold">
            Export Logs
          </Button>
          <Button size="sm" className="bg-indigo-600 text-white font-bold radius-lg shadow-md shadow-indigo-500/20">
            Platform Settings
          </Button>
        </div>
      </motion.div>

      {/* 2. Top Analytics Metrics Card Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="border border-slate-100 dark:border-zinc-800 rounded-[22px] bg-white dark:bg-zinc-900 shadow-sm overflow-hidden relative">
              <div className="p-5 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-default-400 uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-3xl font-black mt-1.5 text-slate-800 dark:text-white">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                
                {/* Embedded dynamic beautiful metric micro graphs container */}
                <div className="absolute bottom-0 left-0 right-0 px-2 pointer-events-none opacity-40">
                  <Sparkline points={stat.points} colorClass={stat.title === "Flagged Lessons" ? "text-rose-500" : "text-indigo-500"} />
                </div>

                <div className="flex items-center gap-1 z-10">
                  <Chip 
                    size="sm" 
                    variant="flat" 
                    color={stat.change.startsWith("+") ? "success" : stat.change.startsWith("-") ? "danger" : "warning"}
                    className="font-bold text-[10px]"
                  >
                    {stat.change}
                  </Chip>
                  <span className="text-[10px] text-default-400 font-medium ml-1">vs last week</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Main Data Core Visual Analytics Panels Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph Section: Platform Growth & Tracking Metrics Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border border-slate-100 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-sm p-6 space-y-6 h-full">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg text-slate-800 dark:text-white">Growth Operations</h3>
                <p className="text-xs text-default-400 mt-0.5">Visual representation of user and content creation influx streams.</p>
              </div>
              <div className="flex gap-2 bg-default-100/70 p-1 rounded-xl">
                <Button size="xs" variant="light" className="bg-white dark:bg-zinc-800 shadow-xs text-xs font-bold px-3">Growth</Button>
                <Button size="xs" variant="light" className="text-xs text-default-400 px-3">History</Button>
              </div>
            </div>

            {/* Simulated Clean Analytics Vector Stacked Graph */}
            <div className="relative border-b border-l border-default-100 dark:border-zinc-800 h-64 w-full mt-4 flex items-end">
              <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* User Growth Line Layer */}
                <motion.path
                  d="M 0 90 Q 25 70 50 40 T 100 10"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                {/* Lesson Growth Line Layer */}
                <motion.path
                  d="M 0 95 Q 25 85 50 60 T 100 30"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              </svg>
              
              {/* Graph Helper Axes Labels */}
              <div className="absolute left-2 top-2 flex items-center gap-1.5 text-[10px] text-indigo-600 font-bold bg-indigo-50/60 dark:bg-indigo-950/30 px-2 py-0.5 rounded-md">
                <TrendingUp size={12} /> User Velocity Max
              </div>
            </div>

            <div className="flex gap-6 pt-2 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">User Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-dashed border-2 border-cyan-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">Lesson Submissions</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Most Active Contributors Display Board */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border border-slate-100 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-sm p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-black text-lg text-slate-800 dark:text-white">Top Contributors</h3>
                  <p className="text-xs text-default-400 mt-0.5">Most active weekly content publishers.</p>
                </div>
                <Button size="sm" variant="light" color="secondary" className="font-bold text-xs">View All</Button>
              </div>

              <div className="space-y-4">
                {mockContributors.map((user) => (
                  <div 
                    key={user.rank} 
                    className="flex items-center justify-between p-3 rounded-2xl border border-default-100/50 dark:border-zinc-800/40 hover:bg-default-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-black text-sm text-default-400 w-4 text-center">
                        {user.rank}
                      </div>
                      <Avatar src={user.avatar} size="sm" className="w-8 h-8" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">{user.name}</p>
                        <p className="text-[10px] text-default-400 font-medium">{user.lessons} Lessons Published</p>
                      </div>
                    </div>
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      color={user.status === "Premium" ? "warning" : "default"}
                      className="font-bold text-[9px] uppercase tracking-wider"
                    >
                      {user.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-default-100 dark:border-zinc-800 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300">Database Engine</span>
  </div>
  <Chip size="sm" variant="flat" color="success" className="text-[10px] font-bold h-5">
    Operational
  </Chip>
</div>
          </Card>
        </motion.div>
      </div>

      {/* 4. Bottom Feed Log Row Layout: Today's Incoming Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-slate-100 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-900 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-black text-lg text-slate-800 dark:text-white">Incoming Lessons Stream</h3>
              <p className="text-xs text-default-400 mt-0.5">Realtime view of digital life lessons created today.</p>
            </div>
            <Chip startContent={<Clock size={12} />} variant="flat" color="success" className="font-bold text-xs">
              Live Feed Active
            </Chip>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[750px] text-left border-collapse">
              <thead>
                <tr className="border-b border-default-100 dark:border-zinc-800 bg-default-50/50 dark:bg-white/[0.01] text-[11px] font-bold tracking-wider text-default-400 uppercase">
                  <th className="p-4">Lesson Topic Title</th>
                  <th className="p-4">Submission Arrival</th>
                  <th className="p-4">Category Wrapper</th>
                  <th className="p-4">Tone Identity</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-100/60 dark:divide-zinc-800/60">
                {mockTodayLessons.map((lesson, idx) => (
                  <tr key={idx} className="hover:bg-default-50/40 dark:hover:bg-white/[0.01] transition-colors text-xs font-medium text-slate-700 dark:text-zinc-300">
                    <td className="p-4 font-bold text-slate-800 dark:text-zinc-100">{lesson.title}</td>
                    <td className="p-4 text-default-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      {lesson.time}
                    </td>
                    <td className="p-4">
                      <Chip size="sm" variant="bordered" className="text-[10px] font-bold capitalize">{lesson.category}</Chip>
                    </td>
                    <td className="p-4 text-default-400 font-semibold">{lesson.tone}</td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" color="success" variant="flat" className="font-bold text-[11px] h-7 min-w-0 px-3 rounded-lg" startContent={<CheckCircle2 size={12} />}>
                          Approve
                        </Button>
                        <Button size="sm" color="default" variant="light" className="font-bold text-[11px] h-7 min-w-0 px-2 rounded-lg">
                          <ArrowUpRight size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}