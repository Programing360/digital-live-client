"use client";

import React, { useEffect } from "react";
import { Button, Chip } from "@heroui/react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  Rocket,
  BookOpen,
  PartyPopper,
  Zap,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// ─── CONFIGURATIONS & STATIC ASSETS ───
const COMPARISON_DATA = [
  { feature: "Number of lessons", free: "5 / Month", premium: "Unlimited" },
  { feature: "Premium lesson creation", free: false, premium: true },
  { feature: "Ad-free experience", free: false, premium: true },
  { feature: "Priority listing", free: false, premium: true },
  { feature: "Access premium lessons", free: false, premium: true },
  { feature: "Verified community badge", free: false, premium: true },
  { feature: "Early feature access", free: false, premium: true },
  { feature: "Priority support", free: false, premium: true },
];

const METRIC_CARDS = [
  {
    icon: <Rocket size={24} className="text-violet-500 dark:text-[#00e5b4]" />,
    title: "Unlimited Growth",
    desc: "Create and publish unlimited digital life lessons without structural monthly infrastructure caps.",
  },
  {
    icon: <BookOpen size={24} className="text-indigo-500 dark:text-purple-400" />,
    title: "Premium Content",
    desc: "Access exclusive elite wisdom maps and high-tier frameworks hidden from standard nodes.",
  },
  {
    icon: <ShieldCheck size={24} className="text-cyan-500 dark:text-amber-400" />,
    title: "Verified Status",
    desc: "Stand out elegantly within the platform feed layers with your premium profile badge.",
  },
];

// ─── STYLING DICTIONARIES ───
const animationPresets = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 22 } },
  },
};

