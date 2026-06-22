"use client";

import React from 'react';
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { Star, Mail, Calendar, Crown, Edit3 } from "lucide-react";

export default function ProfileView({ user }) {
  // Real Plan Evaluation matching previous architectural schemas
  const isPremiumUser = user?.isPlan === "premium";

  const publicLessons = [
    { title: "Embracing Failure as a Stepping Stone", category: "Career", tone: "Inspirational", date: "2026-06-15" },
    { title: "The Power of High-Fidelity Design Systems", category: "Mindset", tone: "Realization", date: "2026-04-10" }
  ];

  return (
    <div className="space-y-10" data-aos="fade-up">
      
      {/* Upper Account Metadata Card Header Banner */}
      <Card className="border border-slate-100 dark:border-zinc-800/60 p-6 sm:p-8 shadow-sm rounded-3xl bg-white dark:bg-zinc-900/40 backdrop-blur-md transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          
          {/* Avatar Container with Animated Premium Ring */}
          <div className="relative shrink-0">
            <Avatar src={user?.avatar || user?.image} className="w-24 h-24 ring-4 ring-slate-100 dark:ring-zinc-800" />
            {isPremiumUser && (
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-md">
                <Crown size={12} className="text-white" />
              </span>
            )}
          </div>

          {/* Identity Info Panel */}
          <div className="flex-1 text-center sm:text-left space-y-2 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center sm:justify-start">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[280px]">
                {user?.name}
              </h3>
              
              {/* Dynamic Tier Badge Implementation */}
              {isPremiumUser ? (
                <Chip 
                  color="warning" 
                  variant="flat" 
                  size="sm" 
                  className="font-black uppercase tracking-wider text-[10px] bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 self-center sm:self-auto shadow-sm" 
                  startContent={<Crown size={11} className="text-amber-500 animate-pulse"/>}
                >
                  Premium Member
                </Chip>
              ) : (
                <Chip 
                  variant="flat" 
                  size="sm" 
                  className="font-bold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 self-center sm:self-auto" 
                  startContent={<Star size={11} className="text-slate-400"/>}
                >
                  Free Tier
                </Chip>
              )}
            </div>

            <p className="text-slate-400 dark:text-zinc-500 font-semibold text-sm flex items-center justify-center sm:justify-start gap-1.5 truncate">
              <Mail size={15} className="text-slate-300 dark:text-zinc-600"/> {user?.email}
            </p>

            {/* Statistics Row Nodes */}
            <div className="flex gap-5 justify-center sm:justify-start text-xs font-bold text-slate-400 dark:text-zinc-500 pt-2 border-t border-slate-50 dark:border-zinc-800/40 sm:border-0">
              <div>
                <span className="text-slate-900 dark:text-zinc-100 text-sm font-black mr-1">24</span> 
                Lessons Published
              </div>
              <div className="hidden sm:block text-slate-200 dark:text-zinc-800">|</div>
              <div>
                <span className="text-slate-900 dark:text-zinc-100 text-sm font-black mr-1">15</span> 
                Saved Bookmarks
              </div>
            </div>
          </div>

          {/* Action Action Target Call */}
          <Button 
            variant="bordered" 
            startContent={<Edit3 size={14} />}
            className="font-bold rounded-xl text-xs border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 tracking-wide transition-all w-full sm:w-auto mt-2 sm:mt-0 h-9 px-4 shrink-0"
          >
            Update Profile
          </Button>
        </div>
      </Card>

      {/* Chronological Public Author Activity Feed */}
      <div className="space-y-4">
        <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
          My Public Contributions
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {publicLessons.map((item, i) => (
            <Card 
              key={i} 
              className="border border-slate-100 dark:border-zinc-800/60 hover:shadow-md dark:hover:border-violet-500/20 transition-all rounded-3xl bg-white dark:bg-zinc-900/20 p-6 flex flex-col justify-between min-h-[170px]"
            >
              <div className="flex justify-between items-start gap-2">
                <Chip size="sm" variant="flat" color="primary" className="font-extrabold text-[10px] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  {item.category}
                </Chip>
                <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                  <Calendar size={13} className="text-slate-300 dark:text-zinc-600"/> {item.date}
                </span>
              </div>
              
              <div className="my-4 flex-1">
                <h5 className="font-bold text-slate-900 dark:text-zinc-100 text-base line-clamp-2 leading-snug tracking-tight">
                  {item.title}
                </h5>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-50 dark:border-zinc-800/40 pt-3.5">
                <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  {item.tone}
                </span>
                <Button size="sm" variant="light" color="primary" className="font-bold text-xs dark:text-violet-400">
                  Read Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}