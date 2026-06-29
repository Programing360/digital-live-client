"use client";

import React from "react";
import { Avatar, Button, Modal } from "@heroui/react";
import { ArrowUpRight, Award, ShieldCheck, Users, Zap } from "lucide-react";

const TopContributors = ({ topContributors = [] }) => {
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
    <div className="relative">
      <Modal>
        {/* Trigger inside the Modal root */}
        <Button
          size="sm"
          variant="secondary"
          className="text-xs font-bold text-indigo-600 dark:text-purple-200 bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.05] shadow-sm dark:shadow-none rounded-xl px-4 h-9"
        >
          View All
        </Button>

        {/* Backdrop wraps Container per your required layout */}
        <Modal.Backdrop className="backdrop-blur-sm bg-black/30">
          <Modal.Container>
            <Modal.Dialog className="border border-slate-200/50 dark:border-white/10 bg-white dark:bg-[#150734] rounded-[28px] shadow-2xl p-6 w-full max-w-lg mx-auto">
              <Modal.CloseTrigger className="absolute top-4 right-4 hover:bg-slate-100 dark:hover:bg-white/10 p-1.5 rounded-full text-slate-400" />

              <Modal.Header className="flex flex-col gap-1 pb-3 pt-2 items-start border-b border-slate-100 dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Modal.Icon>
                    <Users
                      size={16}
                      className="text-indigo-500 dark:text-[#00e5b4]"
                    />
                  </Modal.Icon>
                  <Modal.Heading className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                    Global Leaderboard Standings
                  </Modal.Heading>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-purple-300/40 font-bold uppercase tracking-wider">
                  Showing all registered system contributors ranked by output volume
                </p>
              </Modal.Header>

              <Modal.Body
                className="py-4 flex flex-col gap-3 max-h-[450px] overflow-y-auto scrollbar-none"
                data-scrollbar="none"
              >
                {topContributors.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.03] rounded-2xl group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black border ${
                          i === 0
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            : "bg-slate-200/40 border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-500 dark:text-purple-200"
                        }`}
                      >
                        {i + 1}
                      </span>

                      <Avatar
                        src={user.authorImage}
                        className="w-8 h-8 border border-slate-100 dark:border-none"
                      />

                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800 dark:text-purple-50">
                          {user.authorName}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-purple-300/40 tracking-wide">
                          {getProfessionalBadge(i).name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-indigo-600 dark:text-[#00e5b4] bg-indigo-50 dark:bg-[#00e5b4]/5 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-[#00e5b4]/10">
                        {user.totalLessons} Modules
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="rounded-lg h-7 w-7 text-slate-400 hover:text-indigo-600"
                        slot="close" 
                      >
                        <ArrowUpRight size={12} strokeWidth={2.5} />
                      </Button>
                    </div>
                  </div>
                ))}
              </Modal.Body>

              <Modal.Footer className="pt-4 border-t border-slate-100 dark:border-white/[0.03] flex justify-end">
                {/* slot="close" automatically connects click functionality to closing the target parent modal context */}
                <Button
                  className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white rounded-xl font-bold text-xs px-5"
                  slot="close"
                >
                  Close Leaderboard
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default TopContributors;