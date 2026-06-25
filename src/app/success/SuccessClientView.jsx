"use client";

import React from "react";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const variants = {
  container: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
  },
};

export default function SuccessClientView({ customerEmail, amountTotal, currency }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#1d0b45] dark:via-[#150433] dark:to-[#0f0226] text-slate-900 dark:text-white flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden select-none">
      
      {/* Premium Ambient Background Mesh */}
      <div className="absolute right-[-10%] top-[-10%] w-[60%] h-[60%] opacity-20 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#00e5b4] via-emerald-600 to-transparent blur-[140px] rounded-full" />
      </div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[50%] h-[50%] opacity-15 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-transparent blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={variants.container}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full z-10"
      >
        <Card className="p-6 sm:p-10 rounded-[36px] border border-slate-200/60 dark:border-purple-500/10 bg-white/70 dark:bg-purple-950/10 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.04)] dark:shadow-none text-center space-y-8 relative overflow-hidden">
          
          {/* Top Animated Pulse Success Badge */}
          <motion.div variants={variants.item} className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-emerald-500 rounded-full" 
            />
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 rounded-[22px] flex items-center justify-center relative shadow-[0_10px_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={28} strokeWidth={2.5} className="text-white" />
            </div>
          </motion.div>

          {/* Typography Header Group */}
          <motion.div variants={variants.item} className="space-y-3">
            <Chip
              variant="flat"
              className="font-black text-[9px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-[#00e5b4] border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm"
              startContent={<ShieldCheck size={11} className="mr-1" />}
            >
              Payment Verified Secure
            </Chip>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight pt-1">
              Deployment Complete
            </h1>
            <p className="text-xs text-slate-500 dark:text-purple-200/40 leading-relaxed font-medium max-w-xs mx-auto">
              Welcome to the premium node network. Your global write access privileges have successfully synchronized across the framework clusters.
            </p>
          </motion.div>

          {/* Transaction Metadata Grid Receipt */}
          <motion.div 
            variants={variants.item}
            className="p-5 bg-slate-50/80 dark:bg-purple-950/20 border border-slate-100 dark:border-purple-500/10 rounded-2xl text-left space-y-3"
          >
            <div className="flex justify-between items-center border-b border-slate-200/40 dark:border-purple-500/10 pb-3 text-xs">
              <span className="text-slate-400 dark:text-purple-300/30 font-semibold uppercase tracking-wider">Account Identity</span>
              <span className="font-bold text-slate-800 dark:text-purple-100 truncate max-w-[180px]" title={customerEmail}>
                {customerEmail}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 dark:text-purple-300/30 font-semibold uppercase tracking-wider">Allocation Fee</span>
              <span className="font-black text-indigo-600 dark:text-[#00e5b4] tracking-tight bg-indigo-50 dark:bg-[#00e5b4]/5 px-2.5 py-1 rounded-md border border-indigo-100/40 dark:border-[#00e5b4]/10">
                {amountTotal} {currency}
              </span>
            </div>
          </motion.div>

          {/* Disclaimers & Transcripts Support Router */}
          <motion.div variants={variants.item} className="space-y-2.5 text-[11px] font-medium text-slate-400 dark:text-purple-300/30">
            <p className="flex items-center justify-center gap-1.5">
              <Mail size={12} className="text-indigo-500 dark:text-purple-400 shrink-0" />
              <span>
                Receipt transcript forwarded to <span className="text-slate-700 dark:text-purple-200 font-bold">{customerEmail}</span>
              </span>
            </p>
            <div>
              Infrastructure conflicts? Reach out at{" "}
              <a href="mailto:orders@example.com" className="text-indigo-600 dark:text-[#00e5b4] hover:underline font-bold transition-all">
                orders@example.com
              </a>
            </div>
          </motion.div>

          {/* Core App Navigation CTAs */}
          <motion.div variants={variants.item} className="pt-2">
            <Link href="/" className="w-full">
              <Button
                size="lg"
                radius="xl"
                className="w-full font-black text-xs bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 dark:from-white dark:via-purple-100 dark:to-white text-white dark:text-purple-950 shadow-xl shadow-purple-950/10 dark:shadow-none hover:opacity-90 active:scale-[0.99] transition-all h-12 uppercase tracking-widest"
                endContent={<ArrowRight size={13} className="ml-0.5" />}
              >
                Initialize Dashboard
              </Button>
            </Link>
          </motion.div>

        </Card>
      </motion.div>
    </div>
  );
}