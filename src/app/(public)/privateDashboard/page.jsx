"use client";

import React from "react";
import { Card, Button, Spinner, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, ShieldAlert, ArrowRight, LogIn, Sparkles, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PrivateDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // 1. Loading State Cluster
  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-default-100/40 dark:to-black/20">
        <Spinner size="lg" color="secondary" label="Initializing secure session..." labelColor="secondary" className="font-bold text-xs" />
      </div>
    );
  }

  // 2. Auth Guard Gate (If not logged in, show Restrict UI)
  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-default-50/50 dark:bg-black/10 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full"
        >
          <Card className="border border-slate-100 dark:border-zinc-800/80 rounded-[32px] p-8 text-center bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="p-4 bg-rose-500/10 text-rose-500 dark:text-rose-400 rounded-2xl w-fit mx-auto mb-5 border border-rose-500/20">
              <Lock size={28} strokeWidth={2.5} />
            </div>

            <Chip color="danger" variant="flat" size="sm" className="font-extrabold uppercase tracking-wider text-[10px] mb-3 text-center mx-auto w-full flex justify-center">
              Authentication Required
            </Chip>

            <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Access Protected Node
            </h2>
            
            <p className="text-xs text-default-400 dark:text-zinc-500 mt-2 leading-relaxed max-w-xs mx-auto">
              This route contains encrypted dashboard clusters. You must log in with your credentials to decrypt and mount the workspace view.
            </p>

            <div className="mt-8 space-y-3">
              <Link href="/auth/login" className="block w-full">
                <Button
                  color="secondary"
                  size="lg"
                  radius="xl"
                  startContent={<LogIn size={16} />}
                  className="w-full font-bold bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md text-white hover:scale-[1.02] active:scale-98 transition-all text-xs uppercase tracking-wider h-11"
                >
                  Go to Login Screen
                </Button>
              </Link>
              
              <Link href="/publicLessons" className="block w-full">
                <Button
                  variant="light"
                  size="sm"
                  className="w-full font-bold text-default-400 dark:text-zinc-500 hover:text-slate-700 text-xs"
                >
                  Return to Public Hub
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>
    );
  }

  // 3. Authenticated View (Render Content Securely)
  return (
    <section className="min-h-screen bg-default-50/30 dark:bg-black/10 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Secure Dashboard Header node */}
        <div className="flex items-center justify-between" data-aos="fade-down">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-violet-400 rounded-xl">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-800 dark:text-white uppercase">
              User Panel Workspace
            </h1>
          </div>
          
          <Chip
            size="sm"
            color="success"
            variant="flat"
            className="font-black text-[10px] uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          >
            ● Encrypted Session Active
          </Chip>
        </div>

        {/* User Workspace Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border border-slate-100 dark:border-zinc-800/60 rounded-[32px] bg-white dark:bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 tracking-tight mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" /> Welcome Back, {user.name}!
            </h2>
            
            <p className="text-sm text-default-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Your session state has successfully integrated with the localized runtime ecosystem. Here you can control your internal metrics, monitor system clusters, or manage active nodes safely.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { title: "Account Tier", value: user.plan || "Free Tier", color: "text-indigo-500" },
                { title: "Email Node", value: user.email, color: "text-slate-600 dark:text-zinc-300 truncate" },
                { title: "System Role", value: user.role || "User Client", color: "text-emerald-500" },
              ].map((box, i) => (
                <div key={i} className="p-4 rounded-2xl bg-default-50 dark:bg-zinc-900/60 border border-default-100 dark:border-zinc-800/40">
                  <span className="text-[10px] uppercase font-bold text-default-400 tracking-wider block mb-1">
                    {box.title}
                  </span>
                  <span className={`text-xs font-bold ${box.color} block`}>
                    {box.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}