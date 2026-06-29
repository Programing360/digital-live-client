"use client";

import React, { useState } from "react";
import { Button, Avatar, Modal } from "@heroui/react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  Trophy,
  Star,
  ShieldCheck,
  Zap,
  Award,
  Users,
} from "lucide-react";
import Image from "next/image";
import TopContributors from "./TopContributors";



export default function AnalyticsDashboardGrid({
  topContributors = [],
  mostSavedFeature = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const handleOpenModal = (user, index) => {
    setSelectedContributor({ ...user, rankIndex: index });
    setIsOpen(true);
  };

  const getProfessionalBadge = (index) => {
    if (index === 0)
      return {
        name: "Elite Architecture Master",
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        icon: <Award size={14} />,
      };
    if (index === 1)
      return {
        name: "Senior Core Contributor",
        color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
        icon: <ShieldCheck size={14} />,
      };
    return {
      name: "Verified Knowledge Specialist",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      icon: <Zap size={14} />,
    };
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-transparent rounded-[32px] border border-slate-200/40 dark:border-none select-none overflow-hidden relative mb-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none dark:hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative z-10">
        {/* ================= COMPONENT 1: TOP CONTRIBUTORS ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col space-y-5"
        >
          <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200 dark:border-white/[0.05]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy
                  size={14}
                  className="text-amber-500 dark:text-amber-400 animate-pulse"
                />
                <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] tracking-widest uppercase">
                  Performance Leaderboard
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Top Contributors of the Week
              </h3>
            </div>
            <TopContributors
              topContributors={topContributors}
            ></TopContributors>
          </div>

          <div
            className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-none"
            data-scrollbar="none"
          >
            {topContributors.map((user, i) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                whileHover={{ x: 6, y: -2 }}
                className={`flex items-center justify-between p-3.5 bg-white dark:bg-[#1f0c41]/20 border border-slate-200/80 dark:border-white/[0.05] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none transition-all duration-300 group cursor-pointer ${user.glow || ""}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black border ${user.rankColor || "border-amber-500/20 text-amber-500 bg-amber-500/10"}`}
                  >
                    {i + 1}
                  </span>

                  <Avatar>
                    <Avatar.Image
                      src={user.authorImage}
                      className="w-10 h-10 border border-slate-100 dark:border-none"
                    />
                    <Avatar.Fallback className="bg-indigo-50 dark:bg-[#31106a] font-bold text-xs text-indigo-600 dark:text-purple-200">
                      {user.authorName?.slice(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 dark:text-purple-50 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors">
                      {user.authorName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 mt-0.5 uppercase tracking-wider">
                      {user.totalLessons} Knowledge Modules
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex -space-x-2 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                    {[1, 2, 3].map((item) => (
                      <Image
                        key={item}
                        className="inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-[#12032e] object-cover"
                        src={
                          user.authorImage ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80"
                        }
                        alt="Network user"
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleOpenModal(user, i)}
                    className="bg-slate-50 dark:bg-white/[0.03] hover:bg-indigo-50 dark:hover:bg-[#00e5b4]/10 border border-slate-200 dark:border-white/[0.05] text-slate-400 dark:text-purple-300/40 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] rounded-xl"
                  >
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= COMPONENT 2: MOST SAVED LESSONS ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col space-y-5"
        >
          <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200 dark:border-white/[0.05]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Star
                  size={14}
                  className="text-indigo-600 dark:text-[#00e5b4]"
                />
                <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] tracking-widest uppercase">
                  Popular Assets
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Most Saved Lessons
              </h3>
            </div>
            <Button
              size="sm"
              variant="flat"
              className="text-xs font-bold text-indigo-600 dark:text-purple-200 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.05] rounded-xl px-4 h-9 shadow-sm dark:shadow-none"
            >
              View All
            </Button>
          </div>

          <div
            className="flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-none"
            data-scrollbar="none"
          >
            {mostSavedFeature.map((lesson) => (
              <motion.div
                key={lesson._id}
                variants={itemVariants}
                whileHover={{ x: 6, y: -2 }}
                className="flex items-center justify-between p-2.5 bg-white dark:bg-[#1f0c41]/20 border border-slate-200/80 dark:border-white/[0.05] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-none hover:border-indigo-500/30 dark:hover:border-[#00e5b4]/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-slate-900/10 border border-slate-200/40 dark:border-white/10">
                    <Image
                      src={lesson.img}
                      alt={lesson.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={40}
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 dark:text-purple-50 tracking-tight line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-[#00e5b4] transition-colors">
                      {lesson.title}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-purple-300/30 mt-0.5">
                      {lesson.meta}
                    </span>
                  </div>
                </div>

                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-indigo-50 dark:bg-[#00e5b4]/5 text-indigo-600 dark:text-[#00e5b4] border border-indigo-100 dark:border-[#00e5b4]/10 rounded-xl mr-1 shadow-sm"
                >
                  <Bookmark
                    size={13}
                    className="fill-current"
                    strokeWidth={2.5}
                  />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= DYNAMIC COMPOUND PATTERN MODAL ================= */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="backdrop-blur-sm bg-black/30">
          <Modal.Container>
            <Modal.Dialog className="border border-slate-200/50 dark:border-white/10 bg-white dark:bg-[#150734] rounded-[28px] shadow-2xl p-6 w-full max-w-md mx-auto">
              <Modal.CloseTrigger className="absolute top-4 right-4 hover:bg-slate-100 dark:hover:bg-white/10 p-1.5 rounded-full text-slate-400" />

              {selectedContributor && (
                <>
                  <Modal.Header className="flex flex-col gap-1 pb-0 pt-2 items-center text-center">
                    <Modal.Icon>
                      <Trophy
                        size={18}
                        className="text-amber-500 animate-bounce"
                      />
                    </Modal.Icon>
                    <Modal.Heading className="text-[10px] font-black tracking-widest text-indigo-500 uppercase mt-1">
                      Contributor Identity
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="py-6 flex flex-col items-center text-center space-y-5">
                    {/* Hero Avatar */}
                    <div className="relative inline-block">
                      <Avatar
                        src={selectedContributor.authorImage}
                        className="w-24 h-24 text-large ring-4 ring-indigo-500/20 mx-auto border-2 border-white dark:border-none"
                      />
                    </div>

                    {/* Meta Fields */}
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                        {selectedContributor.authorName}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-purple-300/40 font-medium">
                        {selectedContributor.authorEmail}
                      </p>
                    </div>

                    {/* Spring Animation Professional Badge */}
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black shadow-sm ${getProfessionalBadge(selectedContributor.rankIndex).color}`}
                    >
                      {getProfessionalBadge(selectedContributor.rankIndex).icon}
                      <span>
                        {
                          getProfessionalBadge(selectedContributor.rankIndex)
                            .name
                        }
                      </span>
                    </motion.div>

                    {/* Stats Metric Panel */}
                    <div className="grid grid-cols-2 gap-3 pt-2 w-full">
                      <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.02] rounded-2xl">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Total Output
                        </span>
                        <span className="text-sm font-black text-slate-800 dark:text-white">
                          {selectedContributor.totalLessons} Modules
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.02] rounded-2xl">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Current Rank
                        </span>
                        <span className="text-sm font-black text-indigo-500 dark:text-[#00e5b4]">
                          #{selectedContributor.rankIndex + 1} Global
                        </span>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="pt-4 border-t border-slate-100 dark:border-white/[0.03] flex justify-end gap-2">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => setIsOpen(false)}
                      className="rounded-xl font-bold text-xs"
                    >
                      Dismiss
                    </Button>
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 dark:bg-[#00e5b4] dark:text-slate-900 rounded-xl font-bold text-xs shadow-md"
                      onPress={() => setIsOpen(false)}
                    >
                      View Portfolio
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      {/* ================= MODAL 2: ALL CONTRIBUTORS COMPLETE LIST VIEW ================= */}
    </section>
  );
}
