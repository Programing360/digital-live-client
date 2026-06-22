"use client";

import { useState, useEffect } from "react";
import { Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  Rocket,
  BookOpen,
  PartyPopper,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const comparison = [
  { feature: "Number of lessons", free: "5 / Month", premium: "Unlimited" },
  { feature: "Premium lesson creation", free: false, premium: true },
  { feature: "Ad-free experience", free: false, premium: true },
  { feature: "Priority listing", free: false, premium: true },
  { feature: "Access premium lessons", free: false, premium: true },
  { feature: "Verified community badge", free: false, premium: true },
  { feature: "Early feature access", free: false, premium: true },
  { feature: "Priority support", free: false, premium: true },
];

export default function UpgradeLesson() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  // Real-time Plan state evaluation
  const isPremiumUser = user?.isPlan === "premium";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-default-100/50 py-20 dark:to-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            {isPremiumUser ? (
              <Chip
                color="success"
                variant="flat"
                className="px-4 py-1 border border-success-200/30 backdrop-blur-md text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
                startContent={<Crown size={14} className="text-emerald-500 animate-bounce" />}
              >
                Your Lifetime Premium is Active
              </Chip>
            ) : (
              <Chip
                color="warning"
                variant="flat"
                className="px-4 py-1 border border-warning-200/30 backdrop-blur-md text-xs font-bold uppercase tracking-wider"
                startContent={<Crown size={14} className="text-warning-500" />}
              >
                Lifetime Premium Upgrade
              </Chip>
            )}
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 dark:from-white dark:via-violet-200 dark:to-white bg-clip-text text-transparent">
            {isPremiumUser ? "Welcome to the Elite Tier" : "Unlock Everything"}
          </h1>

          <p className="text-default-500 mt-5 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {isPremiumUser 
              ? "Thank you for supporting our platform! You have unlocked unlimited lesson clusters, absolute zero ads, and instant high-priority community status nodes."
              : "Create unlimited lessons, remove ads, unlock premium content, earn a verified badge, and enjoy lifetime access with a single one-time payment."}
          </p>
        </div>

        {/* Feature Cards Grid Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: <Rocket size={28} className="text-violet-500" />,
              title: "Unlimited Growth",
              desc: "Create and publish unlimited digital life lessons without monthly caps.",
            },
            {
              icon: <BookOpen size={28} className="text-indigo-500" />,
              title: "Premium Content",
              desc: "Access exclusive wisdom and hidden tech content from expert creators.",
            },
            {
              icon: <ShieldCheck size={28} className="text-cyan-500" />,
              title: "Verified Status",
              desc: "Stand out elegantly with your premium profile community badge.",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group rounded-3xl border border-default-200/60 dark:border-zinc-800/60 p-8 bg-content1 shadow-sm hover:shadow-xl hover:border-violet-500/20 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40 transition-all duration-300"
            >
              <div className="p-3 bg-default-100 dark:bg-zinc-800/60 w-fit rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-zinc-100">
                {card.title}
              </h3>
              <p className="text-default-400 mt-2.5 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div
          className="mt-20 overflow-hidden rounded-3xl border border-default-200/60 dark:border-zinc-800/60 bg-content1/70 backdrop-blur-md shadow-lg"
          data-aos="fade-up"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-default-200/60 dark:border-zinc-800/60 bg-default-50/50 dark:bg-zinc-900/30">
                  <th className="p-6 font-semibold text-sm text-default-600 dark:text-zinc-400">
                    Features
                  </th>
                  <th className="p-6 font-semibold text-sm text-default-600 dark:text-zinc-400 text-center w-40">
                    Free
                  </th>
                  <th className="p-6 font-bold text-sm text-warning text-center w-40 bg-warning-50/10 dark:bg-warning-500/[0.02]">
                    Premium ⭐
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-default-100 dark:divide-zinc-800/60">
                {comparison.map((item) => (
                  <tr
                    key={item.feature}
                    className="hover:bg-default-50/40 dark:hover:bg-zinc-900/10 transition-colors"
                  >
                    <td className="p-5 text-sm font-medium text-slate-700 dark:text-zinc-300">
                      {item.feature}
                    </td>

                    <td className="p-5 text-center text-sm font-medium text-default-500">
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <Check className="mx-auto text-default-600" size={18} />
                        ) : (
                          <span className="text-default-300 dark:text-zinc-700 font-normal">✕</span>
                        )
                      ) : (
                        item.free
                      )}
                    </td>

                    <td className="p-5 text-center text-sm font-bold bg-warning-50/[0.02] dark:bg-warning-500/[0.005]">
                      {typeof item.premium === "boolean" ? (
                        item.premium ? (
                          <motion.div
                            initial={{ scale: 0.5 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                          >
                            <Check
                              className="mx-auto text-success drop-shadow-sm"
                              size={20}
                              strokeWidth={3}
                            />
                          </motion.div>
                        ) : (
                          <span className="text-default-300 dark:text-zinc-700 font-normal">✕</span>
                        )
                      ) : (
                        <span className="text-warning-600 dark:text-warning-400">
                          {item.premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Pricing Layout Box */}
        <div
          className="max-w-lg mx-auto mt-20"
          data-aos="zoom-in"
          data-aos-offset="100"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-10 text-center text-white shadow-2xl shadow-indigo-500/20 dark:shadow-cyan-500/20"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            {isPremiumUser ? (
              // PREMIUM USER ACTIVATED VIEW STATE
              <div className="py-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md"
                >
                  <PartyPopper size={32} className="text-warning-300" />
                </motion.div>
                
                <h2 className="text-2xl font-black tracking-tight">
                  You are a Premium Member
                </h2>
                
                <p className="text-white/90 text-xs max-w-xs mx-auto font-medium mt-3 leading-relaxed">
                  Your identity cluster has full write-access on upstream schemas. Unlimited nodes deployment initialized.
                </p>

                <Button
                  size="lg"
                  radius="full"
                  disabled
                  className="mt-8 font-black px-10 bg-white/20 text-white border border-white/30 shadow-none cursor-not-allowed select-none h-12 text-xs uppercase tracking-wider"
                >
                  ✓ Plan Active Forever
                </Button>
              </div>
            ) : (
              // STANDARD CHECKOUT CTA
              <>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-fit mx-auto"
                >
                  <Sparkles className="mx-auto mb-4 text-warning-300" size={44} />
                </motion.div>

                <h2 className="text-3xl font-black tracking-tight">
                  Premium Lifetime
                </h2>

                <div className="my-6 relative flex justify-center items-center gap-1.5">
                  <span className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-md">
                    ৳1,500
                  </span>
                </div>

                <p className="text-white/80 text-sm max-w-xs mx-auto font-medium">
                  One-time payment. Lifetime access updates. No recurring setups.
                </p>
                
                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <Button
                      size="lg"
                      type="submit" 
                      role="link"
                      radius="full"
                      className="mt-8 font-extrabold px-10 bg-white text-indigo-600 shadow-xl shadow-black/10 hover:bg-neutral-50 hover:scale-105 active:scale-98 transition-all h-13 text-sm"
                    >
                      Choose Premium Plan
                    </Button>
                  </section>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}