export default function UpgradeLesson() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremiumUser = user?.isPlan === "premium";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#2a0e65] dark:via-[#21094a] dark:to-[#17053c] text-slate-900 dark:text-white py-20 px-4 sm:px-6 transition-colors duration-700 relative overflow-hidden select-none">
      
      {/* Dynamic Luxury Ambient Background Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* High-End Ambient Purple/Teal Blurred Radials */}
      <div className="absolute left-[-10%] top-[-5%] w-[60%] h-[50%] opacity-25 dark:opacity-20 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#00e5b4] via-purple-600 to-transparent blur-[130px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* ─── HERO HEADER SECTION ─── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Chip
              variant="flat"
              className={`px-4 py-4 border backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full ${
                isPremiumUser 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-[#00e5b4] border-emerald-500/20 shadow-[0_0_20px_rgba(0,229,180,0.15)]" 
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
              }`}
              startContent={
                <Crown size={12} className={`mr-1 ${isPremiumUser ? "text-emerald-500 dark:text-[#00e5b4] animate-pulse" : "text-amber-500 animate-spin"}`} />
              }
            >
              {isPremiumUser ? "Lifetime Premium Is Active" : "Lifetime Premium Upgrade"}
            </Chip>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 dark:from-white dark:via-purple-100 dark:to-purple-300 bg-clip-text text-transparent">
            {isPremiumUser ? "Welcome to the Elite Tier" : "Unlock Absolute Creative Power"}
          </h1>

          <p className="text-slate-500 dark:text-purple-200/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {isPremiumUser 
              ? "Thank you for validating our architecture. You have successfully unlocked unlimited model clusters, zero monetization layouts, and immediate priority status nodes."
              : "Generate infinite architectural lessons, experience complete ad liquidation, and deploy verified credential nodes with a single, permanent ledger access transaction."}
          </p>
        </motion.div>

        {/* ─── INTERACTIVE METRICS FEATURES GRID ─── */}
        <motion.div 
          variants={animationPresets.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {METRIC_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              variants={animationPresets.item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-3xl border border-slate-200/60 dark:border-purple-500/10 p-8 bg-white/70 dark:bg-purple-950/10 backdrop-blur-xl shadow-sm hover:shadow-xl dark:hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="p-3 bg-slate-100 dark:bg-purple-900/30 w-fit rounded-2xl mb-6 group-hover:scale-110 border border-slate-200/40 dark:border-purple-500/10 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
                {card.title}
              </h3>
              <p className="text-slate-500 dark:text-purple-200/40 mt-2 text-xs sm:text-sm leading-relaxed font-medium">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── PREMIUM COMPARISON DATA LAYER MATRIX ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
          className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-purple-500/10 bg-white/50 dark:bg-purple-950/5 backdrop-blur-xl shadow-xl dark:shadow-none"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left select-none">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-purple-500/10 bg-slate-50/70 dark:bg-purple-950/20">
                  <th className="p-6 font-black text-xs uppercase tracking-wider text-slate-400 dark:text-purple-300/40">Engine Features</th>
                  <th className="p-6 font-black text-xs uppercase tracking-wider text-slate-400 dark:text-purple-300/40 text-center w-44">Free Compute</th>
                  <th className="p-6 font-black text-xs uppercase tracking-wider text-amber-500 dark:text-[#00e5b4] text-center w-44 bg-amber-500/[0.02] dark:bg-[#00e5b4]/[0.02]">
                    Premium Network ⭐
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-500/10 font-medium text-xs sm:text-sm">
                {COMPARISON_DATA.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/30 dark:hover:bg-purple-950/10 transition-colors">
                    <td className="p-5 font-bold text-slate-800 dark:text-purple-100">{item.feature}</td>
                    <td className="p-5 text-center text-slate-400 dark:text-purple-300/30">
                      {typeof item.free === "boolean" ? (
                        item.free ? <Check className="mx-auto text-slate-700 dark:text-white" size={16} /> : <span className="opacity-40">✕</span>
                      ) : (
                        <span className="font-black text-xs uppercase tracking-wider">{item.free}</span>
                      )}
                    </td>
                    <td className="p-5 text-center bg-amber-500/[0.01] dark:bg-[#00e5b4]/[0.005]">
                      {typeof item.premium === "boolean" ? (
                        item.premium ? (
                          <motion.div initial={{ scale: 0.4 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                            <Check className="mx-auto text-emerald-500 dark:text-[#00e5b4] drop-shadow-[0_0_8px_rgba(0,229,180,0.4)]" size={18} strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <span className="opacity-40">✕</span>
                        )
                      ) : (
                        <span className="text-amber-500 dark:text-[#00e5b4] font-black text-xs uppercase tracking-wider">{item.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ─── SAAS TRANSACTION SPOTLIGHT BILLING CARD ─── */}
        <div className="max-w-lg mx-auto">
          <SpotlightBillingCard isPremiumUser={isPremiumUser} />
        </div>

      </div>
    </div>
  );
}

// ─── HIGH PERFORMANCE HOVER-SPOTLIGHT SUBSCRIPTION COMPONENT ───
function SpotlightBillingCard({ isPremiumUser }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-[32px] p-1 border border-slate-200/80 dark:border-purple-500/20 bg-white/80 dark:bg-purple-950/10 backdrop-blur-2xl text-center shadow-2xl transition-all duration-300"
    >
      {/* Hardware Accelerated Radial Pointer Track Light */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 229, 184, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="rounded-[28px] bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 p-8 sm:p-10 text-white relative overflow-hidden">
        
        {/* Background Visual Artifact Shapes */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00e5b4]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {isPremiumUser ? (
          
          /* VIEW STATE: VERIFIED PREMIUM SUBSCRIBER */
          <div className="py-6 space-y-6">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md shadow-inner"
            >
              <PartyPopper size={28} className="text-amber-400 dark:text-[#00e5b4]" />
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight">Premium Member Verified</h2>
              <p className="text-purple-200/40 text-xs max-w-xs mx-auto font-medium leading-relaxed">
                Your cryptographic schema holds full lifetime write authorization. Upstream pipeline synchronized.
              </p>
            </div>

            <Button
              size="lg"
              radius="full"
              disabled
              className="w-full font-black bg-white/10 text-white border border-white/20 shadow-none cursor-not-allowed select-none h-12 text-xs uppercase tracking-widest"
            >
              ✓ Account Managed Permanently
            </Button>
          </div>
        ) : (
          
          /* VIEW STATE: ACTIONABLE CHECKOUT CTA */
          <div className="space-y-6">
            <div className="space-y-2">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-fit mx-auto"
              >
                <Sparkles className="text-amber-400 dark:text-[#00e5b4] filter drop-shadow-[0_0_10px_rgba(0,229,180,0.5)]" size={36} />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight mt-3">Premium Lifetime</h2>
              <p className="text-purple-200/40 text-xs font-semibold uppercase tracking-wider">Universal Ledger Node Access</p>
            </div>

            <div className="py-2 relative flex justify-center items-end gap-1 font-black">
              <span className="text-5xl sm:text-6xl tracking-tighter drop-shadow-md">৳1,500</span>
              <span className="text-xs text-purple-300/40 mb-2 uppercase tracking-widest font-bold">/ BDT One-Time</span>
            </div>

            <p className="text-purple-200/60 text-xs max-w-xs mx-auto font-medium leading-relaxed">
              Single transactional ledger confirmation. Perpetual core infrastructure updates. No recurring setups.
            </p>
            
            <form action="/api/checkout_sessions" method="POST" className="pt-2">
              <Button
                size="lg"
                type="submit" 
                role="link"
                radius="full"
                className="w-full font-black bg-white text-purple-950 shadow-xl shadow-black/30 hover:bg-[#00e5b4] hover:text-purple-950 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 h-13 text-xs uppercase tracking-widest"
                endContent={<Zap size={14} className="fill-current animate-pulse" />}
              >
                Deploy Premium Account
              </Button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}