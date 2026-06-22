"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EyeOff, ArrowLeft, Home, Ban } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-default-50/40 dark:bg-zinc-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Radial Background Gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900/80 bg-white dark:bg-zinc-900 shadow-xl text-center space-y-6 relative overflow-hidden">
            
            {/* Top Illustration / Icon Section */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              {/* Outer Pulsing Aura */}
              <motion.div 
                className="absolute inset-0 bg-amber-500/15 rounded-full"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center relative border border-amber-500/10 shadow-inner">
                <EyeOff size={30} strokeWidth={2.2} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-zinc-900 dark:bg-zinc-800 p-1 rounded-full text-rose-500 border border-zinc-700/50 shadow">
                <Ban size={12} strokeWidth={2.5} />
              </div>
            </div>

            {/* Typography Content Blocks */}
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/10">
                Error Code: 403 Forbidden
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight pt-2">
                Restricted Content
              </h1>
              <p className="text-xs text-default-400 dark:text-zinc-400 leading-relaxed font-medium max-w-xs mx-auto">
                This directory route or administrative content structure is completely locked down from public streaming nodes.
              </p>
            </div>

            {/* Warning Message Disclaimer Container */}
            <div className="p-4 bg-default-50 dark:bg-zinc-800/40 border border-default-100 dark:border-zinc-800/60 rounded-2xl text-left text-[11px] font-medium text-default-500 dark:text-zinc-400 leading-normal">
              🔒 <span className="font-bold text-slate-700 dark:text-zinc-300">Security Notice:</span> Attempting to pass encryption gates without valid permissions tokens logs your current profile coordinate session inside the active admin stream ledger.
            </div>

            {/* Action Buttons Controller Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                variant="flat"
                onPress={() => window.history.back()}
                className="w-full sm:w-auto flex-1 font-bold text-xs h-10 bg-default-100 text-default-600 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl gap-1.5"
              >
                <ArrowLeft size={13} /> Return Back
              </Button>
              
              <Link href="/" className="w-full sm:w-auto flex-1">
                <Button
                  color="secondary"
                  className="w-full font-black text-xs h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/10 gap-1.5"
                >
                  <Home size={13} /> Home Dashboard
                </Button>
              </Link>
            </div>

          </Card>
        </motion.div>
      </div>
    </div>
  );
}